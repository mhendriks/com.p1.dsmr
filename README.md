# P1 smartmeter DSMR board interface

## Abandonment
I built this app for a friend who wanted to use this board with his Homey. I personally don't use Homey, and my friend has since also switched to Home Assistant. Therefore I can't continue developing this app as I have no way to test it (and no longer have a compelling reason).

However the current version should still work as of right now (February 2020). Of course, feel free to fork it if needed! I will leave it in the Homey store for now as there is no alternative app yet. If you like me to remove it from the store in favour of your maintained fork, please log an issue here and I'll sort this out!

## Introduction
This app creates a device which retrieves energy statistics from a Dutch Smart Meter interface board from Willem Aandewiel. This board can be found here: https://opencircuit.nl/Product/15031/Slimme-meter-uitlezer-V4-bouwpakket-met-ESP-12 and complete documentation here: https://mrwheel.github.io/DSMRloggerWS/

The app retrieves the statistics every few seconds (which can be configured) from an IP (can also be configured).

This app is a fork of https://github.com/koktaildotcom/com.p1.smartmeter

-=edit=- 

App has been updated to work correctly with Homey's OS 3.0 

### Usage of the Homey app
1. Install the app `com.p1.dsmr`.
2. Add device `DSMR smart meter`.
3. Configure IP and retrieval frequency

Note: You need to restart the app when you change the retrieval frequency. The IP will be updated on every attempt.
