var xtend = require('xtend')
var clone = require('clone')

module.exports = Model
module.exports.Observer = Observer

function Model (initialState) {
  if (!(this instanceof Model)) return new Model(initialState)
  this._initialState = initialState || {}
  this._state = xtend(initialState)
  this.errors = new Observer()
  this.observer = new Observer()
}

Model.prototype.setState = function (partial) {
  this._state = xtend(this._state, partial)
  return this.observer.publish(this.state)
}

Object.defineProperty(Model.prototype, 'state', {
  get: function () { return clone(this._state) }
})

Object.defineProperty(Model.prototype, 'initialState', {
  get: function () { return clone(this._initialState) }
})

function Observer () {
  if (!(this instanceof Observer)) return new Observer()
  this.subs = []
}

Observer.prototype.publish = function () {
  var args = [].slice.apply(arguments)
  var isPublished = false
  this.subs.forEach(function (sub) {
    sub.apply(null, args)
    isPublished = true
  })
  return isPublished
}

Observer.prototype.subscribe = function (sub) {
  if (typeof sub === 'function') this.subs.push(sub)
  return sub
}

Observer.prototype.unSubscribe = function (sub) {
  if (typeof sub !== 'function') this.subs = []
  else this.subs = this.subs.filter(f)
  return sub
  function f (s) { return s !== sub }
}

Observer.prototype.once = function (sub) {
  var me = this
  function wrap () {
    sub.apply(null, arguments)
    me.unSubscribe(wrap)
  }
  return this.subscribe(wrap)
}
