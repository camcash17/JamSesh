import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import { MapView, Marker, Callout } from 'expo';
// import RetroMapStyles from './MapStyles/RetroMapStyles.json';
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
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  componentDidMount() {
    // setTimeout(function() {
    //   this.marker.showCallout()
    // }.bind(this), 1000);
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
            latitude: this.props.lat,
            longitude: this.props.long,
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
          // provider={ PROVIDER_GOOGLE }
          style={ styles.container }
          // customMapStyle={ RetroMapStyles }
          showsUserLocation={ true }
          region={ this.state.region }
          // onRegionChange={ region => this.setState({region}) }
          // onRegionChangeComplete={ region => this.setState({region}) }
        >
          <MapView.Marker
            coordinate={ this.state.region }
          >
            <MapView.Callout>
              <View>
                <Text>{this.props.name}</Text>
                <Button style={{top: 100}}
                  onPress= {this.props.back}
                  title="Go Back"
                />
              </View>
            </MapView.Callout>
          </MapView.Marker>
          {/* <Text style={{position: 'absolute', top: 10, borderColor: 'black', borderWidth: 0.5, borderRadius: 5, alignItems: 'center', backgroundColor: 'white'}} onPress={this.props.back}> EYYYYYYYYY SUPPPPP</Text> */}
          {/* <View>
            <Button style={{top: 100}}
              onPress= {this.props.back}
              title="Home"
            />
          </View> */}
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
