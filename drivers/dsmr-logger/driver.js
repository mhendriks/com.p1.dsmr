'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class MyDriver extends Homey.Driver {

	onPairListDevices(data, callback) {
		fetch('http://dsmr-api.local/api/v2/dev/info').then(function (response) {
			response.json().then(function (json) {
				const devices = [
					{
						"data": { "id": "" },
						"settings": { "interval": 0 }
					}
				]
				Object.entries(json).forEach(element => {
					if (element[0] === 'macaddress')
						devices[0].data.id = element[1];

					if (element[0] === 'telegraminterval')
						devices[0].settings.interval = element[1];
				});
				callback(null, devices);
			});
		}).catch(function (err) {
			console.log(err);
		});
	}
	
}

module.exports = MyDriver;