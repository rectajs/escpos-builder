export function isString (value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber (value) {
  return typeof value === 'number' && isFinite(value)
}

export function isBoolean (value) {
  return typeof value === 'boolean'
}
