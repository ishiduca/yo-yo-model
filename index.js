var yo = require('yo-yo')
module.exports = function app (create, model) {
  var dom = create(model.initialState, model)
  model.observer.subscribe(function (state) {
    yo.update(dom, create(state, model))
  })
  return dom
}

module.exports.html = yo
