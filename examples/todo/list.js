var yo = require('yo-yo')
var domcss = require('dom-css')

function css (el, style) {
  domcss(el, style)
  return el
}

module.exports = (state, model) => yo `
    <ul>
        ${state.todos.map(todo => {
          var selected = state.filter.selected
          var value = selected === 2 && todo.completed
                    ? todo.value
                    : selected === 1 && !todo.completed
                    ? todo.value
                    : selected === 0
                    ? todo.value
                    : null

          if (value === null) return

          return css(yo `
            <li onclick=${ev => model.toggleTodo(todo)}>${value}</li>
          `, { textDecoration: todo.completed ? 'line-through' : 'none' })
        })}
    </ul>
`
