var br = '<br />'
//get Demographic info using jquery DOM
function getDemographicInfo(document){
	var patient = $(document).find("patient")
	var first = patient.find('given').text()
	var last = patient.find('family').text()
	var gender = patient.find('administrativeGenderCode').attr('code')
	var birthTime = patient.find('birthTime').attr('value')
	var race = patient.find('raceCode').attr('displayName')
	var ethnic = patient.find('ethnicGroupCode').attr('displayName')

	$("#anotherElement").append("First: " + first + br)
	$("#anotherElement").append("Last: " + last + br)
	$("#anotherElement").append("Gender: " + gender + br )
	$("#anotherElement").append("Birth Date: " + birthTime + br)
	$("#anotherElement").append("Race: " + race + br)
	$("#anotherElement").append("Ethnic: " + ethnic + br)

}
//getEncounters using json
function getEncounters(data){
	var components = data.component.structuredBody.component
	var allergy = components[0]
	var com = components[1].section.text[0].table
	labels = getTableHeader(com.thead)
	values = getValues(com.tbody, labels)

	//values is an array of json objects with uniform structure
	// below will print all fields
	for(var x in values) {
		
		$("#anotherElement").append(br +  "Encounter" + x + br)
		for (var y in values[x]){
			$("#anotherElement").append(y + ": " + values[x][y]+ br)
		}
	}
	
}

function getTableHeader(head){
	var labels = []
	var values = head.tr.th
	
	$("#anotherElement").append("aaaa" + values + br)
	for(var v in values){
		labels[labels.length] = values[v]
	}
	return labels
}

function getValues(body, labels){
	var values = []
	var encounters = body.tr
	for(var v in encounters){
		var encounter = encounters[v].td
		var newEncounter = {}
		for(var u in encounter){
			newEncounter[labels[u]] = encounter[u]
		}
		values[values.length] = newEncounter	
	}
	return values
}		
