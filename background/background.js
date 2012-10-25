(function(){chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
				if(request.type == "storedPasswords"){
						var passwords = localStorage["storedPasswords"];
						sendResponse({"passwords": passwordsAsJSON}); //localStorage retrieves a string, so there is no need to stringify again
				}
										
		});


function retrieveStoredCreditCards(){

}
					 })();