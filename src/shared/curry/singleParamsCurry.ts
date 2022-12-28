type Fn = (...args: any[]) => any

type RestParams<Args extends unknown[]> = Args extends []
  ? Args
  : Args extends [unknown?, ...infer Rest]
  ? Rest
  : never

type SplitParams<Args extends unknown[], Splits extends unknown[] = []> = {
  recur: Args extends [...infer First, ...RestParams<Args>]
    ? SplitParams<RestParams<Args>, [...Splits, First]>
    : never
  splits: Splits
  inner: Args[number][]
}[number extends Args['length'] ? 'inner' : Args extends [] ? 'splits' : 'recur']

type Currying<Args extends unknown[], Ret> = Args extends []
  ? () => Ret
  : Args extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? (...args: First) => Rest extends [] ? Ret : Currying<Rest, Ret>
    : never
  : never

type Curry<F extends Fn> = F extends (...args: infer Args) => infer Ret
  ? Currying<SplitParams<Args>, Ret>
  : F

export function singleParamsCurry<F extends Fn>(fn: F): Curry<F> {
  const _args: unknown[] = []

  function _curry(arg: unknown) {
    _args.push(arg)
    if (_args.length < fn.length) {
      return _curry
    } else {
      const res = fn(..._args)
      _args.length = 0
      return res
    }
  }

  return _curry as unknown as Curry<F>
}

/* Test */
function foo(name: string, age: number, gender?: '男' | '女' | '无', date?: string) {
  gender = gender ?? '无'
  date = date ?? '0000-00-00'

  return `
    姓名：${name}
    年龄：${age}
    性别：${gender}
    出生日期：${date}
  `
}

const curryFoo = singleParamsCurry(foo)

console.log(curryFoo('why')(18)()())
