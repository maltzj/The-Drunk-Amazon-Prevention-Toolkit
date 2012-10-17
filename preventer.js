javascript:(function(){
		if(typeof jQuery == "undefined"){
				loadjQuery("https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", main);
		}
		else{
				main();
		}
		
		function loadjQuery(jQueryLocation, callback){
				var scriptTag = document.createElement("script");
				scriptTag.src = jQueryLocation;
				scriptTag.type = "text/javascript";
				document.getElementsByTagName("head")[0].appendChild(scriptTag);

				var checkReady = function(callbackOnceLoaded){
						if(typeof jQuery == "undefined"){
								window.setTimeout(function(){ checkReady(callbackOnceLoaded); }, 100);
						}
						else{
								callbackOnceLoaded();
						}
				};

				checkReady(callback);
		}
		
		function main(){
				$('input[type="text"]').blur(function(){
						var expressionToSolve = generateExpression(13, 4);
						var valueOfExpression = eval(expressionToSolve);
						alert(expressionToSolve);
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
})();