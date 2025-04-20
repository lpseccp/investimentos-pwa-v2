document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Dados da carteira
let carteira = [];

const form = document.getElementById('investment-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ativo = document.getElementById('ativo').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const nota = parseInt(document.getElementById('nota').value);
  const saldo = parseFloat(document.getElementById('saldo').value);

  carteira.push({ ativo, preco, nota, saldo });
  atualizarLista();
  salvarLocal();
  form.reset();
});

function atualizarLista() {
  const lista = document.getElementById('ativos-lista');
  lista.innerHTML = "";
  const ordenar = document.getElementById('ordenar-por').value;
  let ordenados = [...carteira];
  if (ordenar === 'nome') ordenados.sort((a, b) => a.ativo.localeCompare(b.ativo));
  if (ordenar === 'nota') ordenados.sort((a, b) => b.nota - a.nota);
  if (ordenar === 'saldo') ordenados.sort((a, b) => b.saldo - a.saldo);

  for (const ativo of ordenados) {
    const el = document.createElement('div');
    el.textContent = `${ativo.ativo} - R$ ${ativo.preco.toFixed(2)} - Nota: ${ativo.nota} - Saldo: R$ ${ativo.saldo}`;
    lista.appendChild(el);
  }
  gerarGraficoPizza();
}

document.getElementById('ordenar-por').addEventListener('change', atualizarLista);

function salvarLocal() {
  localStorage.setItem('carteira', JSON.stringify(carteira));
}

function restaurarLocal() {
  const dados = localStorage.getItem('carteira');
  if (dados) {
    carteira = JSON.parse(dados);
    atualizarLista();
  }
}

restaurarLocal();

// Função fictícia do gráfico para ilustrar
function gerarGraficoPizza() {
  const canvas = document.getElementById('grafico-pizza');
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "orange";
  ctx.fillRect(10, 10, 100, 100); // Exemplo
}
