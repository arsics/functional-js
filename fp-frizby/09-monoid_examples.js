const Sum = x =>
({
    x,
    concat: ({x: y}) => Sum(x + y)
});
Sum.empty = () => Sum(0);

const Product = x =>
({
    x,
    concat: ({x: y}) => Product(x * y)
});
Product.empty = () => Product(1);

const Any = x =>
({
    x,
    concat: ({x: y}) => Any(x || y)
});
Any.empty = () => Any(false);

const All = x =>
({
    x,
    concat: ({x: y}) => Product(x && y)
});
All.empty = () => All(true);

const Max = x =>
({
    x,
    concat: ({x: y}) => Max(x > y ? x : y)
});
Max.empty = () => Max(-Infinity);

const Min = x =>
({
    x,
    concat: ({x: y}) => Max(x < y ? x : y)
});
Min.empty = () => Min(Infinity);

const Pair = (x, y) =>
({
    x,
    y,
    concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1))
});
Pair.empty = () => Pair(Infinity);
