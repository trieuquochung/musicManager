// function elementClickHandler(e) {
//     // do whatever work
// }

// let elementMouseOverHandler = function(e) {
//     // do whatever work
// }

// function init(element) {
//     element.addEventListener("click", elementClickHandler);

//     element.addEventListener("mouseover", elementMouseOverHandler);
// }

// init(foo);
// init(bar);


function sumOne(a, b) {
    return a + b;
}

let sumTwo = function(a, b) {
    return a + b;
};

let sumThree = (a, b) => a + b;

console.log(sumOne(1, 2));
console.log(sumTwo(1, 3));
console.log(sumThree(1, 4));
