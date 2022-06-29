import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import axios from 'axios';

export default function Vehicle() {
  const { vID } = useParams();
  const [ carData, setCarData ] = useState({});
  const [ chargeData, setChargeData ] = useState({});
  const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host

    useEffect(() => { // For calling the backend for the selected vehicles information

      axios.get(baseURL + '/vehicle/' + vID).then(response => {
        if (response.status === 200) {
          setCarData(response.data.response)
        } // TODO: else throw new Error("Error message") < on all routes similar to this probably
        }).catch(error => {
          console.log("ERROR with car route", error)
        })
    }, [])

    let getCharge = () => {
      axios.get(baseURL + '/vehiclecharge/' + vID).then(response => {
        if (response.status === 200) {
          console.log(response.data.response)
          setChargeData(response.data.response)
        }
      }).catch(error => {
        console.log("ERROR with Charge route", error)
      })
    }

    let basicDetails;
    if (Object.keys(carData).length > 0) {
      let displayCharge = Object.keys(chargeData).length > 0 ? 'block' : 'none'
      basicDetails = (
        <View>
          <Text style={styles.carName}>{carData.display_name}</Text>
          <Text>Currently {carData.in_service ? "in service" : "not in service"} and is {carData.state}</Text>
          <TouchableHighlight onPress={() => getCharge()}>
            <View style={styles.button}>
              <Text>↓ Charge Details ↓</Text>
            </View>
          </TouchableHighlight>
          <View style={{display: displayCharge}}>
            <Text>Charge deets here</Text>
          </View>
        </View>
      )
    } else {
      basicDetails = <View><Text>Loading Data...</Text></View>
    }

  return (
    <View style={styles.container}>
      {basicDetails}
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
