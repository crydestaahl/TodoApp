const todos = [{
    text: 'Finish Moonwild website',
    completed: true
}, {
    text: 'Learn React',
    completed: false
}, {
    text: 'Get deeper knowledge in JS',
    completed: true
}, {
    text: 'Köra en vända till tippen',
    completed: false
}, {
    text: 'Skriva klart artikel',
    completed: true
}]

/********************************************************
 Render elements
 *******************************************************/

const render = function (todo, tag, divId) {

    todo.forEach(function (todo) {
        const element = document.createElement(tag)
        element.textContent = todo.text
        document.querySelector(divId).appendChild(element)
    })
}



/********************************************************
 * Render with filters 
 *******************************************************/


const filters = {
    searchText: ''
}

const renderFilteredTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#search-list').innerHTML = ''    

    render(filteredTodos, 'p', '#search-list')
}

renderFilteredTodos(todos, filters)



/********************************************************
 Listen for search in input
 *******************************************************/


document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderFilteredTodos(incompleteTodos, filters)
})



/********************************************************
 Check how many todos left and render to the document
 *******************************************************/ 


 // Leta efter oklara todos
const incompleteTodos = todos.filter(function (todo) {
    return !todo.completed
})

renderFilteredTodos(incompleteTodos, filters)

// Skapa element för oklara todos
const summaryUncompleted = document.createElement('h2')
summaryUncompleted.textContent = `You have ${incompleteTodos.length} todos left:`
// Appenda oklara todos i document. 
document.querySelector('#todos-heading').appendChild(summaryUncompleted)



/********************************************************
 Check and render completede todos
 *******************************************************/


const renderCompletedTodos = function (todos) {
    const completedTodos = todos.filter( (todos) => {
        return todos.completed
    })

    const summaryCompleted = document.createElement('h2')
    summaryCompleted.textContent = `You have completed ${completedTodos.length} todos:`
    document.querySelector('#finished-todos').appendChild(summaryCompleted)
    
    render(completedTodos, 'p', '#finished-todos')

}
renderCompletedTodos(todos)


/********************************************************
 Listen for klicks on button & render new todo
 *******************************************************/



 document.querySelector('#add-todo-button').addEventListener('click', (e) => {
    const text = document.querySelector('#add-todo-text').value
    const addedTodo = document.createElement('p')
    addedTodo.textContent = text 
    document.querySelector('#search-list').appendChild(addedTodo)
})



/********************************************************
  Render Elements 
 *******************************************************/
 
const renderElements = function (tag, attribute, attributeValue, whereToRender) {

    const newElements = document.createElement(tag)
    newElements.setAttribute(attribute, attributeValue)
    document.querySelector(whereToRender).appendChild(newElements)

}


/********************************************************
  Add a p for each todo
 *******************************************************/

// todos.forEach(function (list) {
//     const p = document.createElement('p')
//     p.textContent = list.text 
//     document.querySelector('body').appendChild(p)
// })


 //Ta bort p med ordet och i
// p.forEach(function (p) {
//     if (p.textContent.includes('och')) {
//         p.remove()
//     }
// })

// ps.forEach(p => {
//     //console.log(p.textContent)
//     //p.remove()
// });

