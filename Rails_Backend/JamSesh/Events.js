import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ListView, Button, Alert, TouchableHighlight, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Map from './Map';
import App from './App';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentId: this.props.navigation.state.params.currentId,
      currentName: this.props.navigation.state.params.currentName,
      onTour: this.props.navigation.state.params.onTour,
      uri: this.props.navigation.state.params.uri,
      favData: this.props.navigation.state.params.favData,
      id: this.props.navigation.state.params.id,
      favArtist: this.props.navigation.state.params.favArtist,
      accessToken: this.props.navigation.state.params.accessToken,
      userId: this.props.navigation.state.params.userId
    }
  }

  static navigationOptions = {
    title: 'Events',
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
    axios.get(`http://api.songkick.com/api/3.0/artists/${this.state.currentId}/calendar.json?apikey=Z53fjrXd6L2Z6XVV`)
      .then((response) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (response.data.resultsPage.results.event) {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(response.data.resultsPage.results.event),
          }, function() {
            console.log('currentId is ' + this.state.currentId);
            console.log('on tour?', this.state.onTour);
            console.log('id props', this.state.id);
            console.log('fav Data', this.state.favData);
            console.log('URI', this.state.uri);
            console.log('userId', this.state.userId);
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(response.data.resultsPage.results),
          }, function() {
            console.log('currentId is ' + this.state.currentId);
            console.log('on tour?', this.state.onTour);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  alertTrigger() {
    Alert.alert(
      'Alert Title',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  addArtist(name, id, tour, uri, userId) {
    Alert.alert(`${name} has been added!`)
    axios.post(`http://173.2.3.195:3000/api/artists`, {
    // axios.post(`http://192.168.0.12:3000/api/artists`, {
      name: name,
      artistId: id,
      onTour: tour,
      uri: uri,
      userId: userId
    })
    .then(function (response) {
      console.log(response);
    })
    .then(() => {
      const { navigate } = this.props.navigation
      navigate('Home', {accessToken: this.state.accessToken})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  destroyArtist(id, name) {
    Alert.alert(`${name} has been removed!`)
    axios.delete(`http://173.2.3.195:3000/api/artists/${id}`)
    // axios.delete(`http://192.168.0.12:3000/api/artists/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .then(() => {
      const { navigate } = this.props.navigation
      navigate('Home', {accessToken: this.state.accessToken})
    })
  }


  checkFav() {
    let cleanData = this.state.favData.filter(el => {
      return (
        el.name === this.state.currentName
      )
    })
    if (cleanData.length) {
      return (
        <Button
          onPress={() => this.destroyArtist(this.state.id, this.state.currentName)}
          title="Remove from Favorites"
          color="red"
        />
      )
    } else {
      return (
        <Button
          onPress={() => this.addArtist(this.state.currentName, this.state.currentId, this.state.onTour, this.state.uri, this.state.userId)}
          title="Add to Favorites"
          color="green"
        />
      )
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
      <View style={styles.container}>
        <ScrollView>
        {this.props.favArtist ?
        <Button
          onPress={() => this.destroyArtist(this.state.id, this.state.currentName)}
          title="Remove from Favorites"
          color="red"
        />
        : this.checkFav()
         }
        {this.state.onTour ?
        <View style={styles.container}>
          <Text style={{fontSize: 25, marginTop: 30, marginBottom: -20, textAlign: 'center', color: '#b89cbf', paddingBottom: 20, opacity: 0.8, }}>Upcoming Events for</Text>
          <Text style={{fontSize: 30, textAlign: 'center', color: '#b89cbf', paddingBottom: 20, opacity: 0.8, }} onPress={() => Linking.openURL(`${this.state.uri}`)}>{this.state.currentName}</Text>
            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                  <View style={styles.buttonContainer}>
                    <Text style = {{fontSize: 20, textAlign: 'center', color: 'white'}}>{rowData.displayName}</Text>
                    <Text style = {{fontSize: 15, color: 'white', textAlign: 'center', paddingTop: 10}}>{rowData.type}</Text>
                    <Button
                      onPress={() => navigate('Maps', {lat: rowData.venue.lat, long: rowData.venue.lng, name: rowData.venue.displayName, uri: rowData.venue.uri })}
                      title={rowData.venue.displayName}
                      color="#ab5bbf"
                    />
                    <Text style = {{fontSize: 15, color: '#b89cbf', textAlign: 'center', paddingBottom: 10}} onPress={() => Linking.openURL(`${rowData.venue.metroArea.uri}`)}>{rowData.location.city}</Text>
                    <Text style = {{fontSize: 14, color: '#825d8c', textAlign: 'center', paddingBottom: 10}}>{moment(rowData.start.date).format("LL")}</Text>
                    <Text style = {{fontSize: 15, textAlign: 'center', color: '#2e72e8', fontWeight: 'bold'}} onPress={() => Linking.openURL(`${rowData.uri}`)}>Find Tickets</Text>
                  </View>
                }
              />
            </View>
          </View>
        : <Text style = {{fontSize: 20, color: '#b89cbf'}}>No upcoming Jam Seshes :(</Text> }
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
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderTopColor: 'black',
    borderTopWidth: 1
  }
});

export default Events;
