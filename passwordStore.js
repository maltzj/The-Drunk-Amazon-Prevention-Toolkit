(function(){
		$("#next-password").on("click", ".btn", function(){
				alert("into this??");
				var newCardNumber = $("#next-card-number").val();
				chrome.extension.sendMessage({"type" : "addCardNumber",
																			"cardNumber": newCardNumber},
																		 function(response){
																				 if(response.result === true){
																						 $('#password-lists').append('<div class="stored-password">' + newCardNumber + '</div>');
																						 $('btn').val("");
																				 }
																				 else{
																						 //figure out what to do
																				 }
																		 });
		});
																		
		chrome.extension.sendMessage({"type" : "storedPasswords"},
																 function(response){
																		 var passwords = response.passwords;
																		 if(passwords != undefined){
																				 var passwordsArray = JSON.parse(passwords);
																				 for(var i = 0; i<passwordsArray.length; i++){									
																						
																						 $('#password-lists').append('<div class="stored-password">' + passwordsArray[i] + '</div>');
																				 }
																		 }
																		 $('#password-lists').append('<input type="text" id="next-card-number" /><button class="btn">Add</button>');
																		 
																 });
})();
 //send a message to the extension to get the list of all things
//display them somehow
