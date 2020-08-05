const Task = require('data.task')

Task.of(1) // similar to Box, can hold anything - 'hello', true, ...
    .fork(
        err => console.log('error', err),
        x => console.log('success', x)
    )   
// when run, returns a 'success 1'

Task.rejected(1)
    .map(x => x + 1) // does not affect the result
    .fork(
        err => console.log('error', err),
        x => console.log('success', x)
    )
// when run returns a 'error 1'

Task.of(1)
    .map(x => x + 1)
    .chain(x => Task.of(x + 1))
    .fork(
        err => console.log('error', err),
        x => console.log('success', x)
    )   
// when run, returns a 'success 3'

// - where Task is useful:

// const launchMissiles = () =>
//     console.log('launch missiles!')
// launchMissiles()

const launchMissiles = () =>
    new Task((rej, res) => {
        console.log('launch missiles!')
        res('missile')
    })

launchMissiles()
    .map(x => x + '!')
    .fork(
        err => console.log('error', err),
        x => console.log('success', x)
    )
// when run returns 'success missile!'

// but we can delay the execution if fork is not run, so we can have an app using this
// and also adding logic:
const app = launchMissiles().map(x => x + '!')

app.map(x => x + '?').fork(
                            err => console.log('error', err),
                            x => console.log('success', x)
                        )