$('input[type="text"]').blur(function(){
    alert('this does what I want it to');
});


function generateExpression(highestOperand, numberOfOperands){
    var operands = ['+', '-', '/', '*'];
    var expression = '';
    for(var i = 0; i < numberOfOperands - 1; i++)
    {
	var nextNum = generateRandomInt(highestOperand + 1);
	if(generateRandomNumber(2) == 1){
	    nextNum *= -1;
	}
	var operand = generateRandomInt(operands.length);
	expression = expression + "" + nextNum + " " + operand + " ";
    }
    var lastNum = generateRandomInt(highestOperand + 1);
    expression = expression + "" + lastNum;
    return expression;
}

function generateRandomInt(int high){
    return Math.floor(Math.random() * high);
}