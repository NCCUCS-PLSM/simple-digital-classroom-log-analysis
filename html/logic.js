var chart = c3.generate({
	bindto: '#chart',
	data: {
		columns: [
			['Logs'].concat(rawdata.filter(l => l.電腦編號.includes('W')).map(l => l.時數))
		],
		// type: 'spline'
	},
	point: {
		show: false
	},
	zoom: {
		enabled: true
	},
	subchart: {
		show: true
	},
	interaction: {
		enabled: true
	},
	size: {
		height: 640
	},
	axis: {
		x: {
			tick: {
				culling: {
					max: 5
				}
			}
		}
	}
});
