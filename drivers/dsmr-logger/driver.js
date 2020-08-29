'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class MyDriver extends Homey.Driver {

	onPairListDevices(data, callback) {
		fetch('http://DSMR-API.local/api/v1/dev/info').then(function (response) {
			response.json().then(function (json) {
				const devices = [
					{
						"data": { "id": "" },
						"settings": { "interval": 0 }
					}
				]
				json.devinfo.forEach(element => {
					if (element['name'] === 'macaddress')
						devices[0].data.id = element['value'];

					if (element['name'] === 'telegraminterval')
						devices[0].settings.interval = element['value'];
				});
				callback(null, devices);
			});
		}).catch(function (err) {
			console.log(err);
		});
	}
	
}

module.exports = MyDriver;