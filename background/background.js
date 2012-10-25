(function(){chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
				
				if(request.type == "storedPasswords"){
						var passwords = localStorage["storedPasswords"];
						var passwordsAsJSON = JSON.stringify(passwords);
						sendResponse({"passwords": passwordsAsJSON});
				}
										
		});


function retrieveStoredCreditCards(){

}
					 })();