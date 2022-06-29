import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import axios from 'axios';

export default function Vehicle() {
  const { vID } = useParams(); // The vehicle ID, passed in as a param in the URL
  const [ carData, setCarData ] = useState({}); //The basic information of the car
  const [ chargeData, setChargeData ] = useState({}); // The charge data of the car, once requested
  const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host
  let awake = 'Unknown';

  useEffect(() => { // For calling the backend for the selected vehicles information
    axios.get(baseURL + '/vehicle/' + vID).then(response => {
      if (response.status > 199 && response.status < 300) {
        awake = response.data.response.state;
        setCarData(response.data.response)
      } // TODO: else throw new Error("Error message") < on all routes similar to this probably
      }).catch(error => {
        console.log("ERROR with car route", error)
      })
  }, [])

  let getCharge = () => { // To update chargeData with current vehicles data
    axios.get(baseURL + '/vehiclecharge/' + vID).then(response => {
      if (response.status > 199 && response.status < 300) {
        console.log(response.data.response)
        setChargeData(response.data.response)
      }
    }).catch(error => {
      console.log("ERROR with Charge route", error)
    })
  }

  let wakeCarUp = () => { // Will change eventually to wake the car up automatically??? TODO?
    axios.get(baseURL + '/wakeup/' + vID).then(response => {
      console.log('trying to access wakeup')
      if (response.status > 199 && response.status < 300) {
        console.log('Wake Up Success, car is currently: ' + response.data.response.state)
      } 
    }).catch(error => {
      console.log("ERROR with wakeup route", error)
    })
  }

  let basicDetails;
  if (Object.keys(carData).length > 0) { // Conditional rendering of information on the car once it's loaded
    let displayCharge = Object.keys(chargeData).length > 0 ? 'block' : 'none'
    basicDetails = (
      <View style={styles.container}>
        <Text style={styles.carName}>{carData.display_name}</Text>
        <Text>Currently {carData.in_service ? "driving" : "not driving"} and is {carData.state}</Text>
        <TouchableHighlight onPress={() => getCharge()}>
          <View style={styles.button}>
            <Text>See Charge Details</Text>
          </View>
        </TouchableHighlight>
        <View style={{display: displayCharge, marginBottom: 25}}>
          <Text style={styles.chargeDetails}>Battery Percentage: <Text style={styles.information}>{chargeData.battery_level}%</Text> </Text>
          <Text style={styles.chargeDetails}>Battery Range: <Text style={styles.information}>{chargeData.battery_range}mi</Text> </Text>
          <Text style={styles.chargeDetails}>Charge Amps: <Text style={styles.information}>{chargeData.charge_amps} A</Text> </Text>
          <Text style={styles.chargeDetails}>Charge Miles Added This Charge: <Text style={styles.information}>{chargeData.charge_miles_added_rated}mi</Text> </Text>
          <Text style={styles.chargeDetails}>Charge Port Cold Weather Mode: <Text style={styles.information}>{chargeData.charge_port_cold_weather_mode ? 'True' : 'False'}</Text> </Text>
          <Text style={styles.chargeDetails}>Charge Port Latch: <Text style={styles.information}>{chargeData.charge_port_latch}</Text> </Text>
          <Text style={styles.chargeDetails}>Current Charging Rate: <Text style={styles.information}>{chargeData.charge_rate} A</Text> </Text>
          <Text style={styles.chargeDetails}>Current Charging State: <Text style={styles.information}>{chargeData.charging_state}</Text> </Text>
          <Text style={styles.chargeDetails}>Supercharger connected: <Text style={styles.information}>{chargeData.fast_charger_present ? 'True' : 'False'}</Text> </Text>
          <Text style={styles.chargeDetails}>Time Until Fully Charged: <Text style={styles.information}>{chargeData.minutes_to_full_charge} minutes</Text> </Text>
          <Text style={styles.chargeDetails}>Scheduled Charging Mode: <Text style={styles.information}>{chargeData.scheduled_charging_mode}</Text> </Text>
        </View>
      </View>
    )
  } else {
    basicDetails = <View><Text>Loading Data...</Text></View>
  }

  console.log('Car State: ' + awake);

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => wakeCarUp()}>
        <View style={styles.button}>
          <Text>Wake up this car</Text>
        </View>
      </TouchableHighlight>
      {basicDetails}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  chargeDetails: {
    display: 'block',
    fontSize: 18
  },
  button: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: "#DDDDDD",
    marginBottom: 15,
    marginTop: 15
  },
  information: {
    fontWeight: 'bold'
  }
  });
