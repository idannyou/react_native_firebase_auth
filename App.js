import React, { useState } from 'react'
import { View } from 'react-native'

import Header from './src/components/Header'
import LoginForm from './src/components/LoginForm'
import { SIGN_IN } from './src/constants'

const App = () => {
  const [signInState, toggleSign] = useState(SIGN_IN)

  const title = signInState ? 'Sign In' : 'Sign Up'

  const handleToggleSign = () => {
    toggleSign(!signInState)
  }

  return (
    <View style={styles.viewStyles}>
      <Header title={title} />
      <LoginForm title={title} toggleSign={handleToggleSign} />
    </View>
  )
}

const styles = {
  viewStyles: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    justifyContent: 'center',
  },
}

export default App
