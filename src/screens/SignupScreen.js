import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitBtnText="Sign Up"
        onSubmit={({ email, password }) => signup({ email, password })} // deconstruct inside of the prop function :) HOWEVER, this is the same as calling directly signup, because we're just taking some arguments and passing it to another function
      />
      <NavLink
        text="Already have an account? Sign in instead!"
        routeName="Signin"
      />
    </View>
  );
};

SignupScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default SignupScreen;
