import React from 'react';
import {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  redirect(routeName, token) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: token
      }
    })
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log("something went wrong");
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch(error) {
      console.log("something went wrong");
    }
  }

  async onLoginPressed() {
    try {
      let response = await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: {
            email: this.state.email,
            password: this.state.password,
          }
        })
      });

      let res = await response.text();

      if(response.status >= 200 && response.status < 300) {
        this.setState({error: ""});
        let accessToken = res;
        this.storeToken(accessToken);
        console.log("res token:", accessToken);
        // this.redirect('home', accessToken);
        const { navigate } = this.props.navigation
        navigate('Home', {accessToken: accessToken})
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      this.removeToken();
      this.setState({error: error});
      console.log('error:', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, padding: 20}}>Login to JamSesh</Text>
        <TextInput
          onChangeText={(text) => this.setState({email: text})}
          style={styles.input} placeholder="Email"
        />
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} placeholder="Password"
          secureTextEntry={true}
        />

        <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <Text style={styles.error}>
          {this.state.error}
        </Text>
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
    </View>
  );
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

export default Login;
