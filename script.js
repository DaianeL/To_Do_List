// array declarado de forma global
let dadosArray = [];

// Essa função é chamada quando o usuário deseja adicionar um novo dado.
function adicionarDados() {
  //Obtém o valor do elemento de input com o ID "inputDados" e armazena na variável novoDado.
  let novoDado = document.getElementById("inputDados").value;

  // Verifica se o campo não está vazio
  if (novoDado.trim() !== "") {
    // Adiciona o novo dado ao final do array
    dadosArray.push(novoDado);

    // Limpa o valor do input para o próximo dado
    document.getElementById("inputDados").value = "";

    // Armazena o array atualizado na sessionStorage convertendo para string
    sessionStorage.setItem("dadosArray", JSON.stringify(dadosArray));

    //Exibe o array atualizado no console (remover)
    //
    //console.log("Array Atualizado:", dadosArray);
  } else {
    // Exibe um alerta se o campo estiver vazio
    alert("Por favor, insira uma tarefa!");
  }
  //
  criarLista(novoDado);
  botaoApagar();
  botaoEditar();
}

function criarLista(newItem) {
  let lista = document.getElementById("mostrarLista");
  let novoItem = document.createElement("li");
  novoItem.innerHTML = `<p>${newItem}</p>`;
  lista.appendChild(novoItem);
}
function botaoApagar() {
  let liFilhoApagar = document.getElementById("mostrarLista").lastChild;
  let apagar = document.createElement("button");
  apagar.innerHTML = "Apagar tarefa"; // botão apagar tarefa
  apagar.setAttribute("class", "btnApagar");
  apagar.addEventListener("click", function () {
    liFilhoApagar.remove();
  });

  liFilhoApagar.appendChild(apagar);
}
function botaoEditar() {
  let liFilhoEditar = document.getElementById("mostrarLista").lastChild;
  let editar = document.createElement("button");
  editar.innerHTML = "Editar tarefa";
  editar.setAttribute("class", "btnEditar");
  // Adiciona um evento de clique ao botão editar
  editar.addEventListener("click", function () {
    // Chama a função editarTarefa passando o liFilhoEditar como argumento
    editarTarefa(liFilhoEditar);
  });

  liFilhoEditar.appendChild(editar);
}

// Função para editar a tarefa
function editarTarefa(liElement) {
  // puxa o texto já existente na tarefa
  let textoAtual = liElement.querySelector("p").innerText;

  // Pede para fornecer um novo texto para a tarefa
  let novoTexto = prompt("Editar tarefa:", textoAtual);

  // Verifica se não cancelou a edição e o novo texto não está vazio
  if (novoTexto !== null && novoTexto.trim() !== "") {
    // Atualiza o texto da tarefa
    liElement.querySelector("p").innerText = novoTexto;
  }
}
// Função para carregar os dados da sessionStorage
function carregarDadosDaSessionStorage() {
  let dadosArmazenados = sessionStorage.getItem("dadosArray");

  if (dadosArmazenados) {
    dadosArray = JSON.parse(dadosArmazenados);

    // Recria a lista com os dados armazenados
    for (let i = 0; i < dadosArray.length; i++) {
      criarLista(dadosArray[i]);
    }
  }
}

// Chama a função para carregar os dados ao carregar a página
carregarDadosDaSessionStorage();
