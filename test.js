var fs = require('fs');

var _ = require('lazy.js');
var data = require('./loadCSV');

console.log(_(data).map(l => l.時數).max());

var x = _(data)
	.sortBy(l => parseInt(l.電腦編號, 10))
	.groupBy(l => l.電腦編號[l.電腦編號.length - 1])
	.toObject();

fs.writeFileSync('./test.json', JSON.stringify(x, null, '\t'));
