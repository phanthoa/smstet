import React, { Component, } from 'react'
import { View,
        Text,
        Image,
        StyleSheet,
       } from 'react-native'
import {Actions} from 'react-native-router-flux';
//import codePush from "react-native-code-push";
class Splash extends Component {

  static propTypes = {}

  static defaultProps = {}

  componentWillMount()
  {
  //  codePush.sync({ updateDialog: true,installMode : codePush.InstallMode.IMMEDIATE })
    setTimeout(() => {
         Actions.smsview();
    }, 300);
  //  codePush.sync({ updateDialog: false, installMode: codePush.InstallMode.IMMEDIATE })
    
  }
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return (
        <View style={{backgroundColor:'blue', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: 'black'}}>SMSTET2017</Text>
          <View style ={{height: 1, width: 280 , marginTop: 100,backgroundColor: 'red'}}/>
          <Text style={{fontSize: 20, color: 'gray', marginTop:20}}>Phan Van Thoa</Text>
        </View>
    )
  }
}

export default Splash