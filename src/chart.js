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


