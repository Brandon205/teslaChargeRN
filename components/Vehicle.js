import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import axios from 'axios';

export default function Vehicle() {
  const { vID } = useParams();
  const [ carData, setCarData ] = useState({});
  const [ chargeData, setChargeData ] = useState({});

    useEffect(() => { // For calling the backend for the selected vehicles information
      const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host

      axios.get(baseURL + '/vehicle/' + vID).then(response => {
        if (response.status === 200) {
          setCarData(response.data.response)
        }
        // axios.get(baseURL + '/vehiclecharge/' + vID).then(response => {
        //   console.log()
        //   if (response.status === 200) {
        //     console.log(response.data.response)
        //     setChargeData(response.data.response)
        //   }
        // }).catch(error => {
        //   console.log("ERROR with Charge route", error)
        // })
        }).catch(error => {
          console.log("ERROR with car route", error)
        })

      axios.get(baseURL + '/vehiclecharge/' + vID).then(response => {
        console.log('hello')
        if (response.status === 200) {
          console.log(response.data.response)
          setChargeData(response.data.response)
        }
      }).catch(error => {
        console.log("ERROR with Charge route", error)
      })

    }, [])

    let basicDetails;
    if (Object.keys(carData).length > 0) {
      basicDetails = (
        <View>
          <Text style={styles.carName}>{carData.display_name}</Text>
          <Text>Currently {carData.in_service ? "in service" : "not in service"} and is {carData.state}</Text>
        </View>
      )
    } else {
      basicDetails = <View><Text>Loading Data...</Text></View>
    }

    let chargeDetails;
    if (Object.keys(chargeData).length > 0) {
      chargeDetails = (
        <View>

        </View>
      )
    } else {

    }

  return (
    <View style={styles.container}>
      {basicDetails}
      <Text>Charge Status</Text>

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
