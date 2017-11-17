function sum(a, b) {
    let result;

    if (a < 0) {
        let  temp = a * -1;
        result = temp + b;
    } else {
        result = a + b;
    }

    return result;
}

console.log(sum(1, 3));
console.log(sum(-1, 2));
