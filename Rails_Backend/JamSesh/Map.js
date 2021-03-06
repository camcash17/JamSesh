import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, Text, Button, TouchableOpacity, Image, Linking } from 'react-native';
import { MapView, Marker, Callout } from 'expo';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class MapExample extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 39.739236,
        longitude: -104.990251,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }

  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: '#353360',
      height: 85,
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 25
    },
    headerRight: (
      <TouchableOpacity
        style={{
          height: 45,
          width: 45,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 2,
            height: 2,
          }
        }}
        >
          <Image style={{width: 40, height: 40}} source={require('./sk-badge-white.png')} onPress={() => Linking.openURL('https://www.songkick.com/')} />
        </TouchableOpacity>)
  }

  componentDidMount() {
    console.log('In Maps Component');
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View>
        <MapView
          style={ styles.container }
          showsUserLocation={ true }
          region={ this.state.region }
        >
          <MapView.Marker
            coordinate={ this.state.region }
          >
            <MapView.Callout>
              <View>
                <Text>{this.props.navigation.state.params.name}</Text>
                <Text style = {{color: 'blue', textAlign: 'center'}} onPress={() => Linking.openURL(`${this.props.navigation.state.params.uri}`)}>Venue Details</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
