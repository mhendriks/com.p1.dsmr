const Homey = require('homey');
const fetch = require('node-fetch');
const { ManagerSettings } = require('homey');

class P1Device extends Homey.Device {

    round(number) {
        return Math.round(number * 100) / 100
    }

    timerFire(device) {
        var ip = ManagerSettings.get('ip');
        console.log ("IP read: " + ip);
        try {
            if (ip.length < 6) {
                console.log ("IP too short. Aborting attempt.");
                return;      
            }
            const result = fetch('http://' + ip + '/restAPI?get=Actueel')
            .then(function(response){
                //console.log (response);
                return response.json();
            })
            .then(function(json){
                console.log("Energy Delivered: " + json.Energy_Delivered);
                device.processData(json);
            })
            .catch (function(err) {
                console.log ("Error reaching DSMR meter: " + err)
            })
            ;
        } catch (err) {
            console.log ("Error reaching DSMR meter: " + err);
        }
    }

    onInit() {
        let device = this;
        device._driver = this.getDriver();
        console.log ("Starting Device");
        var freq = Number(ManagerSettings.get('freq'));
        console.log ("Frequency read: " + freq);
        if (freq == 0) freq = 30;
        if (freq < 5) freq = 5;
        console.log ("Frequency set: " + freq);
        setInterval (function(){return device.timerFire(device); }, freq * 1000)
    }

    processData(data) {
        let device = this;
        let now = new Date();
        let update = device.getSetting('meter_gas_update_date');
        let updateDate = null;

        console.log ("Processing update");
        if (null === update) {
            updateDate = new Date();
            device.setSettings({
                meter_gas_update_date: updateDate.getTime()
            });
        } else {
            // if not yet set update the setting
            updateDate = new Date(update);
        }

        let gasCurrent = 0;
        let gasNew = 0;
        let gasChange = 0;

        if (updateDate < new Date(now.getTime() - (1000 * 60 * 60))) {
            if (data.Gas_Delivered) { 
                gasNew = Number(data.Gas_Delivered) * 1000;
                gasCurrent = Number(device.getCapabilityValue('meter_gas.consumed')) * 1000;

                gasChange = (gasNew - gasCurrent) / 1000;

                if (gasChange > 0) {
                    device.updateCapabilityValue('meter_gas.measure', gasChange);

                    device.setSettings({
                        meter_gas_update_date: now.getTime()
                    });
                }
            }
        }

        console.log("Data pushed:");
        console.log(data);

        device.updateCapabilityValue('meter_gas.consumed', device.round(data.Gas_Delivered));
        device.updateCapabilityValue('measure_power.consumed', device.round(data.Power_Delivered * 1000));
        device.updateCapabilityValue('measure_power.generated', device.round(data.Power_Returned * 1000));
        device.updateCapabilityValue('meter_power.consumed', device.round(data.Energy_Delivered));
        device.updateCapabilityValue('meter_power.generated', device.round(data.Energy_Returned));
    }

    updateCapabilityValue(capability, value) {
        let device = this,
            currentValue = device.getCapabilityValue(capability);

        device.setCapabilityValue(capability, value);

        if (value !== currentValue) {
            switch (capability) {
                case 'measure_power.consumed':
                    device._driver.triggerMeasurePowerConsumedChangedFlow(device, {
                        "measure_power.consumed": value
                    });
                    break;
                case 'meter_power.consumed':
                    device._driver.triggerMeterPowerConsumedChangedFlow(device, {
                        "meter_power.consumed": value
                    });
                    break;
                case 'measure_power.generated':
                    device._driver.triggerMeasurePowerGeneratedChangedFlow(device, {
                        "measure_power.generated": value
                    });
                    break;
                case 'meter_power.generated':
                    device._driver.triggerMeterPowerGeneratedChangedFlow(device, {
                        "meter_power.generated": value
                    });
                    break;
                case 'meter_gas.measure':
                    device._driver.triggerMeasureGasChangedFlow(device, {
                        "meter_gas.measure": value
                    });
                    break;
                case 'meter_gas.consumed':
                    device._driver.triggerMeterGasChangedFlow(device, {
                        "meter_gas.consumed": value
                    });
                    break;
            }
        }
    }
}

module.exports = P1Device