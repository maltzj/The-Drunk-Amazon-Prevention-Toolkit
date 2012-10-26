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
				$("body").append('<div id="drunk_amazon_dialog_box" class="modal" role="dialog">' +
												 '<div id="drunk_amazon_header">' +
												 '<p class="lead">Hold on there buddy, please solve this to continue</p>' +
												 '</div>' +
												 '<hr />' +
												 '<span style="font-weight: bold">Expression: </span>' + 
												 '<span class=".expression" id="drunk_amazon_expression">' +
												 '</span>' +
												 '<label>Answer: </label><input type="text" id="drunk_amazon_answer_input" />' +
												 '<div class="modal-footer">' +
												 '<button id="drunk_amazon_answer_button" class="drunk_amazon_btn" style="clear: both;">Answer</button>' +
												 '</div>' +
												 '</div>'
												);
		}


		function checkIfCardIsStored(inputObject){
				chrome.extension.sendMessage({"type" : "storedPasswords"}, 
																		 function(response){
																				 if($.inArray(inputObject.val()+"", JSON.parse(response.passwords)) != -1){
																						 var expressionToSolve = generateExpression(13, 4);
																						 var valueOfExpression = eval(expressionToSolve);
																						 while(isNaN(valueOfExpression) || valueOfExpression == Number.POSITIVE_INFINITY || valueOfExpression == Number.NEGATIVE_INFINITY){
																								 expressionToSolve = generateExpression(13, 4);
																								 valueOfExpression = eval(expressionToSolve);
																						 }	 
																						 $('#drunk_amazon_expression').text(expressionToSolve);
																						 valueOfExpression = Math.round(valueOfExpression);
																						 $('#drunk_amazon_answer_input').val('');
																						 $('#drunk_amazon_answer_button').unbind('click');
																						 $('#drunk_amazon_answer_button').click(function(){
																								 if(checkButtonEquality(valueOfExpression)){
																										 $('#drunk_amazon_dialog_box').modal('hide');
																								 }
																								 else{
																										 alert('Sorry, you\'re too drunk to be buying stuff from Amazon');
																										 inputObject.val("");
																										 $('#drunk_amazon_dialog_box').modal('hide');
																								}
																								 
																						 });
																						 $('#drunk_amazon_dialog_box').modal({show: true});
																						 
																				 }
																		 });
		}

		function checkButtonEquality(value){
				return value == $('#drunk_amazon_answer_input').val();
		}
																		

})();