(function(){chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse){
				if(request.type == "storedPasswords"){
						var passwords = Array();
						passwords[0] = "1234";
						var passwordsAsJSON = JSON.stringify(passwords);
						sendResponse({"passwords": passwordsAsJSON});
				}
										
		});


function retrieveStoredCreditCards(){

}
					 })();