(function(){
		main();
		
		function main(){
				appendDialogBox();
				$('input[type="text"]').blur(function(){
						checkIfCardIsStored($(this));
				});
		}

/*Generates an expression with a given number of operands and a limit on the highest operand
The highest operand opts as an absolute value for each operand, so saying generateExpression(3, 1) allows for numbers between 3 and -3
Note, this doesn't verify any expressions for div by zero or anything like that*/
function generateExpression(highestOperand, numberOfOperands){
    var operands = ['+', '-', '/', '*'];
    var expression = '';
		while(true){//generate expressions forever until we get a valid one
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
				var valueOfExpression = eval(expression);
				if(isNaN(valueOfExpression) || valueOfExpression == Number.POSITIVE_INFINITY || valueOfExpression == Number.NEGATIVE_INFINITY){//check that it is valid		
						return expression;
				}
		}
}

/*A quick little wrapper which generates a random number up to a given value*/
function generateRandomInt(high){
    return Math.floor(Math.random() * high);
}
/*Appends the dialog box which we will use to test the user's drunkeness to the DOM*/
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

		/*Checks if a value is a stored card, if yes, it creates a dialog box to challenge the user with maths*/
		function checkIfCardIsStored(inputObject){
				chrome.extension.sendMessage({"type" : "storedCards"}, 
																		 function(response){
																				 if($.inArray(inputObject.val()+"", JSON.parse(response.cards)) != -1){//if the value input is in the list of credit cards challenge the user
																						 var expressionToSolve = generateExpression(13, 4);
																						 var valueOfExpression = eval(expressionToSolve);
																						 
																						 $('#drunk-amazon-expression').text(expressionToSolve);
																						 valueOfExpression = Math.round(valueOfExpression);
																						 $('#drunk-amazon-answer-input').val('');
																						 $('#drunk-amazon-answer-button').unbind('click');
																						 $('#drunk-amazon-answer-button').click(function(){
																								 if(checkButtonEquality(valueOfExpression)){
																										 $('#drunk-amazon-dialog-box').modal('hide');
																								 }
																								 else{
																										 alert('Sorry, you\'re too drunk to be buying stuff, try again when you are more sober');
																										 inputObject.val("");
																										 $('#drunk-amazon-dialog-box').modal('hide');
																								}
																								 
																						 });
																						 $('#drunk-amazon-dialog-box').modal({show: true});
																						 
																				 }
																		 });
		}
		
		/*Checks that the value the user input is the same as what it should be equal to*/
		function checkButtonEquality(value){
				return value == $('#drunk-amazon-answer-input').val();
		}
																		

})();