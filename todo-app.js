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
Push to array
 *******************************************************/


const pushToArray = function (whatToPush, list) {
    const a = { text: whatToPush, completed: false }
    const b = list
    list.push(a)
}

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
updateTodoList(todos)


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
  Render Elements 
 *******************************************************/
 
const renderElements = function (tag, attribute, attributeValue, whereToRender) {

    const newElements = document.createElement(tag)
    newElements.setAttribute(attribute, attributeValue)
    document.querySelector(whereToRender).appendChild(newElements)

}

/********************************************************
 Listen for submits & Render new todo
 *******************************************************/

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()

    const newTodo = e.target.elements.addTodo.value

    if (newTodo === "") {
        alert('You need to type something in the input field')
    } else {
        pushToArray(newTodo, todos)
        document.querySelector('#summary').remove()    
        updateTodoList(todos)
        e.target.elements.addTodo.value = ''
    }
})


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

