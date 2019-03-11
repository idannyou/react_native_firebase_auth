import React, { Component } from "react";
import { View, Button } from "react-native";

import Input from "./Input";

export default class LoginForm extends Component {
  state = { email: "", password: "" };

  onChangeText = state => text =>
    this.setState({
      [state]: text
    });

  render() {
    return (
      <View>
        <Input
          label="Email"
          placeholder="user@email.com"
          value={this.state.email}
          secureTextEntry={false}
          onChangeText={this.onChangeText("email")}
        />
        <Input
          label="Password"
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={this.onChangeText("password")}
        />

        <Button title="Sign in" onPress={() => console.log("sign in")} />
      </View>
    );
  }
}
