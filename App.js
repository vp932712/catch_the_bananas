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
    monkeySide: "left",
    movebananaValue: new Animated.Value(50),
    bananaStartposX: 0,
    points: 0,
    bananaSide: "Right",
    bananaSpeed: 4200, // need to work on speed
    gameOver: false
  }




  moveMonkey = (evt) => {
    if (evt.nativeEvent.locationX > 185) {
      this.setState({
        monkeySide: "left"
      });
      Animated.spring(
        this.state.moveMonkeyValue, {
          toValue: Dimensions.get("window").width - 140,
          tension: 75
        }
      ).start();
    } else if (evt.nativeEvent.locationX < 184) {
      this.setState({
        monkeySide: "right"
      });
      Animated.spring(
        this.state.moveMonkeyValue, {
          toValue: 40,
          tension: 75
        }
      ).start();
    }
  }




  componentDidMount() {
    this.fallingBananas();
  }


  fallingBananas() {

    this.state.movebananaValue.setValue(-100);
    let distance = Dimensions.get("window").height

    let t = Math.floor(Math.random() * 2) + 1;

    if (t == 2) {
      t = 40;
      this.setState({
        bananaSide: "left"
      })
    } else {
      t = Dimensions.get("window").width - 140;
      this.setState({
        bananaSide: "right"
      })
    }
    this.setState({
      bananaStartposX: t
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




    setInterval( () => {
      this.setState({
        bananaSpeed: this.state.bananaSpeed - 50
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
                                bottom: 10,
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
// Animated.timing(
//     this.state.movebananaValue,
//     {
//       duration: this.state.bananaSpeed
//     }
// ).start(e =>{
//   if(e.finished && this.state.gameOver == false){
//       clearInterval(getNew)
//       this.setState({
//          points: ++this.state.points
//       })
//       this.fallingBananas();
//   }
//
// })
// }


// <View style={styles.controls}>
// <Text style={styles.left} onPress={()=>this.moveMonkey("left")}></Text>
// <Text style={styles.right}onPress={()=>this.moveMonkey("right")}></Text>
// </View>
