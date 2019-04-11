import React, { Component } from 'react'
import { View } from 'react-native'

import Firebase from './src/Firebase'
import Header from './src/components/Header'
import LoginForm from './src/components/LoginForm'

export default class App extends Component {
  render() {
    console.log(Firebase)
    return (
      <View style={styles.viewStyles}>
        <Header title="Auth" />
        <LoginForm />
      </View>
    )
  }
}

const styles = {
  viewStyles: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    justifyContent: 'center',
  },
}
