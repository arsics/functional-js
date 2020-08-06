const addRegular = (x, y) => x + y
const incRegular = y => addRegular(1, y)
const res = incRegular(2)
console.log(res)

// there is a better way to preload a function with a value
const add = x => y => x + y
const inc = add(1)
const res1 = inc(2)
console.log(res1)

// const modulo = (dvr, dvd) => dvr % dvd
// const isOdd = div => modulo(2, dvd)

const modulo = dvr => dvd => dvd % dvr
const isOdd = modulo(2)
console.log(isOdd(3))

const filter = pred => xs => xs.filter(pred)
const getAllOdds = filter(isOdd)
console.log(getAllOdds([1,2,3,4,5]))

const replace = regex => repl => str => str.replace(regex, repl)
const censor = replace(/[aeiou]/ig)('*') // params are prepared, the data we want to transform comes last
console.log(censor('Hello there! General Kenobi.'))

const map = f => xs => xs.map(f)
const censorAll = map(censor)
console.log(censorAll(['Hello there', 'General Kenobi.']))
