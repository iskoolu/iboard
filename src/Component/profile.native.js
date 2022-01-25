
import React, { Component } from 'react';
import {StyleSheet,View,Text,BackHandler,TouchableOpacity} from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import {LoginManager } from 'react-native-fbsdk';
import constantvalue from "../shared/label.constants";
import { Avatar, List ,Chip,IconButton, Colors ,} from 'react-native-paper';
import AsyncStorage  from '@react-native-community/async-storage';

export default class profile extends Component{

  constructor(props) {
    super(props);
    this.state = {token : '',
        userInfo: '',
        gmail:'',
        name:'',
        image:'',

    };   

  
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
    this.userdata();
    
  });
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


  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  _signOut = async () => {
    //Remove user session from the device.
    try {

      const key = await AsyncStorage.getItem("key");  

      if(key == "gmail"){
        console.log('userinfo',key)
      
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      if(key == "facebook"){
        console.log('userinfo',key)
       
        LoginManager.logOut();
      }
      else{


      }
     
     AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('All Keys removed'));
      this.setState({ userInfo: null }); // Remove the user from your app's state as well

     this.props.navigation.navigate('login')
    } catch (error) {
      console.error(error);
    }
  };

  userdata = async () => {
    
    try {
      const value = await AsyncStorage.getItem("userinfo")
      const item = JSON.parse(value);
      const key = await AsyncStorage.getItem("key");  
     

      if(key == "gmail"){

        console.log('userinfo',item)
        this.setState({image:item.photo});
        this.setState({name:item.givenName});
        this.setState({gmail:item.email});
      }
      if(key == "facebook"){
        console.log('userinfo',item)
        this.setState({image:item.picture.data.url});
        this.setState({name:item.name});
        this.setState({gmail:""});

      }
      else{

        console.log("profile",item)
        this.setState({userInfo:item})

      }
    
    } catch(e) {
      console.log(e)
     
    }
  };

  gotoProfileDetails() {


    const userdata = this.state.userInfo;

    if(this.state.userInfo.userType == "INDIVIDUAL"){

      this.props.navigation.navigate('profileDetails',{userdata})

    }else{

      this.props.navigation.navigate('profileDetails_institute',{userdata,keyvalue:false})

    }

    

 
  }
  
  render(){
  
    return(

      <View style={styles.layoutstyle}>
        
           
          {/* <TouchableOpacity
            onPress={() =>this.gotoProfileDetails()}> */}
          <View style = {styles.imageviewstyle}>
            <Avatar.Image style = {styles.imagestyle} size={100}
          source ={{uri:this.state.userInfo.imageUrl}} color="#fff" />
         
                       
            <View style = {styles.nameviewstyle}>

            <Text style = {styles.textstyle}>{this.state.userInfo.name}</Text>
            <Text style = {styles.textsmallstyle}>{this.state.userInfo.email}</Text>

            
            <Chip  style={{alignItems:'center', alignSelf: 'flex-start',height:20,
            marginTop:10, backgroundColor:"#ffd700"}}  
                         
                    icon="chevron-triple-right"
                    selectedColor="#696969"
                    onPress={() =>this.gotoProfileDetails()} >
                        view profile
            </Chip>


          </View>
          </View>
      
              
          <View style= {styles.divederstyle}  />

          <View style={styles.layoutstyle}>
            
            <List.Section style={styles.liststyle} >

              <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.notifications}
              left={() => <List.Icon color="#000" icon="bell-outline" />}
              />

               <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.payment}
              left={() => <List.Icon color="#000" icon="bank-transfer" />}
              />

               <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.settingstext}
              left={() => <List.Icon color="#000" icon="tools" />}
              />

               <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.faq}
              left={() => <List.Icon color="#000" icon="file-document-edit-outline" />}
              />
              
              <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.Logout}
              onPress={() =>this._signOut()}
              left={() => <List.Icon color="#000" icon="logout" />}
              />
            
            </List.Section>
            
          </View>
          
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
  textsmallstyle:{
    color: "#696969",
    fontSize:13,
  },
  divederstyle:{
    borderWidth:0.4,
    borderColor:"#D3D3D3"
  },
  texticonstyle:{
    color: "#000",
    fontSize:13,
  },
  iconviewstyle:{
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


