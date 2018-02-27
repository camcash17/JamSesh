import React from 'react';
import {
  Component,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends React.Component {

  componentWillMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
        console.log("Token not set");
      } else {
        this.verifyToken(accessToken);
      }
    } catch(error) {
      console.log('Something went wrong');
    }
  }

  async verifyToken(token) {
    let accessToken = token
    // session[access_token] = accessToken
    try {
      let response = await fetch('http://173.2.2.152:3000/api/verify?session%5Baccess_token%5D='+accessToken);
      // let response = await fetch('http://localhost:3000/api/verify?session%5Baccess_token%5D='+accessToken);
      let res = await response.text();
      if(response.status >= 200 && response.status < 300) {
        const { navigate } = this.props.navigation
        navigate('Home', {accessToken: accessToken})
        console.log('response:', res);
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      console.log('error response:', error);
    }
  }


  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, padding: 30}}>JamSesh</Text>
        <Text>Welcome</Text>
        <TouchableHighlight style={styles.button} onPress={() => navigate('Register')}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => navigate('Login')}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>
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

export default Root;
