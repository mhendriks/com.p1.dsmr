'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class MyDevice extends Homey.Device {

	timerElapsed(device) {
		var energy = {
			"list": [
				{ "device": "measure_power", "factor": 1000, "dsmr": ["power_delivered_l1", "power_delivered_l2", "power_delivered_l3"] },
				{ "device": "meter_power", "factor": 1, "dsmr": ["energy_delivered_tariff1", "energy_delivered_tariff2"] },
				{ "device": "meter_gas", "factor": 1, "dsmr": ["gas_delivered"] },
				{ "device": "meter_water", "factor": 1, "dsmr": ["water_delivered"] }
			]
		};
		var hostname = device.getSetting('hostname');
		fetch('http://' + hostname + '/api/v1/sm/actual').then(function (response) {
			response.json().then(function (json) {
				energy.list.forEach(lookup => {
					var add = 0;
					json.actual.forEach(element => {
						lookup['dsmr'].forEach(search => {
							if (search === element['name']) {
								add += (element['value'] * lookup['factor']);
								device.setCapabilityValue(lookup['device'], add);
							}
						});
					});
				});
			});
		}).catch(function (err) {
			console.log(err);
		});
	}


	// this method is called when the Device is inited
	onInit() {
		var interval = this.getSetting('interval');
		this.log('Device init');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());
		this.log('hostname:', this.getSetting('hostname'));
		this.log('interval:', interval);
		let device = this;

		setInterval(function () { device.timerElapsed(device); }, interval * 1000);
	}
}

module.exports = MyDevice;