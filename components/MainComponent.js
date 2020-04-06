import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import Home from './HomeComponent';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import ContactUs from './ContactComponent';
import AboutUs from './AboutUsComponent';

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home }
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff"
  })
}
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: ContactUs }
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff"
  })
}
);

const AboutUsNavigator = createStackNavigator(
  {
    AboutUs: { screen: AboutUs }
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff"
  })
}
);

const MenuNavigator = createStackNavigator(
  {
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home:
    {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
    AboutUs:
    {
      screen: AboutUsNavigator,
      navigationOptions: {
        title: 'About Us',
        drawerLabel: 'About us'
      }
    },
    Menu:
    {
      screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      },
    },
    ContactUs:
    {
      screen: ContactNavigator,
      navigationOptions: {
        title: 'Contact Us',
        drawerLabel: 'Contact us'
      }
    },
  },
  {
    drawerBackgroundColor: '#D1C4E9'
  }
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId })
  }

  render() {

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

export default Main;