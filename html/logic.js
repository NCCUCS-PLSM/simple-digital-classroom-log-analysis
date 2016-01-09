var container = document.getElementById('chart1');
var dataset = new vis.DataSet(items.filter(v => v.groupFlag % 2 === 1));
var options = {
	start: '2015-01-01',
	end: '2015-01-31',
	drawPoints: false,
	// dataAxis: {
	// 	visible: false
	// },
	legend: true,
	// shaded: true,
	defaultGroup: '',
	dataAxis: {
		left: {
			range: {
				min: -1000,
				max: 29000
			}
		}
	}
};
var Graph2d = new vis.Graph2d(container, dataset, options);

var container2 = document.getElementById('chart2');
var dataset2 = new vis.DataSet(items.filter(v => v.groupFlag % 2 === 0));
var options2 = {
	start: '2015-01-01',
	end: '2015-01-31',
	drawPoints: false,
	// dataAxis: {
	// 	visible: false
	// },
	legend: true,
	// shaded: true,
	defaultGroup: '',
	dataAxis: {
		left: {
			range: {
				min: -1000,
				max: 29000
			}
		}
	}
};
var Graph2d2 = new vis.Graph2d(container2, dataset2, options2);
