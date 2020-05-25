import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import { ScrollView } from "react-native";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const ComponentName = () => {
  const {
    state: { name, recording, locations },
    changeName,
    stopRecording,
    startRecording,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <ScrollView>
      <Spacer>
        <Input
          placeholder="Enter name"
          onChangeText={changeName}
          value={name}
        />
        {recording ? (
          <Button title="Stop" onPress={stopRecording} />
        ) : (
          <Button title="Record" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </ScrollView>
  );
};

export default ComponentName;
