(function(){chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
				if(request.type == "storedPasswords"){
						var passwords = localStorage["storedPasswords"];
						sendResponse({"passwords": passwords})
				}
				else if(request.type == "addCardNumber"){
						var cardNumberToStore = request.cardNumber;
						storeCardNumber(cardNumberToStore);
				}
										
		});


function retrieveStoredCreditCards(){

}

						function storeCardNumber(newCardNumber){
								if(newCardNumber != undefined){
										var currentCardsList = JSON.parse(localStorage["storedPasswords"]);
										currentCardsList.push(newCardNumber);
										localStorage["storedPasswords"] = JSON.stringify(currendCardsList);
								}
								
						}


					 })();