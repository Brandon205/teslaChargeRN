import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Home() {
    // const [vehicleID, setVehicleID] = useState('1492931281739069');
    const [carData, setCarData] = useState('');
    
    const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host

    useEffect(() => {
      axios.get(baseURL + '/vehicles').then(response => {
        if (response.status === 200) {
          setCarData(response.data.response)
          console.log(response.data.response)
        }
      }).catch(error => {
        console.log("ERROR!!! ", error);
      })
    }, [])

    let content;
    if (carData) {
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
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
