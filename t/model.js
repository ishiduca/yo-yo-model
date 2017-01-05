var test = require('tape')
var xtend = require('xtend')
var model = require('../model')

test('モデルの.initialStateと.stateが取得できるか', t => {
  var m = model({a: 1, b: {c: 100}})
  t.deepEqual(m.initialState, {a: 1, b: {c: 100}}, 'm.initialState deepEqual {a: 1, b: {c: 100}}')
  t.deepEqual(m.state, {a: 1, b: {c: 100}}, 'm.state deepEqual {a: 1, b: {c: 100}}')

  t.test('.setState(part)した場合、m.stateに反映されているか', tt => {
    var s = {a: 1, b: {c: 100, d: 200}}
    m.setState({b: xtend(m.state.b, {d: 200})})
    tt.deepEqual(m.initialState, {a: 1, b: {c: 100}}, 'm.initialState deepEqual {a: 1, b: {c: 100}')
    tt.deepEqual(m.state, s, 'm.state deepEqual {a: 1, b: {c: 100, d: 200}}')
    tt.end()
  })

  t.end()
})

test('model.setStateした時、model.observer.subscribeに登録したレシーバー関数に変更が通知されているか', t => {
  var m = model({count: 0})
  var spy = []
  m.observer.subscribe(state => spy.push(state))
  m.setState({count: m.state.count + 1})
  m.setState({count: m.state.count + 1})
  m.setState({count: m.state.count + 1})
  t.deepEqual(spy[0], {count: 1}, 'spy[0] deepEqual {count: 1}')
  t.deepEqual(spy[1], {count: 2}, 'spy[1] deepEqual {count: 2}')
  t.deepEqual(spy[2], {count: 3}, 'spy[2] deepEqual {count: 3}')
  t.end()
})
