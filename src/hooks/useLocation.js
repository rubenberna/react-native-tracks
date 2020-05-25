import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        //the watchPositionAsync gives a value called 'subscriber'
        await requestPermissionsAsync();
        sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation, //high accuracy for on foot
            timeInterval: 1000, //update once every sec
            distanceInterval: 10, //update once every 10 meters
          },
          callback
        );
      } catch (err) {
        console.log(err);
        setErr(err);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    //we stop listening before starting to listen again, so that we don't call watchPositionAsync a second time. We instead stop the first one, and start it again
    return () => {
      //we're first checking if we have a subscriber, because we might start this component with a value of shouldTrack as null
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
