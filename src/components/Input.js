import React from 'react'
import { Text, View, TextInput } from 'react-native'

const Input = props => {
  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}> {props.label}: </Text>
      <TextInput
        value={props.value}
        style={styles.textInputStyles}
        placeholder={props.placeholder}
        autoCorrect={false}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = {
  viewStyles: {
    margin: 9,
    padding: 9,
    borderColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontSize: 15,
    flex: 1,
  },
  textInputStyles: {
    fontSize: 15,
    height: 50,
    flex: 2,
  },
}

export default Input
