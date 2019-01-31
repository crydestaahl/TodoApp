
//The LIST
let todos = getSavedTodos()

const filters = {
    searchText: ''
}

renderFilteredTodos(todos, filters)

//Listen for search in input
document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderFilteredTodos(incompleteTodos, filters)
})

// Check how many todos left and update/render to the DOM
updateTodoList(todos)


//Check and render completed todos
renderCompletedTodos(todos)

 //Listen for submits & Render new todo
document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()

    const newTodo = e.target.elements.addTodo.value

    if (newTodo === "") {
        alert('You need to type something in the input field')
    } else {
        pushToArray(newTodo, todos)
        document.querySelector('#summary').remove()    
        saveTodos(todos)
        updateTodoList(todos)
        e.target.elements.addTodo.value = ''
    }
})

//Hide/Show completed
const hideCompletedCheckbox = document.querySelector('#hide-completed')

hideCompletedCheckbox.addEventListener('change', (e) => {
    const div = document.querySelector('#finished-todos')
    
    if (hideCompletedCheckbox.checked) {
        div.style.display = 'none'
    } else {
        div.style.display = 'block'
    }
}) 








/********************************************************
 The Graveyard
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



