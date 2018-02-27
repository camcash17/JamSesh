import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Register from './register';
import Login from './login';

class nativeAuth extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Register />
        {/* <Text>Hi</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default nativeAuth;
// AppRegistry.registerComponent('nativeAuth', () => nativeAuth);
