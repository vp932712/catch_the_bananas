import React, { Component } from "react"
import { Alert,StyleSheet, Text, View, Dimensions, Image, SafeAreaView, Animated, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';


class Banana extends Component {
  render() {
    return (
      <Animated.Image source={require("./assets/banana.png")}
      style={{height:50, width:50, position:"absolute", resizeMode:"stretch", left: this.props.bananaStartposX, transform: [{translateY: this.props.movebananaValue}]}}>
      </Animated.Image>
    )
  }
}


export default Banana;
