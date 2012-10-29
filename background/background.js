(function(){chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
				if(request.type == "storedCards"){
						var passwords = localStorage["storedCards"];
						sendResponse({"cards": passwords});
				}
				else if(request.type == "addCardNumber"){
						var cardNumberToStore = request.cardNumber;
						var result = storeCardNumber(cardNumberToStore);
						if(result === true){
								sendResponse({'result': true});					
						}
						else{
								sendResponse({'result' : false,
															'error-message' : result});
						}
				}
				else if(request.type == "removeCardNumber"){
						var numberToRemove = request.cardNumber;
						var successfulRemove = removeCardNumber(numberToRemove);
						if(successfulRemove == true){
								sendResponse({'result': successfulRemove});
						}
				}
										
		});


						function removeCardNumber(cardNumberToRemove){
								var storedCards = JSON.parse(localStorage["storedCards"]);
								if(storedCards == undefined){
										return "Error, couldn't remove the car number";
								}
								for(var i = 0; i< storedCards.length; i++){
										if(storedCards[i] == cardNumberToRemove){
												storedCards.splice(i, 1);
												i--;
										}
								}
								localStorage["storedCards"] = JSON.stringify(storedCards);
							return true;
						}

						function storeCardNumber(newCardNumber){
								if(newCardNumber != undefined){
										
										var currentCardsList = localStorage["storedCards"];
										if(currentCardsList == undefined){ //check for no cards
												currentCardsList = [];
										}
										else{
												currentCardsList = JSON.parse(currentCardsList)
										}

										
										for(var i=0; i<currentCardsList.length; i++){
												if(currentCardsList[i] === newCardNumber){
												return "Card is already stored";
												}
										}

										currentCardsList.push(newCardNumber);
										localStorage["storedCards"] = JSON.stringify(currentCardsList);
										return true;
								}
								else{
										return "Please enter a vlid card number";
								}
								
						}


					 })();