// https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e

import { Ord, fromCompare, contramap } from 'fp-ts/lib/Ord'

// instance of Ord for the type number by using the helper fn fromCompare:
const ordNumber: Ord<number> = fromCompare((x, y) => x < y ? -1 : x > y ? 1 : 0);

// we can easily create a min fn when given an Ord instance for type A:
function min<A>(O: Ord<A>): (x: A, y: A) => A {
    return (x, y) => O.compare(x, y) === -1 ? x : y;
}

console.log('minimum of 5 & 3 is: ' + min(ordNumber)(5, 3))

// again, with contramap we can derive an Ort instance for Person:
type Person = {
  name: string
  age: number
}

const ordPerson: Ord<Person> = contramap((p: Person) => p.age)(ordNumber)

const topalovici = [
  { name: 'Laki', age: 44 },
  { name: 'Aksentije', age: 102 },
  { name: 'Milutin', age: 79 },
  { name: 'Pantelija', age: 150 },
  { name: 'Mirko', age: 24 },
  { name: 'Maksimilijan', age: 126 }
];
console.log('Ordered Topalovici: ' + topalovici.sort(ordPerson.compare).map(t => t.name))
