import React, { Component } from 'react';
import { View, Text } from 'react-native';
const fontFamily = settings.fontFamily;
import settings from '../AppSettings';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersStack from '../stacks/OrdersStack';
import HistoryStack from '../stacks/HistoryStack';
import StatisticsStack from '../stacks/StatisticsStack';
import MyTabBar from '../components/MyTabBar'
import AdminTab from './AdminTab';
import DefaultScreen from '../screens/DefaultScreen';
import LoginScreen from '../Login/LoginScreen';
import CooksTab from './CooksTab';

const Stack = createStackNavigator();
 class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="DefaultScreen" component={DefaultScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AdminTab" component={AdminTab} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CookTab" component={CooksTab} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(AppNavigator);