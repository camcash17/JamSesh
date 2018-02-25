import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ListView, Button, Alert, TouchableHighlight } from 'react-native';
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
      favData: this.props.navigation.state.params.favData,
      id: this.props.navigation.state.params.id,
      favArtist: this.props.navigation.state.params.favArtist,
      accessToken: this.props.navigation.state.params.accessToken
    }
  }

  componentDidMount() {
    axios.get(`http://api.songkick.com/api/3.0/artists/${this.state.currentId}/calendar.json?apikey=Z53fjrXd6L2Z6XVV`)
      .then((response) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (response.data.resultsPage.results.event) {
          this.setState({
            isLoading: false,
            crudChange: false,
            dataSource: ds.cloneWithRows(response.data.resultsPage.results.event),
          }, function() {
            console.log('currentId is ' + this.state.currentId);
            console.log('on tour?', this.state.onTour);
            console.log('id props', this.state.id);
            console.log('fav Data', this.state.favData);
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

  addArtist(name, id, tour) {
    Alert.alert(`${name} has been added!`)
    axios.post(`http://localhost:3000/api/artists`, {
      name: name,
      artistId: id,
      onTour: tour
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
    axios.delete(`http://localhost:3000/api/artists/${id}`)
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
          onPress={() => this.addArtist(this.state.currentName, this.state.currentId, this.state.onTour)}
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
          <Text style={{fontSize: 30, textDecorationLine: 'underline', paddingBottom: 20, opacity: 0.8}}>Upcoming Events for {this.props.currentName}</Text>
            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                  <View style={styles.buttonContainer}>
                    <Text style = {{fontSize: 20, textAlign: 'center'}}>{rowData.displayName}</Text>
                    <Text style = {{fontSize: 15}}>{rowData.type}</Text>
                    <Text style = {{fontSize: 14}}>{moment(rowData.start.date).format("LL")}</Text>
                    <Button
                      onPress={() => navigate('Maps', {lat: rowData.venue.lat, long: rowData.venue.lng, name: rowData.venue.displayName})}
                      title={rowData.venue.displayName}
                      color="darkblue"
                    />
                    <Text style = {{fontSize: 15}}>{rowData.location.city}</Text>
                  </View>
                }
              />
            </View>
          </View>
        : <Text style = {{fontSize: 20}}>No upcoming Jam Seshes :(</Text> }
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
    paddingTop: 40,
    paddingBottom: 40,
    padding: 20
  },
  buttonContainer: {
    flex: 1,
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

export default Events;
