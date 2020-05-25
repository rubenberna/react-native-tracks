import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://4c01978a.ngrok.io/", //server hosted in ngrok -- url is available for 8 hours
});

instance.interceptors.request.use(
  // the config object has information about the req that we're about to make and we can modify it at this point
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // we return a new promise that is rejected with that error
    return Promise.reject(err);
  }
);

export default instance;
