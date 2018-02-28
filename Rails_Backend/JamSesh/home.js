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
    let matchUser = [];
    axios.get(`http://173.2.3.195:3000/api/users`)
    // axios.get(`http://192.168.0.12:3000/api/users`)
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        userData: response.data,
      }, function() {
        matchUser = this.state.userData.filter(el => {
          return (
            el.access_token === this.state.accessToken
          )
        })
        this.setState({
          userId: matchUser[0].id,
          userName: matchUser[0].name
        })
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get(`http://173.2.3.195:3000/api/artists`)
    // axios.get(`http://192.168.0.12:3000/api/artists`)
    .then((response) => {
      if (response.data.length) {
        const array = response.data.filter(artist => artist.userId == this.state.userId);
        if(array.length) {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(array),
            favData: array,
          }, function() {
            console.log('data', this.state.favData);
          });
        } else {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(array),
            favData: array,
          }, function() {
            console.log('data', this.state.favData);
          });
        }
      }
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

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container} onPress={this._keyboardDidHide}>
        <TouchableHighlight style={styles.button} onPress={this.onLogout.bind(this)}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
        <ScrollView>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <Greeting name={this.state.userName} />
          </View>
          <TouchableOpacity>
            <View style={{padding: 10, width: 300,  marginTop: 40, marginBottom: 40, backgroundColor: '#353360', borderRadius: .5}}>
              <TextInput
                style={{fontSize: 40, color: 'white', opacity: .8}}
                placeholder="Search Artist..."
                placeholderTextColor="#5a4769"
                onChangeText={(search) =>  { this.onChange({search})}}
                onSubmitEditing={() => navigate('Search', {search: this.state.search, searchResults: this.state.searchResults, userId: this.state.userId, favData: this.state.favData, accessToken: this.state.accessToken})}
                value={this.state.search}
                returnKeyType="search"
                clearButtonMode="while-editing"
                spellCheck={false}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 1, paddingTop: 10, paddingBottom: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: '#b89cbf', paddingBottom: 20, opacity: .8}}>Favorite Artists</Text>
            <ListView style={{borderTopColor: 'black', borderTopWidth: 1}}
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.artistButton}
                    onPress={() => navigate('Events', {currentId: rowData.artistId, currentName: rowData.name, favData: this.state.favData, onTour: rowData.onTour, uri: rowData.uri, userId: rowData.userId, id: rowData.id, favArtist: this.state.favArtist, accessToken: this.state.accessToken})}>
                    <Text style={styles.buttonText}>
                      {rowData.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22355e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  button: {
    height: 50,
    backgroundColor: '#473863',
    alignSelf: 'stretch',
    justifyContent: 'center',
    opacity: 0.9
  },
  artistButton: {
    backgroundColor: '#473863',
    // alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 80,
    padding: 20
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
