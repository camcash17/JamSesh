import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator, ListView, Button, Alert, TextInput } from 'react-native';
import Events from './Events';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get(`http://api.songkick.com/api/3.0/search/artists.json?apikey=Z53fjrXd6L2Z6XVV&query=${this.props.search}`)
    // .then((response) => response.json())
    .then((response) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data.resultsPage.results.artist),
      }, function() {
        console.log(response.data.resultsPage.results.artist[0].displayName);
        console.log('search', this.props.search);
        console.log(response.data.resultsPage.results.artist[0].onTourUntil);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  searchButton(id, name, tour) {
    Alert.alert(`You chose ${name}!`)
    this.setState({
      currentId: id,
      currentName: name,
      onTour: tour,

    })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    };

    return (

      <View style={styles.container}>
        {this.state.currentId ? <Events currentId={this.state.currentId} currentName={this.state.currentName} onTour={this.state.onTour} back={this.props.back}/> :
        <View style={styles.container}>
          <Button
            onPress={this.props.back}
            title="Home"
          />
          <Text>Artist Search</Text>
          <View style={{flex: 1, paddingTop: 20}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => this.searchButton(rowData.id, rowData.displayName, rowData.onTourUntil)}
                    title={rowData.displayName}
                  />
                </View>
              }
            />
          </View>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  buttonContainer: {
    margin: 20
  }
});

export default Search;
