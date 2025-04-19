const form = document.getElementById('form');
const tabela = document.querySelector('#tabela tbody');
const limparBtn = document.getElementById('limpar');

let ativos = JSON.parse(localStorage.getItem('ativos')) || [];

function atualizarTabelaEGrafico() {
  tabela.innerHTML = '';
  if (ativos.length === 0) return;

  const totalNotas = ativos.reduce((sum, a) => sum + a.nota, 0);
  const totalSaldo = ativos.reduce((sum, a) => sum + a.saldo, 0);

  ativos.forEach(ativo => {
    ativo.percentualIdeal = (ativo.nota / totalNotas) * 100;
    ativo.percentualAtual = (ativo.saldo / totalSaldo) * 100;
    ativo.diferenca = ativo.percentualIdeal - ativo.percentualAtual;
    ativo.recomendacao = ativo.diferenca > 0 ? 'Comprar' : 'Esperar';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ativo.nome}</td>
      <td>R$ ${ativo.preco.toFixed(2)}</td>
      <td>${ativo.nota}</td>
      <td>R$ ${ativo.saldo.toFixed(2)}</td>
      <td>${ativo.percentualIdeal.toFixed(1)}%</td>
      <td>${ativo.percentualAtual.toFixed(1)}%</td>
      <td>${ativo.diferenca.toFixed(1)}%</td>
      <td>${ativo.recomendacao}</td>
    `;
    tabela.appendChild(tr);
  });

  atualizarGrafico();
  localStorage.setItem('ativos', JSON.stringify(ativos));
}

function atualizarGrafico() {
  const ctx = document.getElementById('grafico').getContext('2d');
  if (window.pizzaChart) window.pizzaChart.destroy();

  window.pizzaChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ativos.map(a => a.nome),
      datasets: [{
        label: 'Distribuição Atual (%)',
        data: ativos.map(a => a.percentualAtual),
        backgroundColor: ativos.map((_, i) => `hsl(${i * 45}, 70%, 60%)`)
      }]
    },
    options: {
      responsive: true
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('ativo').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const nota = parseFloat(document.getElementById('nota').value);
  const saldo = parseFloat(document.getElementById('saldo').value);

  if (nome && !isNaN(preco) && !isNaN(nota) && !isNaN(saldo)) {
    ativos.push({ nome, preco, nota, saldo });
    form.reset();
    atualizarTabelaEGrafico();
  }
});

limparBtn.addEventListener('click', () => {
  if (confirm('Deseja realmente limpar todos os dados?')) {
    ativos = [];
    localStorage.removeItem('ativos');
    atualizarTabelaEGrafico();
  }
});

// Ao iniciar
document.addEventListener('DOMContentLoaded', atualizarTabelaEGrafico);