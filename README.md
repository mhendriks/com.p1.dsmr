# DSMR-logger
This is the repository for the Homey app for the [DSMR API V2 interface](https://github.com/mhendriks/DSMR-API-V2) that is developed by Martijn Hendriks. 

## Installation
When adding a device with the application, the app searches for a DSRM-logger with the `dsmr-api.local/` hostname. This is the default hostname of the DSMR-logger. The DSMR-logger is saved with the MAC-address as unique ID. The `telegraminterval` of the DSRM-logger is used as interval for the app. 

## Devices
This app contains two device drivers.

### dsmr-logger (use only this one to connect with the P1 adapter)
The device driver dsmr-logger is the new driver for supporting the new REST-API of the DSMRloggerAPI firmware of the DSMR-logger. This driver is in development, feature-requests and bug-fixes are welcome.

### p1-smartmeter (deprecated)
The device driver p1-smartmeter is developed for the DSMRloggerWS software for the DSMR-logger. The DSRMloggerWS is an old firmware version and no longer maintained by the developer, so the device driver is also deprecated.

## Settings
After installation the following properties can be changed on the device: 
 - Hostname, can also be an IP-address
 - Interval
