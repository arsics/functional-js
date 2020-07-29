const Sum = x =>
({
    x,
    concat: (o) => Sum(x + o.x)
});

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y) // destructuring added for readability
})

// semigroup that is ignoring the concated and just keeeping the first
const First = x =>
({
    x,
    concat: ({x: y}) => First(x)
})

// We have a person that wants to merge his accounts.
// this is how they regularly look like:
// const acct1 = { name: 'Niko', isPaid: true, points: 10, friends: ['Franklin'] };
// const acct2 = { name: 'Niko', isPaid: false, points: 2, friends: ['Gatsby'] };


// How semigroups (concat enabled accounts) would look like: 
const acct1 = { name: First('Niko'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] };
const acct2 = { name: First('Niko'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] };

const Acct = x =>
({
    x,
    concat: (o) => Acct({
        name: x.name.concat(o.x.name),
        isPaid: x.isPaid.concat(o.x.isPaid),
        points: x.points.concat(o.x.points),
        friends: x.friends.concat(o.x.friends)
    })
})

const acctRes = Acct(acct1).concat(Acct(acct2));
console.log(JSON.stringify(acctRes));
