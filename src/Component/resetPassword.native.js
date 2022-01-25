
import React, { Component } from 'react';

import {TouchableOpacity,StyleSheet,View,Text,StatusBar,TextInput,} from 'react-native';
import constantvalue from "../Constant/constantvalue";
import Toast from 'react-native-simple-toast';

export default class resetPassword extends Component{

  constructor(props) {
    super(props);
    this.state = {
     text_password: " ",
     password_validate: true,
    };
  
  }

  passwordvalidate = (text_password) =>{
 
    if(text_password.trim().length >= 8){
     
     this.setState({text_password : text_password, password_validate : true}) ;
   }else{
   
       this.setState({text_password : '', password_validate : false}) ;
   }
  }
  

  checkInputDetails = () =>{

     if(this.state.text_password == " "){

      Toast.show(constantvalue.newPassword.enternewpassword, Toast.SHORT);

    

    }else if(this.state.text_password.length >8){
      
      Toast.show(constantvalue.newPassword.enter8digit, Toast.SHORT);

     
      
    }else {

      this.props.navigation.navigate('bottomNavigator')
    }

  };

  render(){

    return(

      <View style = {styles.layoutstyle} >
        
      <StatusBar style = "light-content" hidden = {false} backgroundColor = "#000" translucent = {true} />

      <TextInput style = {styles.inputtext  }
        placeholder = {constantvalue.newPassword.newPassword_text}
        placeholderTextColor = "#d3d3d3"
        secureTextEntry
        onChangeText = {text_password => this.passwordvalidate(text_password)}
      
      />
      
      { this.state.password_validate == false ? (
             <Text style={styles.errorMessagepasword}>
               {constantvalue.newpassword}
             </Text>
            ) : null  }
      
      <TouchableOpacity
      style = {styles.loginbtn}>
          <Text style = {styles.btntext}>
            
            {constantvalue.newPassword.resetpassword}
           
          </Text>
      </TouchableOpacity>

      <TouchableOpacity
         style = {styles.loginbtn}
         onPress={this.checkInputDetails}>

           <Text style = {styles.btntext}> {constantvalue.login}</Text>
            
      </TouchableOpacity>
  
      </View>

    );
  }

}

const styles = StyleSheet.create(
{
  layoutstyle :{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  inputtext:{
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: "#FFFFFF"
  },
  forgetpassword:{
    fontSize: 18,
    color: 'gray'
  },
  loginbtn:{
    padding: 10,
    width: "90%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#696969",
    textAlign: "center"
  },
  btntext:{
    fontSize: 25,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
 socialloginstyle :{
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000"
  },
  stretch: {
    width: 50,
    height: 50,
    margin: 10,
    padding: 5,
    alignItems: "center",
    resizeMode: "stretch",
  },
  sociallogintext:{
    fontSize: 20,
    color: "#FFFFFF"
  },
 errorMessage: {
    fontSize: 18,
    color:"red",
    marginLeft:-50,
    marginBottom: 4,
    padding: 3 
  },
  errorMessagepasword: {
    fontSize: 18,
    color:"red",
    marginLeft:-10,
    marginBottom: 4,
    padding: 3 
  },

});