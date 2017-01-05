var inherits = require('inherits')
var xtend = require('xtend')
var Model = require('../../model')

inherits(Todo, Model)
module.exports = Todo

function Todo (initialState) {
  Model.call(this, initialState)
}

Todo.prototype.addTodo = function () {
  var todo = {
    id: this.state.todos.length + 1,
    value: this.state.todo,
    completed: false
  }
  this.setState({
    todo: '',
    todos: this.state.todos.concat(todo)
  })
}

Todo.prototype.updateTodo = function (value) {
  this.setState({todo: value})
}

Todo.prototype.toggleTodo = function (todo) {
  this.setState({todos: this.state.todos.map(m)})
  function m (t) {
    return t.id === todo.id ? xtend(t, {completed: !t.completed}) : t
  }
}

Todo.prototype.updateFilter = function (n) {
  this.setState({filter: xtend(this.state.filter, {selected: n})})
}
