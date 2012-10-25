(function(){
		chrome.extension.getBackgroundPage();
		chrome.extension.sendMessage({"type" : "storedPasswords"},
																 function(response){
																		 var passwords = response.passwords;
																		 if(passwords != undefined){
																				 var passwordsArray = JSON.parse(passwords);
																				 for(var i = 0; i<passwordsArray.length; i++){									
																						 $('#password-lists').append('<div class="stored-password">' + passwordsArray[i] + '</div>');
																				 }
																		 }
																		 
																 });
})();
 //send a message to the extension to get the list of all things
//display them somehow
