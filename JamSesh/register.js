import React from 'react';
import {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Navigator,
  Text,
  View,
  ScrollView
} from 'react-native';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
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

  async onRegisterPressed() {
    try {
      let response = await fetch(`http://173.2.2.152:3000/api/users`, {
      // let response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      });

      let res = await response.text();

      if(response.status >= 200 && response.status < 300) {
        console.log("res success is:", res);
        let accessToken = res;
        const { navigate } = this.props.navigation
        navigate('Home', {accessToken: accessToken})
      } else {
        let errors = res;
        throw errors;
      }
    } catch(errors) {
      console.log('catch errors:', errors);

      let formErrors = JSON.parse(errors);
      let errorsArray = [];
      for(let key in formErrors) {
        if(formErrors[key].length > 1) {
          formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
        } else {
          errorsArray.push(`${key} ${formErrors[key]}`)
        }
      }
      this.setState({errors: errorsArray});
    }
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill} style={styles.container} >
        <ScrollView>
          <Text style={{fontSize: 20, padding: 20, textAlign: 'center'}}>Register for JamSesh</Text>
          <TextInput
            onChangeText={(val) => this.setState({email: val})}
            style={styles.input} placeholder="Email"
          />
          <TextInput
            onChangeText={(val) => this.setState({name: val})}
            style={styles.input} placeholder="Name"
          />
          <TextInput
            onChangeText={(val) => this.setState({password: val})}
            style={styles.input} placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={(val) => this.setState({password_confirmation: val})}
            style={styles.input} placeholder="Confirm Password"
            secureTextEntry={true}
          />

          <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableHighlight>

          <Errors errors={this.state.errors} />
        </ScrollView>
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

export default Register;
