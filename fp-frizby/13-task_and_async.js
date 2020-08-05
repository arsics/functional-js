const Task = require('data.task')
const fs = require('fs')

// const app = () =>
//     fs.readFile('config.json', 'utf-8', (err, contents) => {
//         if (err) throw err
//         const newContents = contents.replace(/4/g, '6')
//         fs.writeFile('config1.json', newContents, (err, _) => {
//             if (err) throw err
//             console.log('success')
//         })
//     })
// app()

// - we want to wrap the async actions (feadFile and writeFile) in Tasks:

const readFile = (filename, encoding) =>
    new Task((rej, res) =>
        fs.readFile(filename, encoding, (err, contents) =>
            err ? rej(err) : res(contents))
    )

const writeFile = (filename, contents) =>
    new Task((rej, res) =>
        fs.writeFile(filename, contents, (err, success) =>
            err ? rej(err) : res(success))
    )

const app = () => // other option is to remove '() =>' here and in the call too, test it
    readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/4/g, '5'))
    .chain(contents => writeFile('config1.json', contents))

app().fork(err => console.log(err), success => console.log('success'))
