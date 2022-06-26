import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const baseURL = 'http://localhost:8080';
  const [carData, setCarData] = useState('');

  useEffect(() => {
    axios.get(baseURL + '/vehicle/' + '1492931281739069').then(response => {
      if (response.status === 200) {
        setCarData(response.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [])

    let content;
    if (carData !== '') {
      content = (
        <View>
          <Text style={{fontWeight: 'bold'}}>Car Name: {carData.response.display_name}</Text>
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <Text>Here is some info on your vehicle:</Text>
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
