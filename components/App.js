import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Routes, useParams } from 'react-router-native';
import Home from './Home';
import Vehicle from './Vehicle';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/">
            <Text style={styles.link}>Home</Text>
          </Link>
        </View>

        <Routes>
          <Route exact path="/" element={<Home />}> </Route>
          <Route path="/vehicle/:vID" element={<Vehicle testProp="21" />} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: '2em'
  }
});
