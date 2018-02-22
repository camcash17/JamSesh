import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ListView, Button, Alert } from 'react-native';
import axios from 'axios';
import Map from './Map';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    axios.get(`http://api.songkick.com/api/3.0/artists/${this.props.currentId}/calendar.json?apikey=Z53fjrXd6L2Z6XVV`)
      // .then((response) => response.json())
      .then((response) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (response.data.resultsPage.results.event) {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(response.data.resultsPage.results.event),
          }, function() {
            // do something with new state
            // console.log(responseJson.resultsPage.results.event[0].displayName);
            console.log('currentId is ' + this.props.currentId);
            console.log('on tour?', this.props.onTour);
            console.log('id props', this.props.id);
            // console.log('data source', this.state.dataSource);
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(response.data.resultsPage.results),
          }, function() {
            // do something with new state
            // console.log(responseJson.resultsPage.results.event[0].displayName);
            console.log('currentId is ' + this.props.currentId);
            console.log('on tour?', this.props.onTour);
            // console.log('data source', this.state.dataSource);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addArtist(name, id, tour) {
    Alert.alert(`${name} has been added!`)
    axios.post(`http://173.2.2.152:3000/api/artists`, {
      name: name,
      artistId: id,
      onTour: tour
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({
      currentId: false,
      currentName: false,
      search: '',
      searchResults: false,
      favs: true
    })
  }

  destroyArtist(id, name) {
    Alert.alert(`${name} has been removed!`)
    // axios.delete(`http://173.2.2.152:3000/api/artists/${id}`, {
    //   id: id
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    axios.delete(`http://173.2.2.152:3000/api/artists/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    // axios({
    //   method: 'DELETE',
    //   url: `http://173.2.2.152:3000/api/artists/${id}`,
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }

  checkFav() {
    let cleanData = this.props.dataSource.filter(el => {
      return (
        el.name === this.props.currentName
      )
    })
    if (cleanData.length) {
      return (
        <Button
          onPress={() => this.destroyArtist(this.props.id, this.props.currentName)}
          title="Remove from Favs List"
        />
      )
    } else {
      return (
        <Button
          onPress={() => this.addArtist(this.props.currentName, this.props.currentId, this.props.onTour)}
          title="Add to Favs List"
        />
      )
    }
  }

  mapVenue(name, id, lat, long) {
    Alert.alert(`Find location for ${name}!`)
    this.setState({
      venue: name,
      venueId: id,
      lat: lat,
      long: long
    })
    console.log(name);
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    };

    if (this.state.venue) {
      return (
        <Map lat={this.state.lat} long={this.state.long} back={this.props.back}/>
      )
    } else {
      return (
        <View style={styles.container}>
          <Button
            onPress= {this.props.back}
            title="Home"
          />
          {this.props.favArtist ?
          <Button
            onPress={() => this.destroyArtist(this.props.id, this.props.currentName)}
            title="Remove from Favs List"
          />
          : this.checkFav()
           }
          {this.props.onTour ?
          <View style={styles.container}>
            <Text>Upcoming Events for {this.props.currentName}</Text>
              <View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) =>
                    <View style={styles.buttonContainer}>
                      <Text>{rowData.displayName}</Text>
                      <Text>{rowData.type}</Text>
                      <Text>{rowData.start.date}</Text>
                      <Button
                        onPress={() => this.mapVenue(rowData.venue.displayName, rowData.venue.id, rowData.venue.lat, rowData.venue.lng)}
                        title={rowData.venue.displayName}
                      />
                      <Text>{rowData.location.city}</Text>
                    </View>
                  }
                />
              </View>
            </View>
          : <Text>No upcoming Jam Seshes :(</Text> }
        </View>
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
    margin: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
    // padding: 50
  }
});

export default Events;
