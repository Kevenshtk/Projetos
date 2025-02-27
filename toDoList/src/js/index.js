import {returnlistTarefas, addTarefaBack, updateStatusTarefa, editDescTarefaBack, inactivateTarefa, filterTarefasActive, filterTarefasBack, returnDescTarefas} from './services.js';

window.addTarefaFront = addTarefaFront;
window.listTarefas = listTarefas;
window.finishTarefa = finishTarefa;
window.showModal = showModal;
window.editDescTarefaFront = editDescTarefaFront;
window.deleteTarefa = deleteTarefa;
window.filterTarefasFront = filterTarefasFront;

function addTarefaFront(){
    const input = document.querySelector('#desc');
    input.value == '' ? alert('Informe uma tarefa...') : addTarefaBack(input.value);
    input.value = '';
    
    listTarefas();
}

function listTarefas(filtro = 'Todos'){
    let tarefas = returnlistTarefas();
    const lista = document.querySelector('#lista');
    lista.innerHTML = '';

    tarefas = filterTarefasActive(tarefas);
    tarefas = filterTarefasBack(filtro);

    const novoHTML = tarefas.map((dado) => {
        return `<li class="item ${dado.status == 'Feito' ? 'desativar' : ''}">
            <span class="id">${dado.id}</span>
            <p class="descricao">${dado.descricao}</p>

            <div class="btn-acao">
                <button class="btn btn-outline-success" onclick="finishTarefa(${dado.id})"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-outline-info" onclick="showModal(${dado.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-outline-danger" onclick="deleteTarefa(${dado.id})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </li>`;
    }).join("");

    lista.innerHTML += novoHTML;
}

function finishTarefa(id){
    updateStatusTarefa(id);
    listTarefas();
}

function showModal(id){
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    const input = document.querySelector('#novaDesc');
    input.value = returnDescTarefas(id)

    const btnConfirm = document.querySelector('#btnConfirmar');
    btnConfirm.onclick = () => {
        editDescTarefaFront(id);
        modal.style.display = 'none';
    };

    const btnCancel = document.querySelector('#btnCancelar');
    btnCancel.onclick = () => {
        const input = document.querySelector('#novaDesc');
        input.value = '';
        
        modal.style.display = 'none';
    };
}

function editDescTarefaFront(id){
    const input = document.querySelector('#novaDesc');
    input.value == '' ? alert('Digite a nova descrição da tarefa...') : editDescTarefaBack(id, input.value);
    input.value = '';
    
    listTarefas();
}

function deleteTarefa(id){
    inactivateTarefa(id);
    listTarefas();
}

function filterTarefasFront(){
    const filtro = document.querySelector('#filter');
    listTarefas(filtro.value)
}