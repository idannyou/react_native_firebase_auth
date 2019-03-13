import React, { Component } from "react";
import { View } from "react-native";
import firebase from "@firebase/app";

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
} from "react-native-dotenv";

import Header from "./src/components/Header";
import LoginForm from "./src/components/LoginForm";

export default class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <View>
        <Header title="Auth" />
        <LoginForm />
      </View>
    );
  }
}
