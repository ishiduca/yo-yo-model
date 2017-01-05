var yo = require('yo-yo')

module.exports = (state, model) => yo `
    <form
        onsubmit=${ev => {
          ev.preventDefault()
          model.addTodo()
        }}
    >
        <input
            type="text"
            required
            placeholder="Todo"
            value=${state.todo}
            onchange=${ev => model.updateTodo(ev.target.value)}
        />
    </form>
`
