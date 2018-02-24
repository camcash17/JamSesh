// import React from 'react';
// import {
//   AppRegistry,
//   // Component,
//   // StyleSheet,
//   // Text,
//   // View,
//   // Button,
// } from 'react-native';

import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './Home';

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
      headerLeft: null
    }
  },
}, {
  initialRouteName: 'Root',
})

// class nativeAuth extends React.Component {
//
//   // renderScene(route, navigator) {
//   //   if(route.name == 'root') {
//   //     return <Root navigator={navigator} />
//   //   }
//   //   if(route.name == 'register') {
//   //     return <register navigator={navigator} />
//   //   }
//   //   if(route.name == 'login') {
//   //     return <Login navigator={navigator} />
//   //   }
//   //   if(route.name == 'home') {
//   //     return <Home navigator={navigator} {...route.passProps} />
//   //   }
//   // }
//
//   render() {
//     const { navigate } = this.props.navigation
//     return (
//       <View style={styles.container}>
//         {/* <Navigator
//           initialRoute={{name: 'root'}}
//           renderScene={this.renderScene.bind(this)}
//         /> */}
//         <Button
//           onPress={() => navigate('Register')}
//           title="Register"
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     marginTop: 50
//   },
// });
//
// export default nativeAuth;
// AppRegistry.registerComponent('Stack', () => Stack);
