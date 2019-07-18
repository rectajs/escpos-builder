import MutableBuffer from 'mutable-buffer'
import iconv from 'iconv-lite'
import { LF, ESC } from './constant'
import { isNumber, isString, isBoolean } from './utils'

export {
  MODE,
} from './constant'

export default class EscPosBuilder {
  constructor (encoding = 'utf-8') {
    this.encoding = encoding
    this.buffer   = new MutableBuffer()
  }

  setEncoding (encoding) {
    this.encoding = encoding

    return this
  }

  getEncoding () {
    return this.encoding
  }

  write (value, encode) {
    if (isNumber(value))
      this.buffer.writeUInt8(value)
    else if (isBoolean(value))
      this.buffer.writeUInt8(value ? 1 : 0)
    else if (isString(value))
      this.buffer.write(iconv.encode(value, encode || this.encoding))
    else
      this.buffer.write(value)

    return this
  }

  raw (buffer) {
    this.buffer.write(buffer)

    return this
  }

  init () {
    this.write(ESC)
    this.write('@')

    return this
  }

  reset () {
    return this.init()
  }

  feed (n = 4, native = false) {
    if (native) {
      this.write(ESC)
      this.write('d')
      this.write(n)
    } else
      this.write(new Array(n).fill(LF).join(''))

    return this
  }

  reverse (n = 4) {
    this.write(ESC)
    this.write('e')
    this.write(n)

    return this
  }

  text (text) {
    this.write(text)
    this.write(LF)

    return this
  }

  underline (mode) {
    this.write(ESC)
    this.write('-')
    this.write(mode)

    return this
  }

  bold (mode) {
    this.write(ESC)
    this.write('E')
    this.write(mode)

    return this
  }

  doubleStrike (mode) {
    this.write(ESC)
    this.write('G')
    this.write(mode)

    return this
  }

  font (mode) {
    const code = String(mode).toUpperCase().charCodeAt(0) - 65

    this.write(ESC)
    this.write('M')
    this.write(`${code}`)

    return this
  }

  align (mode) {
    const align = String(mode).toLowerCase()
    const code  = ['left', 'center', 'right'].indexOf(align)

    this.write(ESC)
    this.write('a')
    this.write(code)

    return this
  }

  mode (...params) {
    const code = params.reduce((a, b) => (a | b), 0x00)

    this.write(ESC)
    this.write('!')
    this.write(code)

    return this
  }

  clear () {
    this.buffer.clear()

    return this
  }

  output () {
    return this.buffer.flush()
  }

  toString (encoding) {
    return iconv.decode(this.output(), encoding || this.encoding)
  }
}
