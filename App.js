import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const baseURL = 'http://localhost:8080'
  const [carData, setCarData] = useState('');

  useEffect(() => {
    axios.get(baseURL + '/vehicle/' + '1492931281739069').then(response => {
      console.log(response.data)
      setCarData(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

    axios.get(baseURL + '/home').then((response) => {
      console.log(response);
    }).catch(error => {
      console.log("ERROR", error)
    })

    let content;
    if (carData) {
      content = (
        <View>
          <Text>Car Name: {carData.display_name}</Text>
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
