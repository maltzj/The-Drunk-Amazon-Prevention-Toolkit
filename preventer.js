(function(){
		main();
		
		function main(){
				appendDialogBox();
				$('input[type="text"]').blur(function(){
						checkIfCardIsStored($(this));
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
				$("body").append('<div id="drunk-amazon-dialog-box" class="drunk-amazon-modal" role="dialog">' +
												 '<div id="drunk-amazon-header">' +
												 '<p class="drunk-amazon-lead">Cool your jets buddy, prove you\'re sober enough to buy by solving this</p>' +
												 '</div>' +
												 '<hr />' +
												 '<span class="expression" id="drunk-amazon-expression">' +
												 '</span>' +
												 '<label class="drunk-amazon-label">Answer: </label><input type="text" id="drunk-amazon-answer-input" class="drunk-amazon-input" />' +
												 '<div class="drunk-amazon-modal-footer">' +
												 '<button id="drunk-amazon-answer-button" class="drunk-amazon-btn" style="clear: both;">Answer</button>' +
												 '</div>' +
												 '</div>'
												);
		}


		function checkIfCardIsStored(inputObject){
				chrome.extension.sendMessage({"type" : "storedCards"}, 
																		 function(response){
																				 if($.inArray(inputObject.val()+"", JSON.parse(response.cards)) != -1){
																						 var expressionToSolve = generateExpression(13, 4);
																						 var valueOfExpression = eval(expressionToSolve);
																						 while(isNaN(valueOfExpression) || valueOfExpression == Number.POSITIVE_INFINITY || valueOfExpression == Number.NEGATIVE_INFINITY){
																								 expressionToSolve = generateExpression(13, 4);
																								 valueOfExpression = eval(expressionToSolve);
																						 }	 
																						 $('#drunk-amazon-expression').text(expressionToSolve);
																						 valueOfExpression = Math.round(valueOfExpression);
																						 $('#drunk-amazon-answer-input').val('');
																						 $('#drunk-amazon-answer-button').unbind('click');
																						 $('#drunk-amazon-answer-button').click(function(){
																								 if(checkButtonEquality(valueOfExpression)){
																										 $('#drunk-amazon-dialog-box').modal('hide');
																								 }
																								 else{
																										 alert('Sorry, you\'re too drunk to be buying stuff from Amazon');
																										 inputObject.val("");
																										 $('#drunk-amazon-dialog-box').modal('hide');
																								}
																								 
																						 });
																						 $('#drunk-amazon-dialog-box').modal({show: true});
																						 
																				 }
																		 });
		}

		function checkButtonEquality(value){
				return value == $('#drunk-amazon-answer-input').val();
		}
																		

})();