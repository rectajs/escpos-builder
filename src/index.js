import MutableBuffer from 'mutable-buffer'
import { LF, ESC } from './constant'

export default class EscPosBuilder {
  constructor () {
    this.buffer = new MutableBuffer()
  }

  raw (buffer) {
    this.buffer.write(buffer)

    return this
  }

  init () {
    this.buffer.write(ESC)
    this.buffer.write('\u0040')

    return this
  }

  reset () {
    return this.init()
  }

  feed (n = 4) {
    this.buffer.write(new Array(n).fill(LF).join(''))

    return this
  }

  text (text) {
    this.buffer.write(text)
    this.buffer.write(LF)

    return this
  }

  underline (mode) {
    this.buffer.write(ESC)
    this.buffer.write('\u002D')
    this.buffer.writeUInt8(mode)

    return this
  }

  bold (mode) {
    this.buffer.write(ESC)
    this.buffer.write('\u0045')
    this.buffer.writeUInt8(mode)

    return this
  }

  doubleStrike (mode) {
    this.buffer.write(ESC)
    this.buffer.write('\u0047')
    this.buffer.writeUInt8(mode)

    return this
  }

  font (mode) {
    const code = String(mode).toUpperCase().charCodeAt(0) - 65

    this.buffer.write(ESC)
    this.buffer.write('\u004D')
    this.buffer.write(code)

    return this
  }

  align (mode) {
    const align = String(mode).toLowerCase()
    const code  = [
      'left',
      'center',
      'right',
    ].indexOf(align)

    this.buffer.write(ESC)
    this.buffer.write('\u0061')
    this.buffer.writeUInt8(code)

    return this
  }

  clear () {
    this.buffer.clear()

    return this
  }

  output () {
    return this.buffer.flush()
  }

  toString () {
    return this.output().toString()
  }
}
