import {
  returnlistTarefas,
  addTarefaBack,
  updateStatusTarefa,
  editDescTarefaBack,
  inactivateTarefa,
  filterTarefasActive,
  filterTarefasBack,
  returnDescTarefas,
} from "./services.js";

window.addTarefaFront = addTarefaFront;
window.listTarefas = listTarefas;
window.finishTarefa = finishTarefa;
window.showModal = showModal;
window.editDescTarefaFront = editDescTarefaFront;
window.deleteTarefa = deleteTarefa;
window.filterTarefasFront = filterTarefasFront;

function addTarefaFront() {
  $("#desc").val() == ""
    ? alert("Informe uma tarefa...")
    : addTarefaBack($("#desc").val());

  $("#desc").val("");

  listTarefas();
}

function listTarefas(filtro = "Todos") {
  $("#lista").html("");
  let tarefas = returnlistTarefas();

  tarefas = filterTarefasActive(tarefas);
  tarefas = filterTarefasBack(filtro);

  const novoHTML = $.map(tarefas, (dado) => {
    return `<li class="item ${dado.status == "Feito" ? "desativar" : ""}">
            <p class="descricao">${dado.descricao}</p>

            <div class="btn-acao">
                <button class="btn btn-outline-success" onclick="finishTarefa(${
                  dado.id
                })"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-outline-info" onclick="showModal(${
                  dado.id
                })"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-outline-danger" onclick="deleteTarefa(${
                  dado.id
                })"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </li>`;
  });

  $("#lista").html(novoHTML);
}

function finishTarefa(id) {
  updateStatusTarefa(id);
  listTarefas();
}

function showModal(id) {
  $(".modal").css("display", "flex");

  $("#novaDesc").val(returnDescTarefas(id));

  $("#btnConfirmar")
    .off("click")
    .click(() => {
      editDescTarefaFront(id);
      $(".modal").css("display", "none");
    });

  $("#btnCancelar")
    .off("click")
    .click(() => $(".modal").css("display", "none"));
}

function editDescTarefaFront(id) {
  $("#novaDesc").val() == ""
    ? alert("Digite a nova descrição da tarefa...")
    : editDescTarefaBack(id, $("#novaDesc").val());

  listTarefas();
}

function deleteTarefa(id) {
  inactivateTarefa(id);
  listTarefas();
}

function filterTarefasFront() {
  listTarefas($("#filter").val());
}
