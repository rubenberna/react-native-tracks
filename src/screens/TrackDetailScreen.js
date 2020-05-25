import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");

  const track = state.find((t) => t._id === _id);
  const initialCords = track.locations[0].coords;

  return (
    <>
      <Text h2>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCords,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 250,
  },
});

export default TrackDetailScreen;
