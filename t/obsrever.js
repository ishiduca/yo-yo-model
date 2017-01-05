'use strict'
var test = require('tape')
var Observer = require('../model').Observer

test('オブザーバーが発行した値を受け取れているか', t => {
  var o = Observer()
  o.subscribe((a, b, c) => {
    t.is(a, 'foo', 'a eq "foo" # .subscribe')
    t.deepEqual(b, ['bar'], 'b eq ["bar"] # subscribe')
    t.deepEqual(c, ['hoge', ['hage']], '["hoge", ["hage"]]# subscribe')
  })
  o.once((a, b, c) => {
    t.is(a, 'foo', 'a eq "foo" # .once')
    t.deepEqual(b, ['bar'], 'b eq ["bar"] # once')
    t.deepEqual(c, ['hoge', ['hage']], '["hoge", ["hage"]]# once')
  })

  o.publish('foo', ['bar'], ['hoge', ['hage']])

  t.end()
})

test('.subscribeに登録したレシーバー関数は、オブザーバーが発行した複数回のイベントを全て拾えているか', t => {
  var o = Observer()
  var spy = []
  o.subscribe(v => spy.push(v))
  o.publish(1)
  o.publish(2)
  o.publish(3)
  t.deepEqual(spy, [1, 2, 3], 'spy deepEqual [1, 2, 3]')
  t.end()
})

test('.onceに登録したレシーバー関数は、オブザーバーが発行した複数回のイベントの初回のみ拾っているか', t => {
  var o = Observer()
  var spy = []
  o.once(v => spy.push(v))
  o.publish(-1)
  o.publish(-2)
  o.publish(-3)
  t.deepEqual(spy, [-1], 'spy deepEqual [-1]')
  t.end()
})
