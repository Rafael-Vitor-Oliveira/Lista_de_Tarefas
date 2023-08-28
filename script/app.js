let database = [];

const getStorage = () => JSON.parse(localStorage.getItem('ListaTarefas')) ?? [];
const setStorage = (database) => localStorage.setItem('ListaTarefas', JSON.stringify(database));

const tasks = function (description, status, indice){
    const structure = document.createElement('label')
    structure.classList.add('task')
    structure.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
        <input type="text" name="taskText" value="${description}" class="taskText" disabled>
        <div class="options">
        <input type="button" class="close" value="X" data-indice=${indice}>
        </div>
    `
    document.getElementById('boxTask').appendChild(structure);
}
const refreshComplete = () =>{
    const findBoxTasks = document.getElementById('boxTask');

    while(findBoxTasks.firstChild){
        findBoxTasks.removeChild(findBoxTasks.lastChild);
    }
}
const refresh = () =>{
    refreshComplete();
    const database = getStorage();
    database.forEach((descriptionTask, indice) => tasks(descriptionTask.description, descriptionTask.status, indice));
}
const insertTask = (event) =>{
    const enter = event.key === 'Enter';
    const eventEmpty = event.target.value === '';

    if(enter){
        const database = getStorage();
        if(eventEmpty){
            alert('A descrição não pode estar vazia')
            refresh()
            return(insertTask)
        }
        database.push({'description': event.target.value, 'status': ''});
        setStorage(database);
        refresh();
        event.target.value = '';
    }
  
}
const refreshStatus = (indice)=>{
    const database = getStorage();
    database[indice].status = database[indice].status === '' ? 'checked' : '';
    setStorage(database);
    refresh();
}
const removeTask = (indice) =>{
    const database = getStorage();
    database.splice(indice, 1);
    setStorage(database);
    refresh();
}
const clickTask = (event) => {
    const taskclick = event.target;

    if(taskclick.value === 'X'){
       if(confirm('Deseja deletar a tarefa?')){
        const indice = taskclick.dataset.indice;
        removeTask(indice);
        console.log('entrei');
       }
    }
    else if(taskclick.type ==='checkbox'){
        const indice = taskclick.dataset.indice;
        refreshStatus(indice);
    }
}

document.getElementById('boxTask').addEventListener('click', clickTask);
document.getElementById('add_Item').addEventListener('keydown', insertTask);
refresh();