import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import axios from 'axios';

export default function Home() {
    const [carData, setCarData] = useState([]);
    
    const baseURL = 'http://localhost:8080'; // DEPLOYMENT TODO: Change this to the backend's host

    useEffect(() => {
      axios.get(baseURL + '/vehicles').then(response => {
        if (response.status === 200) {
          setCarData(response.data.response)
        }
      }).catch(error => {
        console.log("ERROR!!! ", error);
      })
    }, [])

    let content;
    if (carData.length > 0) {
      content = carData.map((car, id) => 
        <View style={styles.card} key={id}>
          <Text>{car.display_name}</Text>
          <Text>Currently {car.in_service ? 'in use' : 'not in use' }</Text>
          <Link to={'/vehicle/' + car.id}>
            <Text style={styles.link}>More Details</Text>
          </Link>
        </View>
      )
    } else {
      content = <View><Text>Loading Cars...</Text></View>
    }

  return (
    <View style={styles.container}>
      <Text>Here's a list of your vehicles:</Text>
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
    card: {
      borderRadius: 15,
      backgroundColor: 'whitesmoke',
      elevation: 5,
      padding: 10,
      marginTop: 10,
      textAlign: 'center'
    },
    link: {
      backgroundColor: 'gray',
      borderRadius: 10,
      color: 'black',
      padding: 5
    }
  });
