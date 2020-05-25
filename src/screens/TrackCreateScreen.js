// import "../_mockLocation"; // we are mocking a treck in expo-navigation
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Text } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  // the location is an argument we receive inside the hook from the 'watchPositionAsync' method -- which in turn comes from expo-navigation

  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  ); // we only want to rebuild this callback when the state.recording changes, so like this, we can pass it as an argument to the useLocation, which listens to the changes on this function inside the useEffect

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} color="black" />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
