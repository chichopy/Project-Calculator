// add prender y apagar, limpiar y %
"use strict";
let string= 0;
let previousAnswer = '0';
let on = false;
const showOperation = document.getElementById('showOperation');

turnOnOff();
getInput();
equalOperation();
clear();
deleteNumber();
ans();


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
            //console.log('hola')
            showOperation.textContent = 0; 
            on = true; 
        } else {
            //console.log('chau')
            string = '';
            showOperation.textContent = '';
            on = false; 
        }
    })
}

function clear(){
    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
        string = 0;
        showOperation.textContent = string;
    })
}

function deleteNumber(){
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', () => {
        if (string.length != 0 && string !== 0){
            //console.log(string);
            string = string.slice(0, string.length-1);
        }
        showOperation.textContent = string;
    })
}

function ans(){
    const ansButton = document.getElementById('ans');
    ansButton.addEventListener('click', () => {
        string = previousAnswer;
        showOperation.textContent = string;
    })
}
































function add (a, b) {
    //console.log(`In add a = ${a} y b= ${b}`);
    previousAnswer = (a + b).toString();
    //console.log(previousAnswer);
    return `ANS = ${a + b}`;
}

function subtract (a , b) {
    //console.log(`In sub a = ${a} y b= ${b}`);
    previousAnswer = (a - b).toString();
    return `ANS = ${a - b}`;
}

function multiply (a, b) {
    //console.log(`In mul a = ${a} y b= ${b}`);
    previousAnswer = (a * b).toString();
    return `ANS = ${a * b}`;
}

function divide(a, b) {
    //console.log(`In div a = ${a} y b= ${b}`);
    previousAnswer = (a / b).toString();
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