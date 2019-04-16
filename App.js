import React, { Component } from 'react'
import { View } from 'react-native'

import Header from './src/components/Header'
import LoginForm from './src/components/LoginForm'

export default class App extends Component {
  render() {
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
