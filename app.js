//"use strict";
function add (a, b) {
    return a + b;
}

function subtract (a , b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b
}

console.log(add(5,6));
console.log(subtract(5,6));
console.log(multiply(5,6));
console.log(divide(5,6));

const buttons = document.querySelectorAll('#button');
console.log(buttons);
let string= '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
    string += button.innerHTML;
    console.log(string);
    })
});

const equal = document.getElementById('equal');
equal.addEventListener('click', () =>{
    console.log(equal.innerHTML);
})