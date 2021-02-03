'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class MyDevice extends Homey.Device {

	updateSetting(setting, value) {
		const body_json = { "name": setting, "value": value };
		var hostname = this.getSetting('hostname');
		fetch('http://' + hostname + '/api/v2/dev/settings/', { method: 'POST', body: JSON.stringify(body_json) })
			.catch(function (err) {
				this.log(err);
			});
	}

	timerElapsed(device) {
		setTimeout(function () { device.timerElapsed(device); }, device.getSetting('interval') * 1000);
		var energy = {
			"list": [
				{ "device": "measure_power", "factor": 1000, "dsmr": ["power_delivered_l1", "power_delivered_l2", "power_delivered_l3"] },
				{ "device": "meter_power", "factor": 1, "dsmr": ["energy_delivered_tariff1", "energy_delivered_tariff2"] },
				{ "device": "meter_gas", "factor": 1, "dsmr": ["gas_delivered"] },
				{ "device": "meter_water", "factor": 1, "dsmr": ["water_delivered"] }
			]
		};
		var hostname = device.getSetting('hostname');
		fetch('http://' + hostname + '/api/v2/sm/actual').then(function (response) {
			response.json().then(function (json) {
				energy.list.forEach(lookup => {
					var add = 0;
					Object.entries(json).forEach(element => {
						lookup['dsmr'].forEach(search => {
							if (search === element[0]) {
								add += (element[1].value * lookup['factor']);
								device.setCapabilityValue(lookup['device'], add);
							}
						});
					});
				});
			});
		}).catch(function (err) {
			device.log(err);
		});
	}

	// this method is called when the Device is initialized
	onInit() {
		this.log('dsmr-logger init');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());
		this.log('Hostname:', this.getSetting('hostname'));
		this.log('Interval:', this.getSetting('interval'));

		var device = this;
		setTimeout(function () { device.timerElapsed(device); }, this.getSetting('interval') * 1000);
	}

	async onSettings( oldSettingsObj, newSettingsObj, changedKeysArr ) {
		changedKeysArr.forEach(element => {
			if(element === 'interval') {
				this.updateSetting("tlgrm_interval", newSettingsObj.interval);
			}
		});
	}
}

module.exports = MyDevice;
