// Box, Task, Either, List - all are monads

// Monads have the 'F.of' and 'chain' implementations - the Monadic interface
// 'chain' is sometimes called 'flatMap', 'bind' or '>>=', 'of' is sometimes called 'pure'

const Task = require('data.task')

// httpGet('/user')
//     .map(user => httpGet(`/comments/${user.id}`)) // we get Task(Task([Comment]))

// httpGet('/user')
//     .chain(user => httpGet(`/comments/${user.id}`)) // we get Task([Comment])

// Monads allow us to nest computation!
const Box = x => ({
    map: f => Box(f(x)),
    chain: f => f(x),
    inspect: () => `Box(${x})`
});

const join = m =>
    m.chain(x => x) // Box(Box(x)) => Box(x)

// Some laws:
// 1. join(m.map(join)) == join(join(m))

const m1 = Box(Box(Box(3)))
const res1a = join(m1.map(join))
const res1b = join((join(m1)))
console.log(res1a.inspect(), res1b.inspect())

// 2. join(F.of(m)) == join(m.map(F.of))

const m2 = Task.of('thing')
const res2a = join(Task.of(m2))
const res2b = join(m2.map(Task.of))
console.log(res2a, res2b)