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
export function reduceDict<T>(
  initializer: T,
  dict: Dict<T>,
  operator: (accumilator: T, item: T, index: number) => T
) {
  let intermediatAccumilator: T = initializer

  Object.keys(dict).forEach((itemKey, index) => {
    let item = dict[itemKey]
    if (typeof item !== "undefined") {
      intermediatAccumilator = operator(intermediatAccumilator, item, index)
    }
  })

  return intermediatAccumilator
}

let priceList: Dict<number> = {
  t: 2,
  m: 4,
  v: 3,
}

let rr = reduceDict(0, priceList, (accumilator, item, index) => {
  return (accumilator += item)
})

console.log(rr)
