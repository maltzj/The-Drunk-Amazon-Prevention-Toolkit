(function(){
		$("#next-card").on("click", "button", function(event){
				var newCardNumber = $("#next-card-number").val();
				if(!(/^\d+$/.test(newCardNumber))){
						alert('please enter a valid card number, thanks :)');
						return;
				}
				chrome.extension.sendMessage({"type" : "addCardNumber",
																			"cardNumber": newCardNumber},
																		 function(response){
																				 if(response.result === true){
																						 $('#card-list').append('<div class="stored-card">'+
																																		'<span class="card-number">' +
																																		newCardNumber + 
																																		'</span>' +
																																		'<button class="remove-card-button drunk-amazon-pull-right drunk-amazon-btn drunk-amazon-btn-danger">' +
																																		'Remove' +
																																		
																																		'</div>');
																						 $('#next-card-number').val("");
																				 }
																				 else{
																						 alert(response['error-message']);
																				 }
																		 });
		});

		$('#card-list').on('click', '.remove-card-button', function(event){
				var card = $(this).parent().find('.card-number');
				chrome.extension.sendMessage({'type': 'removeCardNumber',
																			'cardNumber' : card.text()},
																		 function(response){
																				 if(response.result === true){
																						 card.parent().remove();
																				 }
																				 else{
																						 //do nothing for now
																				 }
																		 });
		});
				
																		
		chrome.extension.sendMessage({"type" : "storedCards"},
																 function(response){
																		 
																		 var cards = response.cards;
																		 if(cards != undefined){
																				 var cardNumsAsArray = JSON.parse(cards);
																				 for(var i = 0; i<cardNumsAsArray.length; i++){									
																						
																						 $('#card-list').append('<div class="stored-card">' +
																																				 '<span class="card-number">' +
																																				 cardNumsAsArray[i] + 
																																				 '</span>' +
																																				 '<button class="remove-card-button drunk-amazon-pull-right drunk-amazon-btn drunk-amazon-btn-danger">' +
																																				 'Remove' +
																																				 '</div>');
																				 }
																		 }
																		 $('#next-card').append('<span><input type="text" id="next-card-number" /><button class="drunk-amazon-btn-success drunk-amazon-btn" id="add-card-button">Add</button></span>');
																 });
})();
 //send a message to the extension to get the list of all things
//display them somehow
