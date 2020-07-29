// Monoid is a semigroup type that has a neutral element (concat gives back the same element)

const Sum = x =>
({
    x,
    concat: (o) => Sum(x + o.x)
});

// Monoid neutral element:
Sum.empty = () => Sum(0);
console.log(Sum(2).concat(Sum.empty()));
console.log(Sum.empty().concat(Sum(3)));

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y) // destructuring added for readability
})

// Monoid neutral element:
All.empty = () => All(true);
console.log(All(true).concat(All.empty()));
console.log(All(false).concat(All.empty()));

// semigroup that is ignoring the concated and just keeeping the first
const First = x =>
({
    x,
    concat: ({x: y}) => First(x)
})

// First does not have a neutral element so it cannot be a monoid!

// Reducing an array of monoids vs groups:
const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0);

console.log(sum([1,2,3]));
console.log(sum([0]));

const all = xs =>
    xs.reduce((acc, x) => acc + x, true);

console.log(all([true, false]));
console.log(all([]));

const first = xs =>
    xs.reduce((acc, x) => acc);

console.log(first(['fizz', 'buzz']));
console.log(first([])); // throws an error

// So, semigroups are not safe to reduce, monoids are