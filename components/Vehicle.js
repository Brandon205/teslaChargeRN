import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Vehicle(props) {
  return (
    <View style={styles.container}>
      <Text>Vehicle Page</Text>
      <Text>Vehicle ID: {props.vID}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
