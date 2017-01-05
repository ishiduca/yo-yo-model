var d = require('global/document')
var inherits = require('inherits')
var Model = require('../../model')
var app = require('../../index')

inherits(Counter, Model)

function Counter (init) {
  Model.call(this, init)
}

Counter.prototype.update = function (n) {
  this.setState({count: this.state.count + n})
}

var creator = (state, model) => app.html `
  <main>
    <h1>${state.count}</h1>
    <button onclick=${ev => model.update(+1)}>inc</button>
    <button onclick=${ev => model.update(-1)}>dec</button>
  </main>
`

d.body.appendChild(app(creator, new Counter({count: 0})))
