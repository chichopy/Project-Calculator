"use strict";
let string= 0;
let previousAnswer = '0';
let numberOfOperations = 0;
let on = false;
const showOperation = document.getElementById('showOperation');

turnOnOff();
getInput();
equalOperation();
operate();
ans();
clear();
deleteNumber();


function turnOnOff() {
    const onButton = document.getElementById('onButton');
    showOperation.style['align-items'] = 'flex-end';
    onButton.addEventListener('click', () => {
        showOperation.style['align-items'] = 'flex-end';
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


function getInput () {
    const buttons = document.querySelectorAll('#button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (on) {
                if (string === 0){
                    string = '';
                }
                string += button.innerHTML;
                showOperation.style['align-items'] = 'flex-end';
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
            showOperation.style['align-items'] = 'flex-end';
            operate(a, b, operations);
        }
    })
}


function splitValues() {
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


function operate(a, b, operations) {
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
        showOperation.style['align-items'] = 'baseline';
        let p = document.createElement('p');
        let p0 = document.createElement('p');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p.textContent = 'SYNTAX ERROR  a + b +....='
        p0.textContent = 'Solve only one operation at a time.'
        p1.textContent = 'For example a + b =.';
        p2.textContent = 'For multiple operations use ANS';
        showOperation.removeChild(showOperation.firstChild);
        showOperation.appendChild(p);
        showOperation.appendChild(p0);
        showOperation.appendChild(p1);
        showOperation.appendChild(p2);
        string = 0;
        numberOfOperations = 0;
    }

    function add (a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a + b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) + (b * 10)) / 10).toFixed(3);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function subtract (a , b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a - b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) - (b * 10)) / 10).toFixed(3);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function multiply (a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a * b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) * (b * 10)) / 10).toFixed(3);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function divide(a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) && b !== 0){
            previousAnswer = (a / b).toFixed(3).toString();
            return `ANS = ${previousAnswer}`;
        } if (b ===0){
            return `SYNTAX ERROR`;
        } else {
            previousAnswer = (((a * 10) / (b * 10)) / 10).toFixed(3);
            return `ANS = ${previousAnswer}`;
        }
    }
}


function ans() {
    const ansButton = document.getElementById('ans');
    ansButton.addEventListener('click', () => {
        string = previousAnswer;
        showOperation.style['align-items'] = 'flex-end';
        showOperation.textContent = string;
    })
}


function clear() {
    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
        string = 0;
        showOperation.style['align-items'] = 'flex-end';
        showOperation.textContent = string;
    })
}


function deleteNumber() {
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', () => {
        if (string.length != 0 && string !== 0){
            string = string.slice(0, string.length-1);
        }
        showOperation.style['align-items'] = 'flex-end';
        showOperation.textContent = string;
    })
}