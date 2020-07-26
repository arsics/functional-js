const Right = x => ({
    map: f => Right(f(x)),
    chain: f => f(x),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
});
const Left = x => ({
    map: f => Left(x),
    chain: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
});

const fs = require('fs');

// Use chain for composable error handling with nested Eithers

const tryCatch = f => {
    try {
        return Right(f());
    } catch(e) {
        return Left(e);
    }
}

const result = tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(err => 3000, config => config.port);

console.log(result);
// both possible exceptions hadled, without double boxing
