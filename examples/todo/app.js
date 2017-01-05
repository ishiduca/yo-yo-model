var d = require('global/document')
var Todo = require('./model')
var Form = require('./form')
var Filter = require('./filter')
var List = require('./list')
var app = require('../../')

var todo = new Todo({
  todos: [],
  todo: '',
  filter: {
    selected: 0,
    values: ['All', 'Active', 'Completed']
  }
})

var creator = (state, model) => app.html `
    <main>
        ${Form(state, model)}
        ${Filter(state, model)}
        ${List(state, model)}
    </main>
`

d.body.appendChild(app(creator, todo))
