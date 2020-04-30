class Calculator {
    constructor(CUDIS, PREDIS) {
        this.CUDIS = CUDIS;
        this.PREDIS = PREDIS;
        this.clear();
    }
    clear() {
        this.CUDIS = "";
        PREDIS.innerText = "";
        this.operation = undefined;
    }
    delete() {
        this.CUDIS = CUDIS.innerText.toString().slice(0,-1);
    }
    appendNumber(number) {
        if (number == "." && this.CUDIS.includes(".")) return
        this.CUDIS = this.CUDIS.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.CUDIS == '') return;
        if (this.PREDIS !== "") {
            this.compute();
        }
        this.operation = operation;
        this.PREDIS = this.CUDIS;
        this.CUDIS = '';
    }
    compute() {
        let computation;
        const preV = parseFloat(this.PREDIS);
        const cuV = parseFloat(this.CUDIS);
        if (isNaN(preV) || isNaN(cuV)) return
        switch (this.operation) {
            case '+':
                computation = preV + cuV;
                break;
            case '-':
                computation = preV - cuV;
                break;
            case '*':
                computation = preV * cuV;
                break;
            case '/':
                computation = preV / cuV;
                break;
            default:
                return;
        }
        this.CUDIS = computation;
        this.operation = undefined;
        PREDIS.innerText = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const intigerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];         
        let intigerDisplay;
        if(isNaN(intigerDigits)){
            intigerDisplay ='';
        }else{
            intigerDisplay = intigerDigits.toLocaleString('en', {maximumFractionDigits : 0})
        }   
        if(decimalDigits != null){
            
            return `${intigerDisplay}.${decimalDigits}`;
        }else{
            return intigerDisplay; 
        }
    }
    UpdateDisplay() {
        CUDIS.innerText = this.getDisplayNumber(this.CUDIS);
        if(this.operation != null){
            PREDIS.innerText = `${this.getDisplayNumber(this.PREDIS)} ${this.operation}`;
        }
        
    }

}

const OPS = document.querySelectorAll(".op");

const NBTN = document.querySelectorAll('[data-number]');
const DOT = document.getElementById("dot");
const EQ = document.getElementById("equal");
const AC = document.getElementById("cls");
const DEL = document.getElementById("del");

const CUDIS = document.querySelector(".cuOp");
const PREDIS = document.querySelector(".preOp");


const calculator = new Calculator(CUDIS, PREDIS);



NBTN.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.UpdateDisplay();

    })
});
DOT.addEventListener('click', () => {
    calculator.appendNumber(".");
    calculator.UpdateDisplay();
});

OPS.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.UpdateDisplay();
    });
}
);

EQ.addEventListener('click', button => {
    calculator.compute();
    calculator.UpdateDisplay();
});

AC.addEventListener('click',button => {
    calculator.clear();
    
    calculator.UpdateDisplay();
})
DEL.addEventListener('click',button => {
    calculator.delete();
    
    calculator.UpdateDisplay();
})