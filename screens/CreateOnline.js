import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import orders from '../data/orders'
import { FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

class CreateOnline extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{flex:1}}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(CreateOnline);