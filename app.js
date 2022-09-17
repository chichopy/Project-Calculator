// add prender y apagar, limpiar y %
"use strict";
function add (a, b) {
    console.log(`In add a = ${a} y b= ${b}`);
    return a + b;
}

function subtract (a , b) {
    console.log(`In sub a = ${a} y b= ${b}`);
    return a - b;
}

function multiply (a, b) {
    console.log(`In mul a = ${a} y b= ${b}`);
    return a * b;
}

function divide(a, b) {
    console.log(`In div a = ${a} y b= ${b}`);
    return a / b
}

const buttons = document.querySelectorAll('#button');
let string= '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
    string += button.innerHTML;
    })
});

const equal = document.getElementById('equal');
equal.addEventListener('click', () =>{
    let [a, b, operations] = splitValues();

    if(operations === '+'){
        console.log(add(a,b));
    } else if(operations === '-') {
        console.log(subtract(a,b));
    } else if(operations === '*') {
        console.log(multiply(a,b));
    } else {
        console.log(divide(a,b));
    }
})

function splitValues(){
    let operations ='';
    //validate input
    // let signAtStart = '';
    // if (string[0] === '-') {
    //     signAtStart = string[0]
    // } else if (signAtStart === '*' || signAtStart === '/') {
    //     return 'ERROR';
    // }

    for ( let i = 0; i < string.length; i++) {
        if ((string[i].codePointAt(0) < 48 || string[i].codePointAt(0) > 57) && string[i].codePointAt(0) !== 46) {
            operations = string[i];
        }
    }

    let [a , b] = string.split(operations);
    string = '';
    return [Number(a), Number(b), operations];
}