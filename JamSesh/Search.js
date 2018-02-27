import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator, ListView, Button, Alert, TextInput, TouchableHighlight, TouchableOpacity, Image, ScrollView } from 'react-native';
import Events from './Events';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: this.props.navigation.state.params.search,
      searchResults: this.props.navigation.state.params.searchResults,
      favData: this.props.navigation.state.params.favData,
      accessToken: this.props.navigation.state.params.accessToken,
      userId: this.props.navigation.state.params.userId
    }
  }

  static navigationOptions = {
    title: 'Search',
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
    let that = this;
    setTimeout(function(){that.setState({timePassed: true})}, 3000);
    axios.get(`http://api.songkick.com/api/3.0/search/artists.json?apikey=Z53fjrXd6L2Z6XVV&query=${this.state.search}`)
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data.resultsPage.results.artist),
      }, function() {
        console.log(response.data.resultsPage.results.artist[0].displayName);
        console.log('search', this.state.search);
        console.log(response.data.resultsPage.results.artist[0].onTourUntil);
        console.log('fav Data:', this.state.favData);
        console.log('userId', this.state.userId);
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  searchButton(id, name, tour) {
    this.setState({
      currentId: id,
      currentName: name,
      onTour: tour,
    })
  }

  render() {
    const { navigate } = this.props.navigation
    if (this.state.isLoading) {
      return (
        <View style={styles.errorContainer}>
          <ActivityIndicator />
          {this.state.timePassed ?
          <View>
            <Text style={{color: 'white', fontSize: 15}}>Please go back & search an existing artist...</Text>
          </View>
          : <Text></Text> }
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={{fontSize: 30, color: '#b89cbf', opacity: 0.8, textAlign: 'center'}}>Artist Search</Text>
        <View style={{flex: 1, paddingTop: 20}}>
          <ListView style={{borderTopColor: 'black', borderTopWidth: 1}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.artistButton}
                  onPress={() => navigate('Events', {currentId: rowData.id, currentName: rowData.displayName, onTour: rowData.onTourUntil, uri: rowData.uri, userId: this.state.userId, favData: this.state.favData, accessToken: this.state.accessToken})}>
                  <Text style={styles.buttonText}>
                    {rowData.displayName}
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
    paddingTop: 40,
    paddingBottom: 40,
    padding: 20
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#22355e',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  artistButton: {
    backgroundColor: '#473863',
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

export default Search;
