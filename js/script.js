class Calculator{

	constructor(previousOperandTextElement,currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		//variable qui permet d'effacer le résultat du calcul
		this.readyToReset = false; 
		this.clear();
	}
	//supprimer tout
	clear(){
		// string previousOperand et currentOperand
		this.previousOperand = '';
		this.currentOperand = '';
		this.operation = undefined;
		this.readyToReset = false;
	}

	//supprimer un nombre
	delete(){
		/* extraire tous les caractères sauf le dernier.
		ce qui fait l'effet de suppression */
		this.currentOperand = this.currentOperand.slice(0,-1)
	}
	//saisir un nombre
	appendNumber(number){
		//Fin d'exécution de la fonction si l'utilisateur tente de saisir un second "."
		if (number === '.' && this.currentOperand.includes('.')) return;

		//effacer le résultat du calcule
		if (this.previousOperand === '' && this.readyToReset){
			this.currentOperand = '';
			this.readyToReset = false;
		};

		//insérer un nombre
		this.currentOperand = this.currentOperand + number.toString();
	}
	//choisir une opération
	chooseOperation(operation){

		if (this.currentOperand === '') return	

		if (this.previousOperand !== ''){
			this.compute();
		}

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}
	//calculer 
	compute(){
		
		//result est de type number
		let result;
		//convertir string en float
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		//si y a l'une des valeur saisi n'est pas un nombre
		if (isNaN(prev) || isNaN(current)) return

		switch(this.operation){
			case '+':
				result = prev + current;
				break;
			case '-':
				result = prev - current;
				break;
			case '/':
				result = prev / current;
				break;
			case '*':
				result = prev * current;
				break;
			default:
				return;
		}

		//convertir result en string 
		this.currentOperand = result.toString();
		this.previousOperand = '';
		this.operation = undefined;
		this.readyToReset = true;
	}

	//mettre à jour l'affichage
	updateDisplay(){
		this.currentOperandTextElement.innerText = this.currentOperand;
		if (this.operation != null){
			this.previousOperandTextElement.innerText = this.previousOperand + this.operation;
		}
		else{
			this.previousOperandTextElement.innerText = this.previousOperand;
		}

	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll('[data-operation]');
const allCleanButton = document.querySelector('[data-all-clean]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(function(button){
	button.addEventListener('click', function(){
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay()
	})
});

operationButtons.forEach(function(button){
	button.addEventListener('click', function(){
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay()
	})
});

equalsButton.addEventListener('click', function(){
	calculator.compute();
	calculator.updateDisplay();
});

allCleanButton.addEventListener('click', function(){
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', function(){
	calculator.delete();
	calculator.updateDisplay();
});