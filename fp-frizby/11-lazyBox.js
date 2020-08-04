const nextCharForNumberString = str => {
    const trimmed = str.trim();
    const num = parseInt(trimmed);
    const nextNumber = num + 1;
    return String.fromCharCode(nextNumber);
}

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});

const result1 = Box(' 64  ')
    .map(abba => abba.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase())

console.log(result1)

// a LazyBox takes a function (g) instead of a value (x in the Box example):
const LazyBox = g => ({
    map: f => LazyBox(() => f(g())),
    fold: f => f(g())
})

const result2 = LazyBox(() => ' 64  ')
    .map(abba => abba.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase()) // if this line is commented out none of the functions will run - lazy!

console.log(result2)
