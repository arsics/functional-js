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

const getPort = () => {
    try {
        const config = JSON.parse(fs.readFileSync('config.json'));
        return config.port;
    } catch (err) {
        return 3000;
    }
};

const result = getPort();
console.log(result);
