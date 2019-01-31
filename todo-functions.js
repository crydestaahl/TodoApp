/********************************************************
 Check for saved data in local storage
 *******************************************************/

const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    }
    return []
}

/********************************************************
Push to array 
 *******************************************************/

const pushToArray = function (whatToPush, list) {
    const a = { 
        text: whatToPush, 
        completed: false, 
        id: uuidv4() 
    }
    const b = list
    list.push(a)
}

/********************************************************
Render with filters 
 *******************************************************/

const renderFilteredTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#search-list').innerHTML = ''

    
    renderWithButtons(todos, '#search-list')
}

/********************************************************
Update todo array
 *******************************************************/

const updateTodoList = function (todos) {
    incompleteTodos = todos.filter(function (todo) {
        return !todo.completed
    })

    renderFilteredTodos(incompleteTodos, filters)

    let summaryUncompleted = document.createElement('h2')
    summaryUncompleted.setAttribute('id', 'summary')
    summaryUncompleted.textContent = `You have ${incompleteTodos.length} todos left:`

    // Appenda oklara todos i document. 
    document.querySelector('#todos-heading').appendChild(summaryUncompleted)
}

/********************************************************
 Check and render completed todos
 *******************************************************/

const renderCompletedTodos = function (todos) {
    const completedTodos = todos.filter((todos) => {
        return todos.completed
    })

    const summaryCompleted = document.createElement('h2')
    summaryCompleted.textContent = `You have completed ${completedTodos.length} todos:`
    document.querySelector('#finished-todos').appendChild(summaryCompleted)

    render(completedTodos, 'p', '#finished-todos')

}

/********************************************************
  Render Elements 
 *******************************************************/

const renderElements = function (tag, attribute, attributeValue, whereToRender) {

    const newElements = document.createElement(tag)
    newElements.setAttribute(attribute, attributeValue)
    document.querySelector(whereToRender).appendChild(newElements)

}

/********************************************************
  Render Elements II
 *******************************************************/
const render = function (todo, tag, divId) {

    todo.forEach(function (todo) {
        const element = document.createElement(tag)
        element.textContent = todo.text
        document.querySelector(divId).appendChild(element)  
    })
}

/********************************************************
  Render Uncompleted Elements With Buttons 
 *******************************************************/
const renderWithButtons = function (todoList, divId) {

    todoList.forEach(function (todo) {
        const div = document.createElement('div')
        div.id = 'uncompleted'

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.completed
        
        checkbox.addEventListener('change', () => {
            console.log('Shit got changed!')
            toggleTodo(todo.id);
        })

        const span = document.createElement('span')
        span.textContent = todo.text

        const button = document.createElement('button')
        button.textContent = 'X'

        
        //set remove function on button 
        button.addEventListener('click', function () {
            removeTodo(todo.id) 
        })
        div.appendChild(checkbox)
        div.appendChild(span)
        div.appendChild(button)
        document.querySelector(divId).appendChild(div)
    })
}

const toggleTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    todos[todoIndex].completed = true;
    document.querySelector('#summary').remove()
    updateTodoList(todos)
    saveTodos(todos);

    const finishedTodosDiv = document.querySelector('#finished-todos')
    finishedTodosDiv.innerHTML = '';
    renderCompletedTodos(todos);
}

/********************************************************
 Save todos
 *******************************************************/

 const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

/********************************************************
 Remove todos by ID
 *******************************************************/

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1) 
        saveTodos(todos)  
        document.querySelector('#search-list').innerHTML = ''  
        renderFilteredTodos(todos, filters)
        document.querySelector('#summary').remove() 
        let summaryUncompleted = document.createElement('h2')
        summaryUncompleted.setAttribute('id', 'summary')
        summaryUncompleted.textContent = `You have ${todos.length} todos left:`
        document.querySelector('#todos-heading').appendChild(summaryUncompleted)   
    }


    //console.log(id)
    //console.log(todos)
    // const newTodos = todos.filter(todo => todo.id !== id);
    //saveTodos(todos)
    //renderNewTodoList(todos)
    //console.log(newTodos)
}

