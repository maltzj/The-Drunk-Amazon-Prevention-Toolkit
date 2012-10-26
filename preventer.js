(function(){
		main();
		

		function main(){
				appendDialogBox();
				$('input[type="text"]').blur(function(){
						checkIfCardIsStored($(this).val());
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
				$("body").append('<div id="drunk_amazon_dialog_box" class="modal" role="dialog">' +
												 '<div id="drunk_amazon_expression">' +
												 '</div>' +
												 '<input type="text" id="drunk_amazon_answer_input" />' +
												 '<button class="btn" style="clear: both;">Answer</button>' +
												 '<br />' +
												 '</div>'
												);
		}


		function checkIfCardIsStored(cardNumber){
				chrome.extension.sendMessage({"type" : "storedPasswords"}, 
																		 function(response){
																				 if($.inArray(cardNumber+"", JSON.parse(response.passwords)) != -1){
																							var expressionToSolve = generateExpression(13, 4);
																							$('#drunk_amazon_expression').text(expressionToSolve);
																							var valueOfExpression = eval(expressionToSolve);
																							$('#drunk_amazon_dialog_box').modal({show: true});
																					}
																		 });
		}

})();