import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001; // ten meters in longitude and latitude

const getLocation = (increment) => {
  return {
    timestamp: 100000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 51.0259 + increment * tenMetersWithDegrees,
      longitude: 4.4775 + increment * tenMetersWithDegrees,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
