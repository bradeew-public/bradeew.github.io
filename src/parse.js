var br = '<br />';
//get Demographic info using jquery DOM
function getDemographicInfo(document){
	var patient = $(document).find("patient");
	var first = patient.find('given').text();
	var last = patient.find('family').text();
	var gender = patient.find('administrativeGenderCode').attr('code');
	var birthTime = patient.find('birthTime').attr('value');
	var race = patient.find('raceCode').attr('displayName');
	var ethnic = patient.find('ethnicGroupCode').attr('displayName');

	$("#anotherElement").append("First: " + first + br);
	$("#anotherElement").append("Last: " + last + br);
	$("#anotherElement").append("Gender: " + gender + br );
	$("#anotherElement").append("Birth Date: " + birthTime + br);
	$("#anotherElement").append("Race: " + race + br);
	$("#anotherElement").append("Ethnic: " + ethnic + br);

}
//use json to get array of json objects
function getData(data, index){
	var components = data.component.structuredBody.component;
	var com = components[index].section.text[0].table;
	labels = getTableHeader(com.thead);
	values = getValues(com.tbody, labels);

	return values;
}	


// this is just a placeholder to print all values
function appendValues(values, name){
	$("#anotherElement").append(br + 'Section ' + name + br);
	
	for(var x in values) {
		$("#anotherElement").append(br + name + ' ' + x + br);
		for (var y in values[x]){
			$("#anotherElement").append(y + ": " + values[x][y]+ br);
		}
	}
	
}

function getTableHeader(head){
	var labels = [];
	var values = head.tr.th;
	
	for(var v in values){
		labels[labels.length] = values[v];
	}
	return labels;
}

function getValues(body, labels){
	var values = [];
	var encounters = body.tr;
	for(var v in encounters){
		var encounter = encounters[v].td;
		var newEncounter = {};
		for(var u in encounter){
			if (typeof encounter[u] != "string"){
				if ('text' in encounter[u]){
					newEncounter[labels[u]] = encounter[u];
				}	else{
					newEncounter[labels[u]] = encounter[u].content;
				}
			} else {
				newEncounter[labels[u]] = encounter[u];
			}
		}
		values[values.length] = newEncounter	;
	}
	return values;
}		
