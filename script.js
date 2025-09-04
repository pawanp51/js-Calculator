let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.keyBtn');

let expression = '';
let answer = 0;
let num1, num2;

function disp(answer) {
    expression = answer.toString();
    display.textContent = expression;
}

function evaluate(expression) {
    const tokens = expression.match(/(\d+|\+|-|X|\/)/g);
    if (!tokens) {
        display.textContent = "Invalid expression";
        return;
    }

    const operatorStack = [];
    const valueStack = [];

    for (const token of tokens) {
        if (!isNaN(token)) {
            valueStack.push(parseFloat(token));
        } else if (token === '+' || token === '-') {
            while (operatorStack.length > 0 && (operatorStack[operatorStack.length - 1] === '+' || operatorStack[operatorStack.length - 1] === '-' || operatorStack[operatorStack.length - 1] === 'X' || operatorStack[operatorStack.length - 1] === '/')) {
                const operator = operatorStack.pop();
                const num2 = valueStack.pop();
                const num1 = valueStack.pop();
                if (operator === '+') {
                    valueStack.push(num1 + num2);
                } else if (operator === '-') {
                    valueStack.push(num1 - num2);
                }
            }
            operatorStack.push(token);
        } else if (token === 'X' || token === '/') {
            while (operatorStack.length > 0 && (operatorStack[operatorStack.length - 1] === 'X' || operatorStack[operatorStack.length - 1] === '/')) {
                const operator = operatorStack.pop();
                const num2 = valueStack.pop();
                const num1 = valueStack.pop();
                if (operator === 'X') {
                    valueStack.push(num1 * num2);
                } else if (operator === '/') {
                    if (num2 === 0) {
                        display.textContent = "Cannot divide by 0";
                        return;
                    }
                    valueStack.push(num1 / num2);
                }
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const num2 = valueStack.pop();
        const num1 = valueStack.pop();
        if (operator === '+') {
            valueStack.push(num1 + num2);
        } else if (operator === '-') {
            valueStack.push(num1 - num2);
        } else if (operator === 'X') {
            valueStack.push(num1 * num2);
        } else if (operator === '/') {
            if (num2 === 0) {
                display.textContent = "Cannot divide by 0";
                return;
            }
            valueStack.push(num1 / num2);
        }
    }

    if (valueStack.length === 1) {
        disp(valueStack[0]);
    } else {
        display.textContent = "Invalid expression";
    }
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if(e.target.innerHTML == 'Clear') {
            expression = '';
            display.textContent = expression;
        }
        else if(e.target.innerHTML == 'Delete') {
            expression = expression.slice(0, -1);
            display.textContent = expression;
        }
        else if(e.target.innerHTML == '=') {
            for(let i=0;i<expression.length;i++) {
                if(expression[i]=='-' || expression[i]=='+' || expression[i]=='X' || expression[i]=='/') {
                    num1 = parseInt(expression.slice(0, i));
                    num2 = parseInt(expression.slice(i, expression.length));
                    evaluate(expression);
                }
            }
        }
        else {
            expression += e.target.innerHTML;
            console.log(expression);
            display.textContent = expression;
        }
    })
})



