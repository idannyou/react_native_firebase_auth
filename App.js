import React, { Component } from "react";
import { View } from "react-native";

import Header from "./src/components/Header";
import LoginForm from "./src/components/LoginForm";

export default class App extends Component {
  render() {
    return (
      <View>
        <Header title="Auth" />
        <LoginForm />
      </View>
    );
  }
}
