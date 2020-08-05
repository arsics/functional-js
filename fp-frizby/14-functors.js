const { List, Map } = require('immutable-ext');

// we've been using functors

// functors are types that have a 'map' method and obey some laws:
// - composability (fx is a functor):

    // functors must preserve function composition:
        //  fx.map(f).map(g) === fx.map(x => f(g(x)))

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});
const res1a = Box('squirrels')
            .map(s => s.substr(5))
            .map(s => s.toUpperCase())
            .fold(s => s)

const res1b = Box('squirrels')
            .map(s => s.substr(5).toUpperCase())
            .fold(s => s)

console.log(res1a, res1b) // works for Box, Right, Left, Either, Task...


    // second law of functors:
        // fx.map(id) === id(fx)

id = x => x

const res2a = Box('crayons').map(id)

const res2b = id(Box('crayons'))

console.log(res2a.fold(s => s), res2b.fold(s => s))  // also works for Box, Right, Left, Either, Task...
