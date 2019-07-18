import test from 'ava'
import * as utils from '../src/utils'

test('check is string', (t) => {
  t.is(utils.isString('0'), true)
  t.is(utils.isString(String(123)), true)

  t.is(utils.isString(1), false)
  t.is(utils.isString(true), false)

  t.is(utils.isString({}), false)
  t.is(utils.isString([]), false)

  t.is(utils.isString(Uint8Array.from([0x01, 0x02, 0x03])), false)
})

test('check is boolean', (t) => {
  t.is(utils.isBoolean(true), true)
  t.is(utils.isBoolean(false), true)

  t.is(utils.isBoolean(1), false)
  t.is(utils.isBoolean(0), false)

  t.is(utils.isBoolean('1'), false)
  t.is(utils.isBoolean(''), false)

  t.is(utils.isBoolean(Uint8Array.from([0x01, 0x02, 0x03])), false)
})

test('check is number', (t) => {
  t.is(utils.isNumber(1), true)
  t.is(utils.isNumber(0), true)
  t.is(utils.isNumber(0x11), true)

  t.is(utils.isNumber(Infinity), false)
  t.is(utils.isNumber(NaN), false)

  t.is(utils.isNumber('1'), false)
  t.is(utils.isNumber(false), false)
  t.is(utils.isNumber(true), false)

  t.is(utils.isNumber('1'), false)
  t.is(utils.isNumber([]), false)
  t.is(utils.isNumber({}), false)

  t.is(utils.isNumber(Uint8Array.from([0x01, 0x02, 0x03])), false)
})
