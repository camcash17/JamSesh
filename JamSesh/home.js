import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView, ActivityIndicator, ListView, TextInput, Keyboard, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import axios from 'axios';
import Greeting from './Greeting';
import Events from './Events';
import Search from './Search';
import Map from './Map';

const ACCESS_TOKEN = 'access_token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentId: false,
      currentName: false,
      search: '',
      searchResults: false,
      accessToken: this.props.navigation.state.params.accessToken,
      name: this.props.navigation.state.params.name
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/api/artists`)
    // .then((response) => response.json())
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data),
        favData: response.data,
      }, function() {
        console.log('Access Token', this.state.accessToken);
        console.log('data:', response.data);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onChange(event) {
    this.setState({
      search: event.search
    })
  }

  _keyboardDidHide() {
    Keyboard.dismiss()
 }

  onLogout() {
    this.deleteToken();
  }

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN)
      const { navigate } = this.props.navigation
      navigate('Root')
    } catch(error) {
      console.log("something went wrong");
    }
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    };

    let pic = {
      uri: 'http://weclipart.com/gimg/BC65428255B6D625/4e0j4u356q2hq5gcg7sglvwuk.png'
    };

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container} onPress={this._keyboardDidHide}>
        <TouchableHighlight style={styles.button} onPress={this.onLogout.bind(this)}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
        <TouchableOpacity>
          <View style={{paddingTop: 50, paddingBottom: 50, margin: 0}}>
            <TextInput
              style={{height: 40, width: 300, fontSize: 40, color: 'white', margin: 0}}
              placeholder="     Search Artist"
              onChangeText={(search) =>  { this.onChange({search})}}
              onSubmitEditing={() => navigate('Search', {search: this.state.search, searchResults: this.state.searchResults, favData: this.state.favData, accessToken: this.state.accessToken})}
              value={this.state.search}
              returnKeyType='search'
              clearButtonMode="while-editing"
              // autoFocus={true}
            />
          </View>
        </TouchableOpacity>
        {/* <Image source={pic} style={{width: 300, height: 75}}/> */}
        {/* <Greeting name={this.state.name} /> */}
        <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 30, textDecorationLine: 'underline', color: 'black', paddingBottom: 20, opacity: 0.8}}>Favorite Artists</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.buttonContainer}>
                {/* <Button style={{fontSize: 50}}
                  onPress={() => navigate('Events', {currentId: rowData.artistId, currentName: rowData.name, favData: this.state.favData, onTour: rowData.onTour, id: rowData.id, favArtist: this.state.favArtist, back: this.back, mapVenue: this.mapVenue, accessToken: this.state.accessToken})}
                  title={rowData.name}
                  color="white"
                /> */}
                <TouchableHighlight
                  style={styles.artistButton}
                  onPress={() => navigate('Events', {currentId: rowData.artistId, currentName: rowData.name, favData: this.state.favData, onTour: rowData.onTour, id: rowData.id, favArtist: this.state.favArtist, accessToken: this.state.accessToken})}>
                  <Text style={styles.buttonText}>
                    {rowData.name}
                  </Text>
                </TouchableHighlight>
              </View>
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17a2b4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    // opacity: 0.9
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  button: {
    height: 50,
    backgroundColor: '#a75c5c',
    alignSelf: 'stretch',
    justifyContent: 'center',
    opacity: 0.9
  },
  artistButton: {
    backgroundColor: '#24434f',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 80,
    padding: 20
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
