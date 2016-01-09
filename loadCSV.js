var fs = require('fs');
var path = require('path');

var counter = 1;

var x = fs
	.readFileSync(path.resolve(__dirname, './log.csv'), 'utf8')
	.split('\n')
	.filter(l => l !== '電腦編號,ip,學生證號,卡號,開始時間,離開時間,時數')
	.filter(l => l.length > 0)
	.map(l => {
		var splitted = l.split(',');

		var 電腦編號 = splitted[0].replace(/\s/g, '');
		var ip = splitted[1].replace(/\s/g, '');
		var 學生證號 = splitted[2].replace(/\s/g, '');
		var 卡號 = splitted[3].replace(/\s/g, '');

		var 開始時間 = new Date('2015-01-' + splitted[4].split(' ')[0].split('-')[0] + 'T' + splitted[4].split(' ')[1] + 'Z');
		var 離開時間 = new Date('2015-01-' + splitted[5].split(' ')[0].split('-')[0] + 'T' + splitted[5].split(' ')[1] + 'Z');

		var 時數分割 = splitted[6].replace(/\s/g, '').split('小時');
		var 時數小時 = parseInt(時數分割[0], 10);
		var 時數分鐘 = parseInt(時數分割[1], 10);
		var 時數 = 時數小時 * 60 + 時數分鐘;

		return {
			sn: counter++,
			電腦編號: 電腦編號,
			ip: ip,
			學生證號: 學生證號,
			卡號: 卡號,
			開始時間: 開始時間,
			離開時間: 離開時間,
			時數: 時數
		};
	});

fs.writeFileSync(path.resolve(__dirname, './log.json'), JSON.stringify(x, null, '    '));
fs.writeFileSync(path.resolve(__dirname, './log.min.json'), JSON.stringify(x));
fs.writeFileSync(path.resolve(__dirname, './html/data.js'), 'var rawdata = ' + JSON.stringify(x) + ';');

module.exports = x;
