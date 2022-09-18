// add prender y apagar, limpiar y %
"use strict";
let string= 0;
let on = false;
const showOperation = document.getElementById('showOperation');

turnOnOff();
getInput();
equalOperation();


function getInput (){
    const buttons = document.querySelectorAll('#button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (on) {
                if (string === 0){
                    string = '';
                }
                string += button.innerHTML;
                showOperation.textContent = string; 
            }
        })
    });
}


function equalOperation() {
    const equal = document.getElementById('equal');
    equal.addEventListener('click', () =>{
        if (on) {
            let [a, b, operations] = splitValues();
    
            if(operations === '+'){
                showOperation.textContent = add(a,b);
            } else if(operations === '-') {
                showOperation.textContent = subtract(a,b);
            } else if(operations === '*') {
                showOperation.textContent =multiply(a,b);
            } else {
                showOperation.textContent =divide(a,b);
            }
            string = 0;
        }
    })
}


function splitValues(){
    if (on) {
        let operations ='';
        for ( let i = 0; i < string.length; i++) {
            if ((string[i].codePointAt(0) < 48 || string[i].codePointAt(0) > 57) && string[i].codePointAt(0) !== 46) {
                operations = string[i];
            }
            // If user only provided one number operations = +
            if (operations === '') {
                operations = '+';
            }
        }
    
        // If user only provided one number b = +
        let [a , b = 0] = string.split(operations);
        string = '';
        return [Number(a), Number(b), operations]; 
    }
}

function turnOnOff(){
    const onButton = document.getElementById('onButton');
    onButton.addEventListener('click', () => {
        if (on === false) {
            console.log('hola')
            showOperation.textContent = 0; 
            on = true; 
        } else {
            console.log('chau')
            showOperation.textContent = '';
            on = false; 
        }
    })
}



function add (a, b) {
    console.log(`In add a = ${a} y b= ${b}`);
    return `ANS = ${a + b}`;
}

function subtract (a , b) {
    console.log(`In sub a = ${a} y b= ${b}`);
    return `ANS = ${a - b}`;
}

function multiply (a, b) {
    console.log(`In mul a = ${a} y b= ${b}`);
    return `ANS = ${a * b}`;
}

function divide(a, b) {
    console.log(`In div a = ${a} y b= ${b}`);
    return `ANS = ${a / b}`;
}





// function validate(){
//     let signAtStart = '';
//     if (string[0] === '-') {
//         signAtStart = string[0]
//     } else if (signAtStart === '*' || signAtStart === '/') {
//         return 'ERROR';
//     }
// }