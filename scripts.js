(function(){
	var formElementsStored = {};
	formElementsStored.application = document.getElementById("application");
	formElementsStored.formToggle = document.getElementById("event-application");
	formElementsStored.footerFormToggle = document.getElementById("event-application-footer");
	formElementsStored.submitApplication = document.getElementById("application-submitted");
	formElementsStored.thanksforapplying = document.getElementById("thanksforapplying");
	formElementsStored.errormessage = document.getElementById("error-message");
	formElementsStored.formDocument = document.getElementById("application-form");

	formElementsStored.submitApplication.addEventListener("click", submitApplicationData);
	formElementsStored.footerFormToggle.addEventListener("click", toggleForm);
	formElementsStored.formToggle.addEventListener("click", toggleForm);

	function toggleForm(e){
	  application.classList.toggle("active");
	}

	function submitApplicationData(e){
		e.preventDefault();
		var storage = {};
		var formData = e.target.form.elements;
		var keys = ["userFirstName", "userLastName", "userLinkedinUrl", "userEmail", "userLocation", "userReferral", "userReasonForInvite"];
		var values = ["user-first-name", "user-last-name", "user-linkedin-url", "user-email", "user-location", "user-referral", "why-we-should-invite"];
		var formValue;
		for (var i = 0; i < values.length; i++){
		  formValue = formData[values[i]].value
			if(formValue.length > 0) {
				storage[keys[i]] = formValue;
			}
		}

		var storageLength = Object.keys(storage).length;
		if(storageLength  >= 6){
			submitData(storage);
		} else {
			formElementsStored.errormessage.classList.remove("hideElement");
		}
	}

	function submitData(data){
	$.ajax({
		method: "POST",
		url: "/submitApplicant",
		data: JSON.stringify({ "data": data }),
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(data === "true"){
				formElementsStored.errormessage.classList.add("hideElement");
				formElementsStored.submitApplication.classList.add("hideElement");
				formElementsStored.thanksforapplying.classList.remove("hideElement");
				formElementsStored.thanksforapplying.classList.add("thanksforapplying");
				formElementsStored.formDocument.classList.add("hideElement");
			}
		},
		error: function(err){
				//add functionality to update UI with error message;
		} });
	}

})();
