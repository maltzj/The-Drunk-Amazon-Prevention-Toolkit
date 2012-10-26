(function(){
		main();
		

		function main(){
				appendDialogBox();
				$('input[type="text"]').blur(function(){
						var numbersToCheckAgainst = getSavedPasswords();
						if($.inArray($(this).val(), numbersToCheckAgainst) != -1){
								var expressionToSolve = generateExpression(13, 4);
								var valueOfExpression = eval(expressionToSolve);
						}
						else{
						//do nothing
						}
				});
		}


function generateExpression(highestOperand, numberOfOperands){
    var operands = ['+', '-', '/', '*'];
    var expression = '';
    for(var i = 0; i < numberOfOperands; i++){
	var nextNum = generateRandomInt(highestOperand + 1);
	if(generateRandomInt(2) == 1){
	    nextNum *= -1;
	}
	var operand = operands[generateRandomInt(operands.length)];
	expression = expression + "" + nextNum + " " + operand + " ";
    }
    var lastNum = generateRandomInt(highestOperand + 1);
    expression = expression + "" + lastNum;
    return expression;
}

function generateRandomInt(high){
    return Math.floor(Math.random() * high);
}

		function appendDialogBox(){
				$("body").append('<div id="drunk_amazon_dialog_box" role="dialog">' +
												 '<div id="drunk_amazon_expression"' +
												 '</div>' +
												 '<input type="text" id="drunk_amazon_answer_input" />' +
												 '</div>'
												);
		}


		function getSavedPasswords(){
				chrome.extension.sendMessage({"type" : "storedPasswords"}, 
																		 function(response){
																				 return response.passwords;});
		}

})();