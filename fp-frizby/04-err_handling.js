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
    .map(c => JSON.parse(c))
    .fold(err => 3000, config => config.port);

console.log(result);
// PROBLEM: the file read is covered but if JSON.parse fails we still get an exception!
// Also, if we use '.map(c => tryCatch(() => JSON.parse(c)))' as a solution
// we have double boxing and need two fold operations, which is confusing
