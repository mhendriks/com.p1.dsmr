const Homey = require('homey');

class P1 extends Homey.App {

    onInit () {
        this.log('DSMRv4 Reader is starting...');
    }
}

module.exports = P1;

