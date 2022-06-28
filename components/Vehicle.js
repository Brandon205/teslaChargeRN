import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';

export default function Vehicle() {
  const { vID } = useParams();
  const { carData, setCarData} = useState({});

    // useEffect(() => { // For calling the backend for the selected vehicles information
    //     axios.get(baseURL + '/vehicle/' + vID).then(response => {
    //         if (response.status === 200) {
    //             setCarData(response.data)
    //         }
    //         }).catch(error => {
    //             console.log(error)
    //         })
    // }, [])

    let content;
    if (carData) {
      content = (
        <View>
          <Text>This is a vehicle</Text>
        </View>
      )
    }

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
