// strings and arrays are semigroup types (types with a concat method)
const strConcat = 'a'.concat('b').concat('c');
const arrConcat = [1,2].concat([3,4]).concat([5]);

console.log(strConcat);
console.log(arrConcat);

// semigroups are associative
console.log('a'.concat('b'.concat('c')));

// create a semigroup that concats numbers by summing them
const Sum = x =>
({
    x,
    concat: (o) => Sum(x + o.x)
})

const resSum = Sum(2).concat(Sum(3).concat(Sum(4)));
console.log(resSum.x); // 9

// booleans can also be semigroups:
true && false // false
true && true // true

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y) // destructuring added for readability
})

const resAll = All(true).concat(All(false).concat(All(true)));
console.log(resAll.x); // false

// semigroup that is ignoring the concated and just keeeping the first
const First = x =>
({
    x,
    concat: ({x: y}) => First(x)
})

const resFirst = First('asd').concat(First('qwe').concat(First('zxc')));
console.log(resFirst.x); // asd
