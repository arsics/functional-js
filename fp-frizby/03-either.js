const Right = x => ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
});
const Left = x => ({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
});

const resultRight = Right(3).map(n => n + 1).map(n => n / 2).fold(x => 'error', x => x);
console.log(`resultRight: ${resultRight}`);

const resultLeft = Left(3).map(n => n + 1).map(n => n / 2).fold(x => 'error', x => x);
console.log(`resultLeft: ${resultLeft}`);

// ---

const findColor = name =>
    ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name];

const resultRed = findColor('red').slice(1).toUpperCase();
console.log(`Result for 'red': ${resultRed}`);

const resultGreen = findColor('green').slice(1).toUpperCase(); // throws
console.log(`Result for 'green': ${resultGreen}`);
