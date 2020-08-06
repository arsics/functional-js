// https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3
import { Eq, contramap } from 'fp-ts/Eq';


// Eq is a 'type class', implemented in ts as an interface

//  instance of Eq for the type number - type number is now a member of type class Eq
const eqNumber: Eq<number> = {
    equals: (x, y) => x === y
}
function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
    return (a, as) => as.some(item => E.equals(item, a))
}

console.log(elem(eqNumber)(3, [1, 2, 3, 4, 5, 6]))
console.log(elem(eqNumber)(3, [1, 2, 4, 5, 6]))

// Eq instances for more complex types:

type Point = {
    x: number
    y: number
}
const eqPoint: Eq<Point> = {
    equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y
}

const point1 = { x: 2, y: 3 };
const point2 = { x: 3, y: 2 };
const point3 = { x: 3, y: 3 };
console.log(elem(eqPoint)(point1, [point1, point2, point3]))
console.log(elem(eqPoint)(point1, [point3, point2, point3]))

// with contramap we can derive an instance of Eq for the type User
// if we provide a mapping function from User to number:
type User = {
    userId: number
    name: string
}

// we are mapping a User to his userId, and then we use eqNumber
// contramap gives us an instance of Eq for the type User
const eqUser: Eq<User> = contramap((u: User) => u.userId)(eqNumber)

console.log('User equality: ' + eqUser.equals({ userId: 9570, name: 'Sasha' }, { userId: 9570, name: 'Sancho' }))