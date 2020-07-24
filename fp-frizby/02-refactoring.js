const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});

// non-functional
const moneyToFloat = str =>
    parseFloat(str.replace(/\$/g, '')); 

const percentToFloat = str =>
    parseFloat(str.replace(/\%/g, '')) * 0.01; 

const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
}

console.log(applyDiscount('5$', '20%'));

// functional

const fpMoneyToFloat = str =>
    Box(str)
    .map(str => str.replace(/\$/g, ''))
    .map(parseFloat) // we dont use fold since we want to return a Box-ed result

const fpPercentToFloat = str =>
    Box(str.replace(/\%/g, ''))
    .map(str => parseFloat(str) * 0.01)


const fpApplyDiscount = (price, discount) =>
    fpMoneyToFloat(price)
    .fold(cost =>
        fpPercentToFloat(discount)
        .fold(savings => cost - cost * savings)
    );
    
console.log(fpApplyDiscount('5$', '20%'));
