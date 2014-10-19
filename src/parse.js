function getDemographicInfo(document){
	var patient = $(document).find("patient")
	var first = patient.find('given').text()
	var last = patient.find('family').text()
	var gender = patient.find('administrativeGenderCode').attr('code')
	$("#anotherElement").append("First: " + first + '<br />')
	$("#anotherElement").append("Last: " + last + '<br />')
	$("#anotherElement").append("Gender: " + gender)
}

