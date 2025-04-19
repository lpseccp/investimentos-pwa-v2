const ativos = [];

document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const ativo = document.getElementById('ativo').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const nota = parseFloat(document.getElementById('nota').value);
  const saldo = parseFloat(document.getElementById('saldo').value);

  ativos.push({ ativo, preco, nota, saldo });
  atualizarTabela();
  this.reset();
});

function atualizarTabela() {
  const corpo = document.getElementById('tabela-corpo');
  corpo.innerHTML = '';

  const totalNotas = ativos.reduce((soma, a) => soma + a.nota, 0);
  const totalSaldo = ativos.reduce((soma, a) => soma + a.saldo, 0);

  ativos.forEach(a => {
    const percentualIdeal = a.nota / totalNotas;
    const valorIdeal = totalSaldo * percentualIdeal;
    const percentualAtual = a.saldo / totalSaldo;
    const diferenca = valorIdeal - a.saldo;
    const recomendacao = diferenca > 0 ? 'Comprar' : 'Esperar';

    const linha = `
      <tr>
        <td>${a.ativo}</td>
        <td>R$ ${a.preco.toFixed(2)}</td>
        <td>${a.nota}</td>
        <td>R$ ${a.saldo.toFixed(2)}</td>
        <td>${(percentualIdeal * 100).toFixed(1)}%</td>
        <td>${(percentualAtual * 100).toFixed(1)}%</td>
        <td>R$ ${valorIdeal.toFixed(2)}</td>
        <td>R$ ${diferenca.toFixed(2)}</td>
        <td>${recomendacao}</td>
      </tr>
    `;

    corpo.innerHTML += linha;
  });

  atualizarGrafico();
}

let chart;

function atualizarGrafico() {
  const ctx = document.getElementById('graficoPizza').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ativos.map(a => a.ativo),
      datasets: [{
        data: ativos.map(a => a.saldo),
        backgroundColor: ativos.map(() => '#' + Math.floor(Math.random()*16777215).toString(16)),
      }]
    },
    options: {
      responsive: true
    }
  });
}