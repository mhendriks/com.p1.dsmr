const Homey = require('homey');

class P1 extends Homey.App {

    onInit () {
        this.log('DSMR P1 Reader is starting...');
    }
}

module.exports = P1;

