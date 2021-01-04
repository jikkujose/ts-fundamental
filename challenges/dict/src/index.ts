export type Dict<T> = {
  [key: string]: T | undefined
}

// Array.prototype.map, but for Dict
export function mapDict<T, S>(
  dict: Dict<T>,
  operator: (arg: T, index: number) => S
): Dict<S> {
  let result: Dict<S> = {}

  Object.keys(dict).forEach((dictKey, index) => {
    let originalItem = dict[dictKey]
    if (typeof originalItem !== "undefined")
      result[dictKey] = operator(originalItem, index)
  })

  return result
}

let someDict = {
  a: "a",
  b: "b",
}

let something = mapDict(someDict, (item, index) => [item])

// Array.prototype.reduce, but for Dict
export function reduceDict<T, S>(
  initializer: S,
  dict: Dict<T>,
  operator: (accumulator: S, item: T, index: number) => S
) {
  let _accumulator: S = initializer

  Object.keys(dict).forEach((itemKey, index) => {
    let item = dict[itemKey]
    if (typeof item !== "undefined") {
      _accumulator = operator(_accumulator, item, index)
    }
  })

  return _accumulator
}

let priceList: Dict<number> = {
  t: 2,
  m: 4,
  v: 3,
}

reduceDict(0, priceList, (accumilator, item, index) => {
  return (accumilator += item)
})
