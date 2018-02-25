import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

import Register from './register';
import Login from './login';
import Root from './root';
import Home from './Home';
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
      headerLeft: null
    }
  },
  Search: { screen: Search },
  Events: { screen: Events },
  Maps: { screen: Maps },
}, {
  initialRouteName: 'Root',
})
