const tarefas = [
    {id: 1, descricao: 'Estudar JS', status: 'aFazer', ativo: true}
]

function returnlistTarefas() {
    return tarefas;
}

function addTarefaBack(descricao) {
    tarefas.push({
        id: tarefas.length + 1,
        descricao: descricao,
        status: 'aFazer',
        ativo: true
    });
}

function updateStatusTarefa(id){
    tarefas.filter((tarefa) => {
        if(tarefa.id == id){
            tarefa.status == 'aFazer' ? tarefa.status = 'Feito' : tarefa.status = 'aFazer';
        }
    });
}

function editDescTarefaBack(id, descricao){
    tarefas.filter((tarefa) => {
        if(tarefa.id == id){
            tarefa.descricao = descricao
        }
    });
}

function inactivateTarefa(id){
    tarefas.filter((tarefa) => {
        if(tarefa.id == id){
            tarefa.ativo = false;
        }
    });
}

function filterTarefasActive(tarefas){
    return tarefas.filter( (tarefa) => {
        if(tarefa.ativo){
            return tarefa;
        }
    });
}

function filterTarefasBack(tipoFiltro){
    return tarefas.filter( (tarefa) => {
            if(tarefa.status == tipoFiltro && tarefa.ativo){
                return tarefa
            } else if(tipoFiltro == 'Todos' && tarefa.ativo){
                return tarefa
            }
        });
}

function returnDescTarefas(id){
    let descTarefa;

    tarefas.filter((tarefa) => {
        if(tarefa.id == id){
            descTarefa = tarefa.descricao;
        }
    });
    
    return descTarefa;
}

export {returnlistTarefas, addTarefaBack, updateStatusTarefa, editDescTarefaBack, inactivateTarefa, filterTarefasActive, filterTarefasBack, returnDescTarefas};