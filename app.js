"use strict";
let string= 0;
let previousAnswer = '0';
let numberOfOperations = 0;
let on = false;
const showOperation = document.getElementById('showOperation');

turnOnOff();
getInput();
equalOperation();
clear();
deleteNumber();
ans();
operate();


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
            operate(a, b, operations);
        }
    })
}

function splitValues(){
    if (on) {
        let operations ='';
        for ( let i = 0; i < string.length; i++) {
            if ((string[i].codePointAt(0) < 48 || string[i].codePointAt(0) > 57) && string[i].codePointAt(0) !== 46) {
                operations = string[i];
                numberOfOperations += 1;
            }
        }
        // If user only provided one number operations = +
        if (operations === '') {
            operations = '+';
            numberOfOperations = 1;
        }
        if (string === 0){
            string = '';
        }

        let [a = 0 , b = 0] = string.split(operations);
        string = '';
        return [Number(a), Number(b), operations]; 
    }
}

function turnOnOff(){
    const onButton = document.getElementById('onButton');
    onButton.addEventListener('click', () => {
        if (on === false) {
            showOperation.textContent = 0; 
            on = true; 
        } else {
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







function operate(a, b, operations){

    if (numberOfOperations === 1){
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
        numberOfOperations = 0;
    } else if (numberOfOperations > 1) {
        showOperation.textContent = 'Solve only one operation at a time.\nFor example a + b. NOT a + b +c';
        string = 0;
        numberOfOperations = 0;
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
}