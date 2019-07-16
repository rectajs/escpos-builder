import test from 'ava'
import EscPos, { MODE } from '../src'

const esc = new EscPos()
const buf = (array) => Buffer.from(Uint8Array.from(array))

test('.init()', (t) => {
  t.deepEqual(esc.init().output(), buf([0x1B, 0x40]))
  t.deepEqual(esc.reset().output(), buf([0x1B, 0x40]))
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
  t.deepEqual(esc.underline(false).output(), buf([0x1B, 0x2D, 0x00]))
  t.deepEqual(esc.underline(true).output(), buf([0x1B, 0x2D, 0x01]))
  t.deepEqual(esc.underline(2).output(), buf([0x1B, 0x2D, 0x02]))
})

test('.bold()', (t) => {
  t.deepEqual(esc.bold(false).output(), buf([0x1B, 0x45, 0x00]))
  t.deepEqual(esc.bold(true).output(), buf([0x1B, 0x45, 0x01]))
})

test('.doubleStrike()', (t) => {
  t.deepEqual(esc.doubleStrike(false).output(), buf([0x1B, 0x47, 0x00]))
  t.deepEqual(esc.doubleStrike(true).output(), buf([0x1B, 0x47, 0x01]))
})

test('.font()', (t) => {
  t.deepEqual(esc.font('A').output(), buf([0x1B, 0x4D, 0x30]))
  t.deepEqual(esc.font('B').output(), buf([0x1B, 0x4D, 0x31]))
  t.deepEqual(esc.font('C').output(), buf([0x1B, 0x4D, 0x32]))
})

test('.align()', (t) => {
  t.deepEqual(esc.align('LEFT').output(), buf([0x1B, 0x61, 0x00]))
  t.deepEqual(esc.align('CENTER').output(), buf([0x1B, 0x61, 0x01]))
  t.deepEqual(esc.align('RIGHT').output(), buf([0x1B, 0x61, 0x02]))
})

test('.mode()', (t) => {
  t.deepEqual(esc.mode(MODE.FONT_A).output(), buf([0x1B, 0x21, 0x00]))
  t.deepEqual(esc.mode(MODE.FONT_B).output(), buf([0x1B, 0x21, 0x01]))
  t.deepEqual(esc.mode(MODE.BOLD).output(), buf([0x1B, 0x21, 0x08]))
  t.deepEqual(esc.mode(MODE.DOUBLE_H).output(), buf([0x1B, 0x21, 0x10]))
  t.deepEqual(esc.mode(MODE.DOUBLE_W).output(), buf([0x1B, 0x21, 0x20]))
  t.deepEqual(esc.mode(MODE.UNDERLINE).output(), buf([0x1B, 0x21, 0x80]))

  t.deepEqual(esc.mode(MODE.UNDERLINE, MODE.BOLD).output(), buf([0x1B, 0x21, 0x88]))
  t.deepEqual(esc.mode(MODE.UNDERLINE | MODE.BOLD).output(), buf([0x1B, 0x21, 0x88]))
})

test('.clear()', (t) => {
  t.is(esc.text('Hello World').clear().toString(), '')
})
