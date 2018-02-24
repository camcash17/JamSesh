import React from 'react';
import {
  Component,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  Text,
  View,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.props.accessToken
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome User</Text>
        <Text>Your new token is {this.state.accessToken}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    width: 300,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
})

export default Home;
