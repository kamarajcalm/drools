import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../screens/Orders';
import History from '../screens/History';
const Stack = createStackNavigator();
export default class HistoryStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}
