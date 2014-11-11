function parseDate(d){
	return d.slice(0,4) + '-' + d.slice(4,6) + '-' + d.slice(6,8)
}
function makeChart(tests){
	dates = ['Date']
	percent = ['Pulse Ox Percent']
	for (var t in tests){
		test = tests[t]
		if (test.Test.indexOf('Ox') > -1){
			dates[dates.length] = parseDate(test['Visit Date'])
			percent[percent.length] = parseInt(test['Value'])
		}
	}
	
	var chart = c3.generate({
		bindto: '#timeseriesPulseOx',
		data: {
			x : 'Date',
			columns : [
			dates, percent
			]
		},
		grid :{
			y : {
				lines : [{ value: 90, text : 'Respiratory function impacted!'}],
				//color: '#FF0000'
			}
		},
		axis : {
			x : {
				type: 'timeseries',
				tick : {
					format : "%Y-%m-%d"
				}
			}
		}
	});


	$('.chartToolTip').each(function () {
		$(this).qtip({
			content: {
				text: $(this).next('div')
			}, 
			position : {
				my: 'top left',
				at: 'bottom left',
				target: $(this)
				//target: 'mouse'
			},
			style : {
				classes: 'qtip-tooltip-large qtip-bootstrap',
				width : 600,
				height : 300
			}
		});

	});
}

//reorders a testResults object from parsing into a date-organized tests object
function getDateOrganizedTests(tests) {
	var name, date;
	var testsByDate = {};
	for(var t in tests) {
		{
			date = tests[t]['Visit Date']
			name = tests[t]['Test'];
			if(!(date in testsByDate)) {
				testsByDate[date] = {};
			}
			testsByDate[date][name] = tests[t];
		}
	}
	return testsByDate;
}
// Returns an object with names of test as keys, containing dates as keys for all
// tests with that name
function getTestNameDateOrganizedTests(tests) {
	var name, date;
	var testsByName = {};
	for(var t in tests) {
		{
			name = tests[t]['Test'];
			date = tests[t]['Visit Date']
			if(!(name in testsByName)) {
				testsByName[name] = {};
			}
			testsByName[name][date] = tests[t];
		}
	}
	return testsByName;
}

// Returns an array of dates and values formatted for input into chart generation
//v1 = getTestNameDateOrganizedTests(testResults)
//v2 = getTestResultsArrayFromNameDate(v1['RBC'])
function getTestResultsArrayFromNameDate(test) {
	var dates =[];
 	var results = [];
	dates.push("Date");
	results.push(test[Object.keys(test)[0]]['Short Name']);
	console.log(results);
	for(var d in test) {
		console.log(d);
		dates.push(parseDate(test[d]['Visit Date']));
		results.push(test[d]['Value']);
	}
	return [dates,results];
}


// Function to chart based on passed data. Untested
function makeChartDynamic(testResultsArray, rangeLinesObject) {
	var chart = c3.generate({
		//bindto: '#timeseriesPulseOx',
		//bindto: bindToID,
		data: {
			x: 'Date',
			columns: testResultsArray
		},
		grid: {
			y: {
				//lines : [{ value: 90, text : 'Respiratory function impacted!'}]
				lines: rangeLinesObject
			}
		},
		axis: {
			x: {
				type: 'timeseries',
				tick: {
					format: "%Y-%m-%d"
				}
			}
		}
	});
}