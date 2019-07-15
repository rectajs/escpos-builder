import test from 'ava'
import ESC from '../src'

const esc = new ESC()

test('.init()', (t) => {
  t.is(esc.init().toString(), '\u001B\u0040')
  t.is(esc.reset().toString(), '\u001B\u0040')
})

test('.raw()', (t) => {
  t.is(esc.raw('Hello World').toString(), 'Hello World')
  t.not(esc.raw('Hello World').toString(), 'Hello World\n')
})

test('.text()', (t) => {
  t.is(esc.text('Hello World').toString(), 'Hello World\n')
})

test('.feed()', (t) => {
  t.is(esc.feed().toString(), '\n\n\n\n')
  t.is(esc.feed(5).toString(), '\n\n\n\n\n')
})

test('.underline()', (t) => {
  t.is(esc.underline(false).toString(), '\u001B\u002D\u0000')
  t.is(esc.underline(true).toString(), '\u001B\u002D\u0001')
  t.is(esc.underline(2).toString(), '\u001B\u002D\u0002')
})

test('.bold()', (t) => {
  t.is(esc.bold(false).toString(), '\u001B\u0045\u0000')
  t.is(esc.bold(true).toString(), '\u001B\u0045\u0001')
})

test('.doubleStrike()', (t) => {
  t.is(esc.doubleStrike(false).toString(), '\u001B\u0047\u0000')
  t.is(esc.doubleStrike(true).toString(), '\u001B\u0047\u0001')
})

test('.font()', (t) => {
  t.is(esc.font('A').toString(), '\u001B\u004D\u0030')
  t.is(esc.font('B').toString(), '\u001B\u004D\u0031')
  t.is(esc.font('C').toString(), '\u001B\u004D\u0032')
})

test('.align()', (t) => {
  t.is(esc.align('LEFT').toString(), '\u001B\u0061\u0000')
  t.is(esc.align('CENTER').toString(), '\u001B\u0061\u0001')
  t.is(esc.align('RIGHT').toString(), '\u001B\u0061\u0002')
})

test('.clear()', (t) => {
  t.is(esc.text('Hello World').clear().toString(), '')
})
