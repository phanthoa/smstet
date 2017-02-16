import React, { Component, } from 'react'
import { View,
       StyleSheet,
       TouchableOpacity,
        Dimensions,
        Text,
        ListView,
        Image,

       } from 'react-native'
var deviceWidth = Dimensions.get('window').width;
import SQLite from 'react-native-sqlite-storage';
import {Actions} from 'react-native-router-flux';
import codePush from "react-native-code-push";
var {width, height} = Dimensions.get('window');

var DanhMuc = [];
class Smsview extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
      id: '',
      Name: '',
      data : [],
      dataSource: ds.cloneWithRows(DanhMuc),
    }
     var db = SQLite.openDatabase({name: "dbChucTet2017.db", createFromLocation : "~dbChucTet2017.db"});
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM DanhMuc', [], (tx,results) =>{
          DanhMuc.splice(0, DanhMuc.length);
          var len = results.rows.length;
          for (let i = 0; i < len ; i++) {
             DanhMuc.push({'id': results.rows.item(i).id, 'Name': results.rows.item(i).Name});
          }
             this.setState({
                dataSource: ds.cloneWithRows(DanhMuc),
            })
        });
      });

  }
  componentWillMount()
  {
  //  codePush.sync({ updateDialog: true,installMode : codePush.InstallMode.IMMEDIATE })
    codePush.sync({ updateDialog: true,installMode : 0 })
  }
  _renderView (data,sectionID,rowId) {
    return (
      <View style = {{ alignItems : 'center'}}>
      <TouchableOpacity activeOpacity = {0.95} style = {styles.TouView} onPress = {() => Actions.Content({data: data.id , title : data.Name})} >
        <View style ={{paddingHorizontal: 5 , margin:5, alignItems: 'center',justifyContent: 'center'}} >
           <Image style = {styles.Ima} source = {require('../Images/icon/label.png')}>
            <Text style={styles.TouText}>{data.Name}</Text>
          </Image>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={{position: 'relative'}}>
          <Image resizeMode = "cover" style = {{height : height, width : width , position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} source = {require('../Images/icon/bg_1.png')}/>
          <View style ={{marginTop : 115}}>
            <ListView  dataSource={this.state.dataSource} renderRow={this._renderView}
                   enableEmptySections = {true} />
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  TouView: {
    height : 100,
    width : width,
    justifyContent: 'center',
    alignItems: 'center',
  //  paddingHorizontal: 30,
   // backgroundColor : '#f2f2f2',
 //   marginLeft : 10,
//marginRight: 10,
    margin : 2,

  },
  Ima: {
    justifyContent: 'center',
    height : 90,
    width : width - 5,
  //  paddingHorizontal: 30,
   // marginLeft : 5,
  //  marginRight: 5,
  },
  TouText : {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    color: '#A22A24',
    fontWeight : 'bold',
    backgroundColor : '#E8DDCA',
  },
});

export default Smsview
