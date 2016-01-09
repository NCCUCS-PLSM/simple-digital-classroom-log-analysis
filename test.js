var fs = require('fs');

var _ = require('lazy.js');
var data = require('./loadCSV');
data = data.filter(l => l.時數 > 0 && l.時數 < 10927);

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

// 取得總人次
var totalEnrollment = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], pair[1].length])
	.sortBy(pair => pair[1], true)
	.toObject();

fs.writeFileSync('./totalEnrollment.json', JSON.stringify(totalEnrollment, null, '\t'));

// 取得總時間
var totalTime = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], _(pair[1]).map(p => p.時數).sum()])
	.sortBy(pair => pair[1], true)
	.toObject();

fs.writeFileSync('./totalTime.json', JSON.stringify(totalTime, null, '\t'));

// 取得時數序列，的時數
var timeSeries = _(data)
	.map(l => l.時數)
	.sort()
	.toArray();

fs.writeFileSync('./timeSeries.json', JSON.stringify(timeSeries, null, '\t'));

// 按照日期分組，的時數
var grouppedDate = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => l.開始時間.toDateString())
	.pairs()
	.map(pair => [pair[0], _(pair[1]).map(p => p.時數).sum()])
	.sortBy(pair => pair[1], true)
	.toObject();

fs.writeFileSync('./grouppedDate.json', JSON.stringify(grouppedDate, null, '\t'));

// 按照星期分組，的時數
var grouppedDay = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => l.開始時間.toDateString().split(' ')[0])
	.pairs()
	.map(pair => [pair[0], _(pair[1]).map(p => p.時數).sum()])
	.sortBy(pair => pair[1], true)
	.toObject();

fs.writeFileSync('./grouppedDay.json', JSON.stringify(grouppedDay, null, '\t'));

// 按照日期分組，照日期排序，的時數
var grouppedDateSorted = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => l.開始時間.toDateString().slice(4))
	.pairs()
	.map(pair => [pair[0], _(pair[1]).map(p => p.時數).sum()])
	.sortBy(pair => pair[0], false)
	.toObject();

fs.writeFileSync('./grouppedDateSorted.json', JSON.stringify(grouppedDateSorted, null, '\t'));

// 按照日期分組，照日期排序，內部再一次照區域分組，的時數
var grouppedDateSortedGroupped = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => l.開始時間.toDateString().slice(4))
	.pairs()
	.map(pair => [pair[0], _(pair[1])
		.groupBy(p => p.電腦編號[p.電腦編號.length - 1])
		.pairs()
		.map(pp => [mapping[pp[0]] + pp[0], _(pp[1]).map(ppp => ppp.時數).sum()])
		.sortBy(pair => pair[1], true)
		.toObject()
	])
	.sortBy(pair => pair[0], false)
	.toObject();

fs.writeFileSync('./grouppedDateSortedGroupped.json', JSON.stringify(grouppedDateSortedGroupped, null, '\t'));

// 按照區域分組，內部再一次照日期分組，的時數
var grouppedZoneSortedGroupped = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], _(pair[1])
		.groupBy(p => p.開始時間.toDateString().slice(4))
		.pairs()
		.map(pp => [pp[0], _(pp[1]).map(ppp => ppp.時數).sum()])
		.sortBy(pair => pair[0], false)
		.toObject()
	])
	.sortBy(pair => pair[0], false)
	.toObject();

fs.writeFileSync('./grouppedZoneSortedGroupped.json', JSON.stringify(grouppedZoneSortedGroupped, null, '\t'));

// .toJSON().split('T')[0]
// 按照區域分組，內部再一次照日期分組，的時數
// for web
var grouppedZoneSortedGrouppedForWeb = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], _(pair[1])
		.groupBy(p => p.開始時間.toJSON().split('T')[0])
		.pairs()
		.map(pp => [pp[0], _(pp[1]).map(ppp => ppp.時數).sum()])
		.sortBy(pair => pair[0], false)
		.toObject()
	])
	.sortBy(pair => pair[0], false)
	.toObject();

fs.writeFileSync('./grouppedZoneSortedGrouppedForWeb.json', JSON.stringify(grouppedZoneSortedGrouppedForWeb, null, '\t'));

// 按照區域分組，內部再一次照日期分組，的人次
// for web
var grouppedZoneSortedGrouppedByEnrollmentsForWeb = _(data)
	.sortBy(l => l.sn)
	.groupBy(l => mapping[l.電腦編號[l.電腦編號.length - 1]] + l.電腦編號[l.電腦編號.length - 1])
	.pairs()
	.map(pair => [pair[0], _(pair[1])
		.groupBy(p => p.開始時間.toJSON().split('T')[0])
		.pairs()
		.map(pp => [pp[0], _(pp[1]).size()])
		.sortBy(pair => pair[0], false)
		.toObject()
	])
	.sortBy(pair => pair[0], false)
	.toObject();

fs.writeFileSync('./grouppedZoneSortedGrouppedByEnrollmentsForWeb.json', JSON.stringify(grouppedZoneSortedGrouppedByEnrollmentsForWeb, null, '\t'));
