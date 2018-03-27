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
    bananaX: 0,
    points: 0,
    bananaSide: "Right",
    bananaY: 10, // need to work on speed
    gameOver: false,
    monkeyY: 10
  }




  moveMonkey = (evt) => {
    this.setState({
      monkeyX: evt.nativeEvent.locationX
    });
    Animated.spring(
      this.state.moveMonkeyValue, {
        toValue: this.state.monkeyX,
        tension: 75
      }
    ).start();
  }




  componentDidMount() {
    console.log("mounting comp")
    setInterval(()=>{
      this.checkBanana()
      if(this.state.gameOver === false){
        this.advanceAnimation();
      }else{
        this.gameOver()
      }
    },1000)
  }

  advanceAnimation() {
    this.setState({
      bananaY: this.state.bananaY + 50
    });
    Animated.spring(
      this.state.movebananaValue, {
        toValue: this.state.bananaY,
        tension: 75
      }
    ).start();
  }


  checkBanana() {
    if (this.checkCollision()){
      console.log("add points and create new banana")

    }else if (this.checkBananaHitGround()) {
      console.log("game over ")
    }


    // if the banana hits the ground set the state to game over
    // if not create additional banana
  }

  checkCollision() {
    if(Math.abs(this.state.monkeyX - this.state.bananaX) < 5){
      if(Math.abs(this.state.monkeyY === this.state.bananaY) < 5){
        return true;
      }
    }
    return false;
  }


  checkBananaHitGround(){
    if(this.state.bananaY < Dimensions.get("window").height){
      return true;
    }
    return false;
  }

  fallingBananas() {

    this.state.movebananaValue.setValue(-100);
    let distance = Dimensions.get("window").height

    let bananaX = Math.floor(Math.random() * Dimensions.get("window").width) + 1;
    this.setState({
      bananaX: bananaX
    })

    let getNew;

    getNew = setInterval( () => {
      if (this.state.movebananaValue._value > distance - 280 && this.state.movebananaValue._value < distance - 180 && this.state.monkeySide == this.state.bananaSide){
        clearInterval(getNew);
        this.setState({
          gameOver: true
        })
        this.gameOver();
      }
    },25)


    Animated.timing(
      this.state.movebananaValue,
      {
        duration: this.state.bananaSpeed
      }
    ).start(e =>{
      console.log(this.state);
      if(e.finished && this.state.gameOver == false){
        clearInterval(getNew)
        this.setState({
          points: ++this.state.points
        })
        this.fallingBananas();
      }

    })


    setInterval( () => {
      this.setState({
        bananaY: this.state.bananaSpeed - 50
      })
    }, 1000)



  }







  gameOver(){
    Alert.alert("You lost!")
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={this.moveMonkey}>

      <SafeAreaView style={{flex: 1}}>

      <ImageBackground source={require('./assets/banana_tree_31.png')}
      style = {{flex: 1,position: "relative"}}>

      <Animated.Image source={require("./assets/right.png")}
      style = {{
        height: 75,
        width: 75,
        position: "absolute",
        zIndex: 1,
        bottom: this.state.monkeyY,
        resizeMode: "stretch",
        transform: [{
          translateX: this.state.moveMonkeyValue
        }]
      }}>
      </Animated.Image>

      <Banana bananaStartposX={this.state.bananaStartposX}
      movebananaValue={this.state.movebananaValue}/>

      <View style={{flex: 1, alignItems: "center", marginTop: 10}}>
      <View style={styles.points}>
      <Text style={{fontWeight: "bold", fontSize: 30}}>
      {this.state.points}
      <Image source={require('./assets/banana.png')} style={{width: 35, height: 25}}/>
      </Text>
      </View>
      </View>

      </ImageBackground>

      </SafeAreaView>

      </TouchableWithoutFeedback>
    );
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
    alignItems: 'flex-end',
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





//
//



// <View style={styles.controls}>
// <Text style={styles.left} onPress={()=>this.moveMonkey("left")}></Text>
// <Text style={styles.right}onPress={()=>this.moveMonkey("right")}></Text>
// </View>
