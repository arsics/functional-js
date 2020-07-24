const Right = x => ({
    map: f => Right(f(x)),
    inspect: () => `Right(${x})`
});
const Left = x => ({
    map: f => Left(x),
    inspect: () => `Left(${x})`
});

const resultRight = Right(3).map(n => n + 1).map(n => n / 2);
console.log(resultRight.inspect());

const resultLeft = Left(3).map(n => n + 1).map(n => n / 2);
console.log(resultLeft.inspect()); // Left does not apply f to x in map
