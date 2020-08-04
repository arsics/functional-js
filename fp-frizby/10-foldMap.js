const { List, Map } = require('immutable-ext');

const Sum = x =>
({
    x,
    concat: (o) => Sum(x + o.x)
});
Sum.empty = () => Sum(0);

// - we can fold over boxed values:

const res1 = List.of(Sum(1), Sum(2), Sum(3))
    .fold(Sum.empty())
    // .reduce((acc, x) => acc.concat(x), Sum.empty());
console.log(res1);

const res2 = Map({brian: Sum(3), sarah: Sum(5)})
    .fold(Sum.empty())
console.log(res2);

// - lists and maps rarely have boxed values so we need to map them before folding:

const res3 = Map({brian: 3, sarah: 5})
    .map(Sum)
    .fold(Sum.empty())
console.log(res3);

const res4 = List.of(1,2,3)
    .map(Sum)
    .fold(Sum.empty())
console.log(res4);

// - foldMap unifies the map and fold:

const res5 = List.of(1,2,3)
    .foldMap(Sum, Sum.empty())
console.log(res5);

const res6 = Map({brian: 3, sarah: 5})
    .foldMap(Sum, Sum.empty())
console.log(res6);
