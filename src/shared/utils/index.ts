export function isNumber(target: any): target is number {
  return typeof target === 'number'
}

export function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean'
}

export function isString(target: any): target is string {
  return typeof target === 'string'
}

export function isSymbol(target: any): target is symbol {
  return typeof target === 'symbol'
}

export function isBigInt(target: any): target is bigint {
  return typeof target === 'bigint'
}

export function isFunction<T = Function>(target: any): target is T {
  return typeof target === 'function'
}

export function isObject(target: any): target is object {
  return typeof target === 'object' && target !== null
}

export const isArray = Array.isArray
