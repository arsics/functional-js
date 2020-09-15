// https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7

import { ordNumber } from 'fp-ts/lib/Ord'
import { Semigroup, getMeetSemigroup, getJoinSemigroup, getStructSemigroup, semigroupSum, semigroupAll, getFunctionSemigroup, fold, semigroupProduct } from 'fp-ts/lib/Semigroup'

// Derive a semigroup instance from an Ord instance:

/** Takes the minimum of two values */
const semigroupMin: Semigroup<number> = getMeetSemigroup(ordNumber)
console.log('semigroupMin(2,1):' + semigroupMin.concat(2, 1)) // 1

/** Takes the maximum of two values  */
const semigroupMax: Semigroup<number> = getJoinSemigroup(ordNumber)
console.log('semigroupMax(2,1):' + semigroupMax.concat(2, 1)) // 2

// Derive a Semigroup instance for a complex type:
type Point = {
  x: number
  y: number
}
const semigroupPoint: Semigroup<Point> = getStructSemigroup({
  x: semigroupSum,
  y: semigroupSum
})
console.log('semigroupPoint({x:1,y:2}, {x:5,y:6}):' + JSON.stringify(semigroupPoint.concat({x:1,y:2}, {x:5,y:6})));

// combinator that allows to derive a Semigroup instance for functions:
// `semigroupAll` is the boolean semigroup under conjunction
const semigroupPredicate: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(
  semigroupAll
)<Point>()

// Now we can "merge" two predicates on Points:
const isPositiveX = (p: Point): boolean => p.x >= 0
const isPositiveY = (p: Point): boolean => p.y >= 0

const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY)

console.log(isPositiveXY({ x: 1, y: 1 })) // true
console.log(isPositiveXY({ x: 1, y: -1 })) // false
console.log(isPositiveXY({ x: -1, y: 1 })) // false
console.log(isPositiveXY({ x: -1, y: -1 })) // false

// folding:
const sum = fold(semigroupSum)
console.log(sum(0, [1, 2, 3, 4])) // 10

const product = fold(semigroupProduct)
console.log(product(1, [1, 2, 3, 4])) // 24