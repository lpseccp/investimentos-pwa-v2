<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0a0a0a" />
  <title>App de Investimentos</title>
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Rebalanceamento de Investimentos</h1>

  <form id="form">
    <label>Ativo: <input type="text" id="ativo" required></label>
    <label>Preço atual: <input type="number" step="0.01" id="preco" required></label>
    <label>Nota de Importância: <input type="number" id="nota" min="1" max="10" required></label>
    <label>Saldo atual (R$): <input type="number" step="0.01" id="saldo" required></label>
    <button type="submit">Adicionar Ativo</button>
  </form>

  <button id="limpar">Limpar Tudo</button>

  <table id="tabela">
    <thead>
      <tr>
        <th>Ativo</th><th>Preço</th><th>Nota</th><th>Saldo</th><th>% Ideal</th><th>% Atual</th><th>Diferença</th><th>Ação</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script src="app.js"></script>
</body>
</html>
