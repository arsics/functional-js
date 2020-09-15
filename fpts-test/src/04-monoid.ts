// https://dev.to/gcanti/getting-started-with-fp-ts-monoid-ja0

import { Semigroup } from 'fp-ts/lib/Semigroup'
import { fold, getStructMonoid } from 'fp-ts/lib/Monoid'
import { getApplyMonoid, some, none, Option, getLastMonoid } from 'fp-ts/lib/Option'

interface Monoid<A> extends Semigroup<A> {
    readonly empty: A
}

/** number `Monoid` under addition */
const monoidSum: Monoid<number> = {
    concat: (x, y) => x + y,
    empty: 0
}

/** number `Monoid` under multiplication */
const monoidProduct: Monoid<number> = {
    concat: (x, y) => x * y,
    empty: 1
}

const monoidString: Monoid<string> = {
    concat: (x, y) => x + y,
    empty: ''
}

/** boolean monoid under conjunction */
const monoidAll: Monoid<boolean> = {
    concat: (x, y) => x && y,
    empty: true
}

/** boolean monoid under disjunction */
const monoidAny: Monoid<boolean> = {
    concat: (x, y) => x || y,
    empty: false
}

// deriving monoids for complex types:
type Point = {
    x: number
    y: number
}
const monoidPoint: Monoid<Point> = getStructMonoid({
    x: monoidSum,
    y: monoidSum
})

type Vector = {
    from: Point
    to: Point
}
const monoidVector: Monoid<Vector> = getStructMonoid({
    from: monoidPoint,
    to: monoidPoint
})

// folding:
console.log(fold(monoidSum)([1, 2, 3, 4])) // 10
console.log(fold(monoidProduct)([1, 2, 3, 4])) // 24
console.log(fold(monoidString)(['a', 'b', 'c'])) // 'abc'
console.log(fold(monoidAll)([true, false, true])) // false
console.log(fold(monoidAny)([true, false, true])) // true


// deriving a monoid for Option<A> when we have a monoid for A:

const M = getApplyMonoid(monoidSum)

console.log(M.concat(some(1), none)) // none
console.log(M.concat(some(1), some(2))) // some(3)
console.log(M.concat(some(1), M.empty)) // some(1)


// managing optional settings example:

/** VSCode settings */
interface Settings {
    /** Controls the font family */
    fontFamily: Option<string>
    /** Controls the font size in pixels */
    fontSize: Option<number>
    /** Limit the width of the minimap to render at most a certain number of columns. */
    maxColumn: Option<number>
  }
  
  const monoidSettings: Monoid<Settings> = getStructMonoid({
    fontFamily: getLastMonoid<string>(),
    fontSize: getLastMonoid<number>(),
    maxColumn: getLastMonoid<number>()
  })
  
  const workspaceSettings: Settings = {
    fontFamily: some('Courier'),
    fontSize: none,
    maxColumn: some(80)
  }
  
  const userSettings: Settings = {
    fontFamily: some('Fira Code'),
    fontSize: some(12),
    maxColumn: none
  }
  
  /** userSettings overrides workspaceSettings */
  const mergedSettings = monoidSettings.concat(workspaceSettings, userSettings)
  console.log('mergedSettings: ' + JSON.stringify(mergedSettings));
  /*
  { fontFamily: some("Fira Code"),
    fontSize: some(12),
    maxColumn: some(80) }
  */
 