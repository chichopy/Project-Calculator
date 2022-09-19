"use strict";
let string= '';
let previousAnswer = 0;
let on = false;
const showOperation = document.getElementById('showOperation');
const headerAns = document.getElementById('headerAns');

turnOnOff();
getInput();
equalOperation();
operate();
ans();
clear();
deleteNumber();


function turnOnOff() {
    const onButton = document.getElementById('onButton');
    onButton.addEventListener('click', () => {
        // The style below modifies action from the first line of else if, function operate.
        // Line repeats in multiple functions for same reason.
        showOperation.style['align-items'] = 'flex-end';
        if (on === false) {
            showOperation.textContent = 0; 
            headerAns.textContent = 'ANS = 0';
            on = true; 
        } else {
            string = '';
            showOperation.textContent = '';
            //previousAnswer = '';
            if (headerAns.hasChildNodes()){
                headerAns.removeChild(headerAns.firstChild);
            }
            on = false; 
        }
    })
}


function getInput () {
    const buttons = document.querySelectorAll('#button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (on) {
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
            let [a, b, operations, numberOfOperations] = splitValues();
            showOperation.style['align-items'] = 'flex-end';
            // If there are multiple periods in a or b Syntax Error
            if (a === 'SYNTAX ERROR') {
                showOperation.style['align-items'] = 'baseline';
                let p = document.createElement('p');
                p.textContent = 'SYNTAX ERROR'
                showOperation.removeChild(showOperation.firstChild);
                showOperation.appendChild(p);
                string = '';
                numberOfOperations = 0;
            }
            operate(a, b, operations, numberOfOperations);
        }
    })
}


function splitValues() {
    if (on) {
        // numberOfOperations allow calculator to operate only one operation at a time
        let numberOfOperations = 0;
        let operations = '';
        for ( let i = 0; i < string.length; i++) {
            if ((string[i].codePointAt(0) < 48 || string[i].codePointAt(0) > 57) && string[i].codePointAt(0) !== 46) {
                operations = string[i];
                numberOfOperations += 1;
            }
        }
        // If user only provided one number operations = +, so line 77 works
        if (operations === '') {
            operations = '+';
            numberOfOperations = 1;
        }

        let [a = 0 , b = 0] = string.split(operations);
        string = '';
        // validate there is only one period in either a, b and if there is a period, there must be a number too
        let periodA = 0;
        let numbersInA = 0;
        let periodB = 0;
        let numbersInB = 0;
        for (let i in a) {
            if ( a[i] === '.'){
                periodA += 1;
            } else {
                numbersInA += 1;
            }
        }
        for (let i in b) {
            if ( b[i] === '.'){
                periodB += 1;
            } else {
                numbersInB += 1;
            }
        }
        // Checks valid combinations: 123 + 456; 123.0 + 456; 123 + 456.0; 123.0 + 456.0
        if ((periodA < 1 && periodB < 1) || (periodA === 1 && numbersInA >= 1  && periodB < 1) || 
            (periodB === 1 && numbersInB >= 1  && periodA < 1) || (periodA === 1 && numbersInA >= 1 
            && periodB === 1 && numbersInB >= 1) ) {
            return [Number(a), Number(b), operations, numberOfOperations]; 
        } else {
            return ['SYNTAX ERROR', '', '', ''];
        }
    }
}


function operate(a, b, operations, numberOfOperations) {
    // Simple validation so as to check number of operants
    if (numberOfOperations === 1) {
        let result = 0;
        if(operations === '+'){
            result = add(a,b);
        } else if(operations === '-') {
            result = subtract(a,b);
        } else if(operations === '*') {
            result =multiply(a,b);
        } else {
            result =divide(a,b);
        }
        headerAns.textContent = result;
        showOperation.textContent = result;
        string = '';
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
        string = '';
        numberOfOperations = 0;
    }

    function add (a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a + b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) + (b * 10)) / 10);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function subtract (a , b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a - b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) - (b * 10)) / 10);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function multiply (a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b)){
            previousAnswer = (a * b).toString();
            return `ANS = ${previousAnswer}`;
        } else {
            previousAnswer = (((a * 10) * (b * 10)) / 10);
            return `ANS = ${previousAnswer}`;
        }
    }
    
    function divide(a, b) {
        if (parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) && b !== 0){
            previousAnswer = (a / b).toString();
            return `ANS = ${previousAnswer}`;
        } if (b ===0){
            return `SYNTAX ERROR`;
        } else {
            previousAnswer = (((a * 10) / (b * 10)) / 10);
            return `ANS = ${previousAnswer}`;
        }
    }
}


function ans() {
    const ansButton = document.getElementById('ans');
    ansButton.addEventListener('click', () => {
        string += previousAnswer;
        showOperation.style['align-items'] = 'flex-end';
        showOperation.textContent = string;
    })
}


function clear() {
    const clear = document.getElementById('clear');
    clear.addEventListener('click', () => {
        string = '';
        showOperation.textContent = 0;
        showOperation.style['align-items'] = 'flex-end';
    })
}


function deleteNumber() {
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', () => {
        if (string.length != 0 && string !== 0){
            string = string.slice(0, string.length-1);
        }
        showOperation.style['align-items'] = 'flex-end';
        if (string === '') {
            showOperation.textContent = 0;
        } else {
            showOperation.textContent = string;
        }
    })
}