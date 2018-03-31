import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import Banana from "./Banana"

export default class App extends React.Component {

  state = {
    moveMonkeyValue: new Animated.Value(40),
    monkeyX: 185,
    movebananaValue: new Animated.Value(50),
    bananaX: 10,
    points: 0,
    bananaSide: "Right",
    bananaY: 10,
    gameOver: false,
    monkeyY: Dimensions.get("window").height - 150
  }

  moveMonkey = (evt) => {
    this.setState({monkeyX: evt.nativeEvent.locationX});
    Animated.spring(this.state.moveMonkeyValue, {
      toValue: this.state.monkeyX,
      tension: 75
    }).start();
  }

  componentDidMount() {
    let refreshIntervalId = setInterval(() => {
      this.checkBanana()
      if (this.state.gameOver === false) {
        this.advanceAnimation();
      } else {
        this.gameOver()
        clearInterval(refreshIntervalId);
      }
    }, 1000)
  }

  firstBanana() {}
  advanceAnimation() {
    this.setState({
      bananaY: this.state.bananaY + 100
    });
    Animated.timing(this.state.movebananaValue, {
      toValue: this.state.bananaY,
      duration: 1000
    }).start();
  }

  checkBanana() {
    if (this.checkCollision()) {
      this.addPoints()
      this.resetBanana()
    } else if (this.checkBananaHitGround()) {
      this.gameOver();
    }
  }

  addPoints() {
    this.setState({
      points: this.state.points + 1
    })
  }

  checkCollision() {
    console.log(`monkey ${this.state.monkeyX}, `);
    console.log(`banana ${this.state.bananaX}`)

    if (Math.abs(this.state.monkeyX - this.state.bananaX) < 50) {
      if (Math.abs(this.state.monkeyY - this.state.bananaY) < 50) {
        return true;
      }
    }
    return false;
  }

  checkBananaHitGround() {
    if (this.state.bananaY > Dimensions.get("window").height) {
      return true;
    }
    return false;
  }

  resetBanana() {
    let bananaX = Math.floor(Math.random() * Dimensions.get("window").width) + 1;
    let bananaY = 10
    this.setState({bananaX: bananaX, bananaY: bananaY})
  }

  gameOver() {
    this.setState({gameOver: true})
  }

  render() {
    return (<TouchableWithoutFeedback onPress={this.moveMonkey}>

      <SafeAreaView style={{
          flex: 1
        }}>

        <ImageBackground source={require('./assets/banana_tree_31.png')} style={{
            flex: 1,
            position: "relative"
          }}>

          <Animated.Image source={require("./assets/right.png")} style={{
              height: 75,
              width: 75,
              position: "absolute",
              zIndex: 1,
              top: this.state.monkeyY,
              resizeMode: "stretch",
              transform: [
                {
                  translateX: this.state.moveMonkeyValue
                }
              ]
            }}></Animated.Image>

          <Banana bananaStartposX={this.state.bananaX} movebananaValue={this.state.movebananaValue}/>

          <View style={{
              flex: 1,
              alignItems: "center",
              marginTop: 10
            }}>
            <View style={styles.points}>
              <Text style={{
                  fontWeight: "bold",
                  fontSize: 30
                }}>
                {this.state.points}
                <Image source={require('./assets/banana.png')} style={{
                    width: 35,
                    height: 25
                  }}/>
              </Text>
              <Text style={{
                  display: this.state.gameOver
                    ? "flex"
                    : "none"
                }}>
                GAME Over
              </Text>
            </View>
          </View>

        </ImageBackground>

      </SafeAreaView>

    </TouchableWithoutFeedback>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    resizeMode: "cover"
  },
  controls: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'flex-end'
  },
  points: {
    width: 100,
    height: 50,
    backgroundColor: "brown",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
