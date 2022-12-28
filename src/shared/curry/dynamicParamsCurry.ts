type Fn = (...args: any[]) => any

type Func<Args extends unknown[], Ret> = (...args: Args) => Ret

type RemoveLastArg<Args extends unknown[]> = Args extends [] | [unknown?]
  ? Args
  : Args extends [...infer Rest, unknown?]
  ? Rest
  : never

type NextArgs<Args extends unknown[], CurrentArgs extends unknown[]> = Args extends [
  ...CurrentArgs,
  ...infer Rest
]
  ? Rest
  : Args

type Currying<
  Args extends unknown[],
  Ret,
  CurrentArgs extends unknown[] = Args,
  CurrentRet = Ret
> = number extends CurrentArgs['length']
  ? Func<CurrentArgs, CurrentRet>
  : CurrentArgs extends [] | [unknown?]
  ? Func<CurrentArgs, CurrentRet>
  : Currying<
      Args,
      Ret,
      RemoveLastArg<CurrentArgs>,
      Currying<NextArgs<Args, RemoveLastArg<CurrentArgs>>, Ret>
    > &
      Func<CurrentArgs, CurrentRet>

type Curry<F extends Fn> = F extends (...args: infer Args) => infer Ret ? Currying<Args, Ret> : F

export function dynamicParamsCurry<F extends Fn>(fn: F): Curry<F> {
  function _curry(...args: unknown[]) {
    if (args.length === 0) {
      args.push(undefined)
    }

    if (args.length >= fn.length) {
      return fn(...args)
    }

    return (..._args: unknown[]) => {
      if (_args.length === 0) {
        _args.push(undefined)
      }

      return _curry(...args, ..._args)
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

const curryFoo = dynamicParamsCurry(foo)

console.log('普通调用\n', curryFoo('why')(18)('男')('2022-07-30'))

const curryFoo_params_2 = curryFoo('why', 18)

console.log('没调用完，输出中间函数\n', curryFoo_params_2('男'))
console.log('已调用完，输出最终结果\n', curryFoo_params_2('男')())
console.log('没调用完，输出中间函数\n', curryFoo_params_2())
console.log('已调用完，输出最终结果\n', curryFoo_params_2()('2022-07-30'))
console.log('已调用完，输出最终结果\n', curryFoo_params_2('女')('2022-07-30'))
