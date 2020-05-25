import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  // This is the default screen of our app, where we'll check if we have a saved token in asyncStorage first
  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
