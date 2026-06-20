window.addEventListener('load', function () {
    const videoContainer = document.getElementById('loader-video-container');
    const video = document.getElementById('loader-video');


    function hideLoader() {
        videoContainer.style.opacity = '0';
        setTimeout(() => {
            videoContainer.style.display = 'none';
        }, 500);
    }


    if (video.ended) {
        hideLoader();
    } else {
        video.addEventListener('ended', hideLoader);
    }
});

const btnclear = document.getElementById('btnclear');
const soundclear = document.getElementById('soundclear');
const btnac = document.getElementById('btnac');
const btnr = document.getElementById('btnr');
const soundbtnr = document.getElementById('soundbtnr');
const btndot = document.getElementById('btndot');
const sounddot = document.getElementById('sounddot');
const btn1 = document.querySelectorAll('.btn1');
const soundbtn = document.getElementById('soundbtn');
const btn2 = document.querySelectorAll('.btn2');

btnclear.addEventListener('click', function () {
    soundclear.play();
});
btnac.addEventListener('click', () => {
    soundclear.play();
});
btnr.addEventListener('click', function () {
    soundbtnr.play();
});
btndot.addEventListener('click', function () {
    sounddot.play();
});
btn1.forEach(btn => {
    btn.addEventListener('click', function () {
        soundbtn.play();
    });
});
btn2.forEach(btn => {
    btn.addEventListener('click', function () {
        sounddot.play();
    });
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let firstOperand = null;
let operator = null;
let isResultDisplayed = false;
const message = 'ПОШЕЛ НАХУЙ';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (display.value === message && value !== 'C') {
            return;
        }


        if (!isNaN(value) || value === '.') {
            if (isResultDisplayed) {
                currentInput = '';
                display.value = '';
                isResultDisplayed = false;
            }


            if (value === '0') {

                if (currentInput === '0') return;

                if (currentInput === '-0') return;
            }


            if (value === '.') {
                if (currentInput.includes('.')) return;


                if (currentInput === '' || currentInput === '-') {
                    currentInput += '0.';
                    display.value += '0.';
                    return;
                }
            }


            if (value !== '0' && value !== '.') {
                if (currentInput === '0') {
                    currentInput = value;
                    display.value = display.value.slice(0, -1) + value;
                    return;
                }
                if (currentInput === '-0') {
                    currentInput = '-' + value;
                    display.value = display.value.slice(0, -1) + value;
                    return;
                }
            }


            currentInput += value;
            display.value += value;
        }


        else if (['+', '-', '×', '÷', '%'].includes(value)) {


            if (value === '-' && currentInput === '' && firstOperand === null) {
                currentInput = '-';
                display.value = '-';
                return;
            }


            if (value === '-' && operator !== null && currentInput === '') {
                currentInput = '-';
                display.value += '-';
                return;
            }


            if (currentInput === '' && firstOperand !== null && operator !== null) {
                operator = value;
                display.value = display.value.slice(0, -1) + value;
                return;
            }


            if (currentInput !== '' && currentInput !== '-') {
                const num = parseFloat(currentInput);

                if (firstOperand === null) {
                    firstOperand = num;
                } else if (operator) {
                    firstOperand = computeResult(firstOperand, operator, num);
                }

                display.value = typeof firstOperand === 'number' ? firstOperand + value : firstOperand;
                operator = value;
                currentInput = '';
                isResultDisplayed = false;
            }
        }



        else if (value === '=') {
            if (operator && currentInput !== '' && currentInput !== '-') {
                const num = parseFloat(currentInput);
                const result = computeResult(firstOperand, operator, num);

                display.value = result;


                firstOperand = typeof result === 'number' ? result : null;
                currentInput = typeof result === 'number' ? result.toString() : '';
                operator = null;
                isResultDisplayed = true;
            }
        }

        else if (value === 'C') {
            display.value = '';
            currentInput = '';
            firstOperand = null;
            operator = null;
            isResultDisplayed = false;
        }


        else if (value === 'backspace') {

            if (display.value === '') return;


            const lastChar = display.value.slice(-1);


            display.value = display.value.slice(0, -1);


            if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
                operator = null;
                currentInput = firstOperand.toString();
                firstOperand = null;
            }

            else {
                currentInput = currentInput.slice(0, -1);


                if (currentInput === '' && operator !== null) {

                }

                else if (operator === null && firstOperand !== null) {
                    firstOperand = parseFloat(currentInput) || null;
                }
            }
        }

    });
});

function computeResult(firstOperand, operator, num) {

    if (firstOperand === message || typeof firstOperand !== 'number') {
        return message;
    }

    switch (operator) {
        case '+': return firstOperand + num;
        case '-': return firstOperand - num;
        case '×': return firstOperand * num;
        case '÷':

            return num === 0 ? message : firstOperand / num;
        case '%': return (firstOperand * num) / 100;
        default: return num;
    }
}


