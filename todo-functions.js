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

    // render(filteredTodos, 'p', '#search-list')
    renderWithButtons(todos, '#search-list')
}

/********************************************************
Update todo array
 *******************************************************/

const updateTodoList = function (todo) {
    incompleteTodos = todo.filter(function (todo) {
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
        
        const content = `
            <div>
                <input type="checkbox">
                <span>${todo.text}</span>
                <button>X</button>
            </div>    
        `   
        div.innerHTML = content;
        document.querySelector(divId).appendChild(div)
    })
   
}