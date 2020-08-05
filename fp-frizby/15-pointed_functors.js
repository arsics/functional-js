const Task = require('data.task')

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});

Task.of('hello') // Task('hello'), much simpler than:
new Task((rej, res) => res('hello'))

Either.of('hello') // Right('hello')
Box.of(100) // Box(100)