
import React, { Component } from 'react';
import {ScrollView,StyleSheet,View,Text,BackHandler,TouchableOpacity} from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import {LoginManager } from 'react-native-fbsdk';
import constantvalue from "../shared/label.constants";
import { Appbar, List ,Chip,IconButton, Colors ,} from 'react-native-paper';
import AsyncStorage  from '@react-native-community/async-storage';
import OnGoingClass from "./OnGoingClass.native";
import BecomeCoach from './BecomeCoach.native';

export default class mycourse extends Component{

  constructor(props) {
    super(props);
    this.state = {token : '',
        userInfo: '',
        gmail:'',
        name:'',
        image:'',
        appbarcheck: true,
        overall:false,ongoing:true,becomeCoach:false,
    };   

  
  }
  componentDidMount() {
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
   
    const{goBack} = this.props.navigation;
    goBack();
    return true;
 };

  userdata = async () => {
    
    try {
      const value = await AsyncStorage.getItem("userinfo")
      const item = JSON.parse(value);
      const key = await AsyncStorage.getItem("key");  
     


        console.log("profile",item)
        this.setState({userInfo:item})

      
    
    } catch(e) {
      console.log(e)
     
    }
  };

  clickdetails=(key)=> {


    if (key == "overall") {

      this.setState({ overall: true,becomeCoach: false,ongoing: false });

    }
    else if (key == "coach") {

      this.setState({ becomeCoach: true ,overall: false,ongoing: false });

    } else {

      this.setState({ ongoing: true ,becomeCoach: false ,overall: false});
    }

  
  }
  
  render(){
  
    return(

      <View style={styles.layoutstyle}>
        
     
    
          <View style = {styles.iconviewstyle}>

          <View style = {styles.icontextviewstyle}>
            <IconButton
              icon="sync"
              onPress = {() => this.clickdetails('ongoing')} 
              color={Colors.DarkTheme}
              size={20}/>

             <Text style = {styles.texticonstyle}>{constantvalue.mycourse.ongoing}</Text>
             
            </View>

            <View style = {styles.icontextviewstyle}>
            <IconButton
              icon="feature-search-outline"
              onPress = {() => this.clickdetails('overall')} 
              color={Colors.DarkTheme}
              size={20}/>

             <Text style = {styles.texticonstyle}>{constantvalue.mycourse.overall}</Text>
            </View>


            <View style = {styles.icontextviewstyle}>
            <IconButton
             icon="plus"
             onPress = {() => this.clickdetails('coach')} 
              color={Colors.DarkTheme}
              size={20}/>
             <Text style = {styles.texticonstyle}>{constantvalue.mycourse.becomecoach}</Text>

            </View>

           
           
          </View>
          <View style= {styles.divederstyle}  />

           <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>

                    <View style={styles.textviewstyle}>
                        
                        {this.state.ongoing ?
                    <OnGoingClass {...this.props} valuemycourse={this.state.appbarcheck} />
                    :null}


                     {this.state.becomeCoach ?
                    <BecomeCoach {...this.props}  />

                    :null}

                    {this.state.overall ?

                     <OnGoingClass {...this.props} valuemycourse={this.state.appbarcheck} />

                    :null}
                     
                    </View>

                </ScrollView>

      </View>
      
      );
  }

}

const styles = StyleSheet.create({

  layoutstyle :{
    flex: 1,
    backgroundColor: "#fff"
  },
  btntext:{
    fontSize: 25,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
  imageviewstyle:{
    flexDirection:"row",
    padding: 5,
    alignItems:"center",
    marginTop: 5,
  },
  nameviewstyle:{
    flex: 1,
    padding: 10,
    marginTop: 5,
  },
  imagestyle:{
    margin:10,
  },
  textstyle:{
    color: "#696969",
    fontSize:18,
  },
  listtextstyle:{
    color: "#696969",
    fontSize:18,
    height:"30%",
    margin:-3,
   
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },
  textsmallstyle:{
    color: "#696969",
    fontSize:13,
  },
  divederstyle:{
    borderWidth:0.5,
    borderColor:"#D3D3D3"
  },
  texticonstyle:{
    color: "#000",
    fontSize:13,
  },
  iconviewstyle:{
    marginTop:10,
    flexDirection:"row",
    alignItems:"center",
   
  },
  icontextviewstyle:{
    flex: 1,
    margin:5,
    bottom:5,
    alignItems:"center",
  },
  titlestyle:{
    color:"#696969",
    fontSize:15,
    height:"26%",
    
  },
  liststyle:{
    color:"#696969",
    height:"50%"
  },


});


