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
