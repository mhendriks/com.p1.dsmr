# P1 smartmeter DSMR board interface

## Abandonment
I built this app for a friend who wanted to use this board with his Homey. I personally don't use homey, and my friend has since also switched to Home Assistant. Therefore I can't continue developing this app as I have no way to test it (and no compelling reason).

However the current version should still work. Of course, feel free to fork it if needed! If you like me to remove it from the store in favour of a maintained fork, please log an issue here and I'll sort this out!

## Introduction
This app creates a device which retrieves energy statistics from a Dutch Smart Meter interface board from Willem Aandewiel. This board can be found here: https://opencircuit.nl/Product/15031/Slimme-meter-uitlezer-V4-bouwpakket-met-ESP-12 and complete documentation here: https://mrwheel.github.io/DSMRloggerWS/

The app retrieves the statistics every few seconds (which can be configured) from an IP (can also be configured).

This app is a fork of https://github.com/koktaildotcom/com.p1.smartmeter

### Usage of the Homey app
1. Install the app `com.p1.dsmr`.
2. Add device `DSMR smart meter`.
3. Configure IP and retrieval frequency

Note: You need to restart the app when you change the retrieval frequency. The IP will be updated on every attempt.
