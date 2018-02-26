import React, { Component } from 'react';
import { Text } from 'react-native';

class Greeting extends Component {

  render() {
    return (
      <Text style={{paddingTop: 20, paddingBottom: 0, fontSize: 20, alignItems: 'center', color: 'white'}}>Hello {this.props.name}!</Text>
    );
  }
}

export default Greeting;
