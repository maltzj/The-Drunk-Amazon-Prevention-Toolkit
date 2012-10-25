(function(){
		main();
		
		var numbersToCheckAgainst = getSavedPasswords();

		function main(){
				//appendStyleSheets();
				appendDialogBox();
				$('input[type="text"]').blur(function(){
						alert("numbersToCheckAgainst is " + numbersToCheckAgainst[0] + " and " + numbersCheckingAgainst[1]);
						if($.inArray($(this).val(), numbersToCheckAgainst) != -1){
								alert(numbersToCheckAgainst);
								var expressionToSolve = generateExpression(13, 4);
								var valueOfExpression = eval(expressionToSolve);
								alert(expressionToSolve);
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

		function appendStyleSheets(){
				var linkTag = document.createElement("link");
				linkTag.href="drunk-amazon-style.css";
				linkTag.rel="stylesheet";
				linkTag.type="text/css";
				document.getElementsByTagName("head")[0].appendChild(linkTag);
		}

		function getSavedPasswords(){
				chrome.extension.sendMessage({"type" : "storedPasswords"}, 
																		 function(response){
																				 alert("response is " + response.passwords);
																				 return response.passwords;});
		}

})();