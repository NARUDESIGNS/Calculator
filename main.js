//store necessary DOM elements in variables 
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
let result = document.getElementById("result");
let input = document.getElementById("input");

// this controls the iputs that will be dsplayed in the calculator
function printInput(num){
    input.innerText += num;
    //if input value doesn't start with number or starts with 0, remove the input value 
    if (input.innerText.startsWith('0')){
        input.innerText = input.innerText.replace('0', '');
    } 
    if (input.innerText.startsWith('*')){
        input.innerText = input.innerText.replace('*', '0*');
    }
    if (input.innerText.startsWith('+')){
        input.innerText = input.innerText.replace('+', '0+');
    }
    if (input.innerText.startsWith('÷')){
        input.innerText = input.innerText.replace('+', '0÷');
    }
    if (input.innerText.startsWith('^')){
        input.innerText = input.innerText.replace('^', '0^');
    }
    //if the input begins with a period, replace it with '0.'
    if (input.innerText.startsWith('.')){
        input.innerText = input.innerText.replace('.', '0.');
        //replaceLast('', '^', input.innerText);
    }

    //if the no input in the input board is more than 20 characters, evaluate the input
    if (input.innerText.length > 20){
        input.innerText = eval(input.innerText);
    }
}

//this controls the output that will be displayed in the calculator
function printResult(){
    let replaced = input.innerText;
    //replace the double star in pow with ^ and the divide symbol with /
    replaced = input.innerText.replace('^', '**').replace(/÷/g, '/');
    result.innerText = (eval(replaced)).toLocaleString('en');
}

//replace the last occurence of a string with nothing to avoid having an outputting an operator twice consecutively
function replaceLast(newVal, oldVal, strVar){
    let lastIndex = strVar.lastIndexOf(oldVal);
    strVar = strVar.split('');
    strVar[lastIndex] = newVal;
    strVar = strVar.join('');//console.log(strVar);
    input.innerText = strVar;
}

//listen 4 clicked numbers
for (i = 0; i < numbers.length; i++){
    let number = numbers[i];
        number.addEventListener("click", () => {
            printInput(number.innerText);
            printResult();
    })
}

//listen 4 clicked operators
for (i = 0; i < operators.length; i++){
    let operator = operators[i];
    operator.addEventListener("click", () => {
            
        switch(operator.innerText){
//4 all operators, do not allow 2 consecutive operators e.g ^+ or ÷* or **
            case '.':
            input.innerText += '.';
            let lastIndexOfDot = input.innerText.lastIndexOf('.'); 
            if (input.innerText[lastIndexOfDot - 1] == '*' 
                || input.innerText[lastIndexOfDot - 1] == '.'
                || input.innerText[lastIndexOfDot - 1] == '÷' 
                || input.innerText[lastIndexOfDot - 1] == '+' 
                || input.innerText[lastIndexOfDot - 1] == '^'  ){
                replaceLast('', '.', input.innerText); 
                
            }
            console.log('true');
                break;

            case "cls": 
            result.innerText = '';
            input.innerText = '0';
                break;

            case "pow":
            input.innerText += '^';
            let lastIndexOfPow = input.innerText.lastIndexOf('^'); 
            if (input.innerText[lastIndexOfPow - 1] == '*' 
                || input.innerText[lastIndexOfPow - 1] == '÷' 
                || input.innerText[lastIndexOfPow - 1] == '+' 
                || input.innerText[lastIndexOfPow - 1] == '^' 
                || input.innerText[lastIndexOfPow - 1] == '.' ){
                replaceLast('', '^', input.innerText); 
            }
                break;
                
            case "%":
            input.innerText += '%';
                break;
                
            case "del":
            input.innerText = (input.innerText).substr(0, input.innerText.length - 1);
            if (input.innerText == '') input.innerText = '0';
                printResult();
                break;
                
            case "÷":
            input.innerText += '÷';
            let lastIndexOfDiv = input.innerText.lastIndexOf('÷'); 
            if (input.innerText[lastIndexOfDiv - 1] == '÷' 
                || input.innerText[lastIndexOfDiv - 1] == '*' 
                || input.innerText[lastIndexOfDiv - 1] == '+' 
                || input.innerText[lastIndexOfDiv - 1] == '^' 
                || input.innerText[lastIndexOfDiv - 1] == '.' ){
                replaceLast('', '÷', input.innerText);
            }            
                break;

            case "*":
            input.innerText += '*'; 
            let lastIndexOfMul = input.innerText.lastIndexOf('*'); 
            if (input.innerText[lastIndexOfMul - 1] == '*' 
                || input.innerText[lastIndexOfMul - 1] == '÷' 
                || input.innerText[lastIndexOfMul - 1] == '+' 
                || input.innerText[lastIndexOfMul - 1] == '^' 
                || input.innerText[lastIndexOfMul - 1] == '.' ){
                replaceLast('', '*', input.innerText); 
            }
                break;

            case "+":
            input.innerText += '+';
            let lastIndexOfAdd = input.innerText.lastIndexOf('+'); 
            if (input.innerText[lastIndexOfAdd - 1] == '+' 
            || input.innerText[lastIndexOfAdd - 1] == '*' 
            || input.innerText[lastIndexOfAdd - 1] == '÷' 
            || input.innerText[lastIndexOfAdd - 1] == '^' 
            || input.innerText[lastIndexOfAdd - 1] == '.' ){
                replaceLast('', '+', input.innerText);
            }
                break;
                
            case "-":
            input.innerText += '-';
            let lastIndexOfMin = input.innerText.lastIndexOf('-'); 
            if (input.innerText[lastIndexOfMin - 1] == '-'){
                replaceLast('', '-', input.innerText);
            }
                break;
                
            case "=":
            if (result.innerText == ''){
                input.innerText = '0';
            }
            else {
                input.innerText = result.innerText.replace(/,/g, '');
                result.innerText = '';
            }
            
                break;
        }
    })
}
