import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView, ActivityIndicator, ListView, TextInput } from 'react-native';
import axios from 'axios';
import Greeting from './Greeting';
import Events from './Events';
import Search from './Search';
import Map from './Map';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentId: false,
      currentName: false,
      search: '',
      searchResults: false,
      favs: true
    }
    this.back = this.back.bind(this);
    this.onChange = this.onChange.bind(this);
    this.textInput = this.textInput.bind(this);
  }

  componentDidMount() {
    axios.get(`http://173.2.2.152:3000/api/artists`)
    // .then((response) => response.json())
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        crudChange: false,
        dataSource: ds.cloneWithRows(response.data),
        favData: response.data,
      }, function() {
        console.log('data:', response.data);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _onPressButton(artistId, name, tour, id) {
    Alert.alert(`You chose ${name}!`)
    this.setState({
      currentId: artistId,
      currentName: name,
      onTour: tour,
      id: id,
      favs: false,
      favArtist: true
    })
  }

  back() {
    this.setState({
      currentId: false,
      currentName: false,
      search: '',
      searchResults: false,
      favs: true,
      favArtist: false,
      crudChange: false
    })
    axios.get(`http://173.2.2.152:3000/api/artists`)
    // .then((response) => response.json())
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data),
      }, function() {
        console.log(response.data);
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

  textInput() {
    this.setState({
      currentId: false,
      searchResults: true,
      favs: false
    })
  }

  render() {

  if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 50}}>
        <ActivityIndicator />
      </View>
    );
  };

  let pic = {
    uri: 'http://weclipart.com/gimg/BC65428255B6D625/4e0j4u356q2hq5gcg7sglvwuk.png'
  };

    if (this.state.favs) {
      return (
        <View style={styles.container}>
          <View style={{paddingTop: 70}}>
            <TextInput
              style={{height: 40}}
              placeholder="Search Artist"
              onChangeText={(search) =>  { this.onChange({search})}}
              onSubmitEditing={this.textInput}
              value={this.state.search}
              returnKeyType='search'
              // autoFocus={true}
              clearButtonMode="while-editing"
            />
          </View>
          <Image source={pic} style={{width: 300, height: 75}}/>
          <Greeting name='Cam' />
          <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
            <Text>Your Fav Artists</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => this._onPressButton(rowData.artistId, rowData.name, rowData.onTour, rowData.id)}
                    title={rowData.name}
                  />
                </View>
              }
            />
          </View>
        </View>
      )
    } else if (this.state.searchResults) {
      return (
        <Search search={this.state.search} searchResults={this.state.searchResults} dataSource={this.state.favData} back={this.back}/>
      )
    } else if (this.state.currentId) {
      return (
        <Events currentId={this.state.currentId} currentName={this.state.currentName} onTour={this.state.onTour} id={this.state.id} favArtist={this.state.favArtist} back={this.back} mapVenue={this.mapVenue}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 70
  },
  buttonContainer: {
    margin: 20
  }
});
