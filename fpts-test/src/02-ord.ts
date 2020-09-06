// https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e

import { Eq } from 'fp-ts/Eq';

// type class Ord, intended to contain types that admit a total ordering:

type Ordering = -1 | 0 | 1

interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}

// instance of Ord for the type number:
const ordNumber: Ord<number> = {
    compare: (x, y) => x < y ? -1 : x > y ? 1 : 0,
    equals: (x, y) => x === y
}
