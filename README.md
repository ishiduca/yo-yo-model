# yo-yo-model

create a small application with [yo-yo](https://www.npmjs.com/package/yo-yo).

## example
### counter

```js
var d = require('global/document')
var inherits = require('inherits')
var Model = require('yo-yo-model/model')
var app = require('yo-yo-model')

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
```

[example todo-list](https://github.com/ishiduca/yo-yo-model/tree/master/examples/todo)

## api

### var app = require('yo-yo-model')

`app` is function. returns DOM element. takes two arguments.
`app.html` is shortcut of `yo-yo`.

```js
var dom = app(createFunc, modelInstance)
```

- `createFunc` is function. returns DOM element. takes two arguments, `state object`, `model`. model is instance of `Model`.
- `modelInstance` is instance of `Model`.

### var Model = require('yo-yo-model/model')

`Model` is constructor. returns `modelInstance`.

```js
var model = new Model(initialState)
```

the role of the model is to provide a handler for manipulating the state and to manage the state.
user should create a model that extends Model.prototype.

#### properties

- `initialState` is the initial state.
- `state`. should keep it only with reference.
- `errors`. observer object. has 4 methods - `publish`, `subscribe`, `unSubscribe` and `once`. does publish `error` when an exception occurs internally.
- `observer`. this is used internally to notify the state change of the model. Basically there is no direct touch by the user.

### method

- `setState` take an argument, `partial state object`. merges partial state with internal state, and model notifies you through the model.observer that it merged.


