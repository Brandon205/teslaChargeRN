import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useParams } from 'react-router-native';

export default function Vehicle() {
  const { vID } = useParams();

  return (
    <View style={styles.container}>
      <Text>Vehicle Page</Text>
      <Text>Vehicle ID: {vID}</Text>
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
