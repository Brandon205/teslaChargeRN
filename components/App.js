import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Routes } from 'react-router-native';
import Home from './Home';
import Vehicle from './Vehicle';

export default function App() {

  let vehiclePage = (props) => {
    console.log(props)
    return (
      <Vehicle vID={match.params.id} />
    )
  }

  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/">
            <Text>Home </Text>
          </Link>
          <Link to="/vehicle/1492931281739069">
            <Text>Vehicle</Text>
          </Link>
        </View>

        <Routes>
          <Route exact path="/" element={<Home />}> </Route>
          {/* <Route path="/vehicle/:id" element={vehiclePage()} /> */}
          <Route path="/vehicle/:id" render={(match) => <Vehicle vID={match.params.id} /> }> </Route>
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
