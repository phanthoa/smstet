import React, { Component, } from 'react'
import { View,
        StyleSheet,
        TouchableOpacity,
        Text,
        ListView,
        Dimensions,
        Clipboard,
        Animated,
        Easing,
        notifyMessage,
        Image,
        ScrollView,
       } from 'react-native'
import ViewPager from 'react-native-viewpager';
import SQLite from 'react-native-sqlite-storage';
import Share, {ShareSheet, Button} from 'react-native-share';
import {takeSnapshot} from "react-native-view-shot";
import RNViewShot  from "react-native-view-shot";
import Toast from "react-native-simple-toast";
import {Actions} from 'react-native-router-flux';
//import { BannerView } from 'react-native-fbads';
var {width, height} = Dimensions.get('window');
var resData = [];
class Content extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    const title = this.props.title;
    console.log('dasds ', data);
  //  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.snapshot = this.snapshot.bind(this)
    var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
        title : title,
        data : data,
        content : 'Copy',
        dataSource : ds.cloneWithPages(resData),
    }
   // Toast.show({data},Toast.SHORT);
    var db = SQLite.openDatabase({name: "dbChucTet2017.db", createFromLocation : "~dbChucTet2017.db"});
  //  var db = SQLite.openDatabase({name: "dbChucTet2017.db", createFromLocation : 1});
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM listData', [], (tx,results) =>{
          resData.splice(0, resData.length);
          var len = results.rows.length;
          for (let i = 0; i < len ; i++) {
            if (results.rows.item(i).types == this.state.data ) {
              resData.push({'_id': results.rows.item(i)._id, 'types': results.rows.item(i).types , 'content' : results.rows.item(i).content});
            }
          }
             this.setState({
                dataSource: ds.cloneWithPages(resData),
            })
             Clipboard.setString(resData[0].content);
        });
      });

  }
//   onCancel() {
//     console.log("CANCEL")
//     this.setState({visible:false});
//   }
//   onOpen() {
//     console.log("OPEN");
//     this.setState({visible:true});
//   }
  _setClipboardContent = async () => {
    try {
      var content = await Clipboard.getString();
      this.setState({content});
      Toast.show('Copy Thành Công',Toast.SHORT);
    } catch (e) {
      this.setState({content:e.message});
    }
  };
  _renderPage(data, sectionID, PageID)
  {
    return(
      <View style = {styles.TouView}>
         <Image style = {styles.Ima} source = {require('../Images/icon/form_tet.png')}>
            <ScrollView  style = {styles.SViewText}>
              <Text style = {styles.ViewText}>{data.content}</Text>
            </ScrollView>
          </Image>
      </View>
    );

  }
  _onChangePage (page) {
    Clipboard.setString(resData[page].content);
   // console.log(page);
  }
  snapshot = refname => () =>
    RNViewShot.takeSnapshot(this.refs[refname],  {format: "png", quality: 0.8, result: "base64"})
      .then(
          uri => {
            let url = "data:image/png;base64," + uri;
       //     console.log(url);
            let shareOptions ={
              title : "Chuc tet",
              message : "2017",
              url : url,
            }
            Share.shareSingle(Object.assign(shareOptions, {
                "social": "facebook"
            }));
          }
      );
  render() {
    return (
      <View style={{position: 'relative' }}>
          <Image resizeMode = "cover" style = {{height : height, width : width , position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} source = {require('../Images/icon/bg_2_2.png')}/>
          <View style = {{flexDirection: 'row',marginTop : 15 }}>
            <TouchableOpacity style={styles.BtnBack} onPress = {() => Actions.pop()}>
              <Image source = {require('../Images/icon/back.png')}/>
            </TouchableOpacity>
            <View style = {styles.NavBar}>
              <Text style = {{fontSize : 15 , color : '#FFCD3F',  fontWeight : 'bold',textAlign: 'center', }}>{this.state.title}</Text>
            </View>
          </View>
          <View style = {{marginTop : 20}}  />
          <View  style = {{height : height/2 +30, width: width }}>
            <ViewPager ref = "content" dataSource={this.state.dataSource} renderPage={this._renderPage}
                            isLoop ={true}
                            onChangePage={this._onChangePage}
                            renderPageIndicator ={false}
            />
          </View>
            <View style = {{ justifyContent : 'center',alignItems : 'center'}}>
              <View style = {{ marginTop : 60 ,flexDirection: 'row' }}>
                 <TouchableOpacity style = {{}} onPress = {this._setClipboardContent}>
                  <Image style = {{margin: 5 , height: 50 ,width: 130}} source = {require ('../Images/icon/btn_copy.png')} >
                  </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress= {this.snapshot("content")}>
                   <Image style = {{margin: 5 ,height: 50 ,width: 130}} source = {require ('../Images/icon/btn_share.png')} >
                  </Image>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
//   container: {
//     flex :1 ,
//     backgroundColor: 'white',
//   },
  Ima : {
 //   margin : 5, 
    alignItems: 'center' ,
    height : height/2 + 30, 
    width : width,
  },
   banner50: {
    alignSelf: 'stretch',
    height: 50,
  },
  NavBar: {
    width : width/2 + 50,
    height : 40,
    borderRadius : 5,
    marginLeft: 15,
    backgroundColor : '#A10F18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouView: {
  //  marginTop : 20,
    height : height/2 +30,
    width : width,
  // backgroundColor : 'red',
  //  justifyContent: 'center',
    alignItems: 'center',
   // margin : 2,
  },

  BtnBack: {
    height : 40 ,
    width: 50 ,
   // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SViewText : {
    margin: 30,
    marginTop: 50,
    marginBottom: 45,
    height : height/2 - 70,
    width : width - 100,
  //  backgroundColor : '#E8DDCA',
  },
  ViewText: {
    marginTop : 40,
    marginBottom : 10,
    fontSize: 18,
    textAlign: 'center',
    color : 'red',
    fontFamily : 'black_jack',
  },

});

export default Content
