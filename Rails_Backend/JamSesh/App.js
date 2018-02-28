import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity, Text, Image, Linking } from 'react-native';

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './home';
import Events from './Events';
import Maps from './Map';
import Search from './Search';

export default Stack = StackNavigator({
  Root: {
    screen: Root,
    navigationOptions: {
      headerLeft: null
    }
  },
  Register: { screen: Register },
  Login: { screen: Login },
  Home: {
    screen: Home,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      title: 'JamSesh',
      headerStyle: {
        backgroundColor: '#353360',
        height: 85,
      },
      headerRight: (
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.songkick.com/')}
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
            <Image style={{width: 40, height: 40}} source={require('./sk-badge-white.png')} />
          </TouchableOpacity>),
      headerTitleStyle: {
        color: 'white',
        fontSize: 25
      },
    }
  },
  Search: { screen: Search },
  Events: { screen: Events },
  Maps: { screen: Maps },
}, {
  initialRouteName: 'Root',
})
