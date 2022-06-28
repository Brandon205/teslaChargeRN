import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import axios from 'axios';

export default function Vehicle() {
  const { vID } = useParams();
  const [ carData, setCarData ] = useState({});

    useEffect(() => { // For calling the backend for the selected vehicles information
      const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host

      axios.get(baseURL + '/vehicle/' + vID).then(response => {
        if (response.status === 200) {
          console.log(response.data.response)
          setCarData(response.data.response)
        }
        }).catch(error => {
          console.log(error)
        })
    }, [])

    let content;
    if (Object.keys(carData).length > 0) {
      content = (
        <View>
          <Text style={styles.carName}>{carData.display_name}</Text>
          <Text>Currently {carData.in_service ? "in service" : "not in service"} and is {carData.state}</Text>
        </View>
      )
    } else {
      content = <View><Text>Loading Data...</Text></View>
    }

  return (
    <View style={styles.container}>
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
    carName: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  });
