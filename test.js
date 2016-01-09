var fs = require('fs');

var _ = require('lazy.js');
var data = require('./loadCSV');

var mapping = {
	T: '傳院',
	V: '商圖',
	W: '綜圖',
	R: '總圖',
	D: '微四',
	B: '微二',
	G: '微五',
	O: '商學院',
	I: '未知',
	P: '資科系',
	A: '微一',
	N: '地政系',
	Y: '應數系',
	S: '微六',
	C: '微三',
	M: '資管系'
};

console.log(_(data).map(l => l.時數).max());
console.log(_(data).map(l => l.電腦編號[l.電腦編號.length - 1]).uniq().toArray());

var x = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], pair[1].length])
	.sortBy(pair => pair[1], true)
	.toObject();

fs.writeFileSync('./test.json', JSON.stringify(x, null, '\t'));
