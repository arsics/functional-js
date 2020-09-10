// https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7

interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

/** number `Semigroup` under multiplication */
const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

/** number `Semigroup` under addition */
const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

// What if, given a type A, you can't find an associative operation on A?
// You can create a (trivial) semigroup instance for every type just using the following constructions:

/** Always return the first argument */
function getFirstSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => x }
}

/** Always return the second argument */
function getLastSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => y }
}

// Another technique is to define a semigroup instance for Array<A> (*), called the free semigroup of A
function getArraySemigroup<A = never>(): Semigroup<Array<A>> {
  return { concat: (x, y) => x.concat(y) }
}

// and map the elements of A to the singleton elements of Array<A>:
function of<A>(a: A): Array<A> {
  return [a]
}

// (The free semigroup of A is the semigroup whose elements are all possible non-empty finite sequences of elements of A)
