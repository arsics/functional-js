
const nextCharForNumberString = str => {
    const trimmed = str.trim();
    const num = parseInt(trimmed);
    const nextNumber = num + 1;
    return String.fromCharCode(nextNumber);
}
console.log(`Imperative:  ${nextCharForNumberString('64')}`);
// ---
const fpNextCharForNumberString = str => String.fromCharCode(parseInt(str.trim()) + 1);
console.log(`Functional:  ${fpNextCharForNumberString('64')}`);
// ---
const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});
const fpBoxNextCharForNumberString = str => {
    return Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(n => n + 1)
    .map(n => String.fromCharCode(n))
    .fold(c => c)
}
console.log(`Funct boxed: ${fpBoxNextCharForNumberString('64')}`);
