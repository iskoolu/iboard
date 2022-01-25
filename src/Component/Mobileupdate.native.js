import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  BackHandler
} from 'react-native';
import LABELCONSTANT from "../shared/label.constants";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput,Appbar } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import {BASE_URL_LOGIN,OTP_POST_EMAIL} from '../services/api.constans';

export default class Mobileupdate extends Component {

  constructor(props) {
   
    super(props);
    var choose = this.props.choosevalue;
   
    this.state = {
      TextInputMobile: ' ',authorization:'',
      choosevalue:choose,
    };

    this.token_data();
  }

  token_data = async () => {

    try {
     
      const token = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: token });
     
    } catch (e) {
      console.log(e)
     
    }
  };



  onSubmitMobile = (value) => {
    let self = this;
      
    self.setState({TextInputMobile:value.Mobilenumber})

    axios.get('https://api.msg91.com/api/v5/otp?authkey=156873AC11NF8mRv5f2d2698P1&mobile=91' +value.Mobilenumber + '&invisible=1&userip=IPV4', {
      })
      .then(function (response) {
         
        console.log(response.data);

        if(response.data.type == "success"){

        

          self.props.mobileupdate_data({ MobileNumber: self.state.TextInputMobile ,
            Choose: self.state.choosevalue})
 
            console.log(self.state.TextInputMobile ,  self.state.choosevalue );

        }else{



        }
      
  
        
      })
      .catch(function (error) {
          console.log(error);
         //alert(error);
      })
  
   
    
  }
  
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
    }
  };

  render() {

    return (

      <View style={styles.layoutstyle} >
         
        <ScrollView style={styles.layoutscroll} >
{/* 
        <Appbar.BackAction color='#000' onPress={() => this.handleBackPress()} /> */}
         
          <View style={styles.layoutstyle1} >

          <Formik
        initialValues={{ 
          Mobilenumber: '', 
        }}
        validationSchema = { yup.object().shape({
        Mobilenumber: yup
          .string()
          .min(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
           .max(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
          .matches(/^[0-9]+$/,LABELCONSTANT.LBL_REGISTER.MOBILE_VALIDATE)
         .required(LABELCONSTANT.LBL_REGISTER.MOBILE_REQUIRED),
          
        })}
        onSubmit={ (values,actions) =>{

          this.onSubmitMobile(values);

        }}>

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        
        <View> 
        <Text style={styles.forgetpasswordtextstyle}> {LABELCONSTANT.EditProfile.updatemobile_number}</Text>

          
            <Text style={styles.fotgettext}> {LABELCONSTANT.EditProfile.verified}</Text>

            <TextInput
              label="Mobile Number"
              underlineColor="#696969"
              keyboardType='number-pad'
              mode="outlined"
              left={
                <TextInput.Icon name="cellphone" size={20} color={'#696969'} />
              }
              onChangeText={handleChange('Mobilenumber')}
              onBlur={() => setFieldTouched('Mobilenumber')}
           
              theme={{ colors: { primary: '#ffd700', underlineColor: 'transparent', borderColor: '#ffd700' } }}
              style={styles.inputStyle} />
              
              
              {touched.Mobilenumber && errors.Mobilenumber &&
              <Text style={styles.errorMessage}>{errors.Mobilenumber}</Text>
            }   
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={handleSubmit}>

              <Text style={styles.btntext}> {LABELCONSTANT.EditProfile.mail_submit}</Text>

            </TouchableOpacity>

            
            </View>
               )}
            </Formik>
          </View>
        </ScrollView>

      </View>

    );
  }

}

const styles = StyleSheet.create({

  layoutstyle: {
    flex: 1,
    backgroundColor : "#fff",
    flexDirection: 'row'
  },
  layoutstyle1: {
    flex: 1,
   margin:5,
    justifyContent: "center",

  },
  layoutscroll: {
    marginHorizontal: 0,

  },
  inputStyle: {
    marginTop: 10,
    margin:10,
    backgroundColor: "#fff"
  },
  toolbarstyle:{
    backgroundColor : "#fff"
  },
  forgetpassword: {
    fontSize: 18,
    color: 'gray'
  },
  loginbtn: {
    padding: 10,
    width: "75%",
    borderRadius: 4,
    marginTop: 10,
    margin:10,
    marginBottom: 20,
    backgroundColor: "#696969",
    textAlign: "center",
    alignSelf: 'center'
  },
  btntext: {
    fontSize: 18,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
  socialloginstyle: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: "#000"
  },
  stretch: {
    width: 100,
    height: 100,
    margin: 5,
    padding: 5,
    marginTop: 10,
    alignSelf:'center',
 
  },
  notlogin: {
    fontSize: 15,
    color: "#696969"
  },
  fotgettext: {
    margin: 5,
    fontSize: 12,
    alignSelf:'center',
    color: "#696969"
  },
  help: {
    fontSize: 15,
    color: "#ffd700"
  },
  errorMessage: {
    fontSize: 15,
    color: "red",
    marginLeft: 10,
    marginBottom: 4,
    padding: 3
  },
  forgetpasswordtextstyle: {
    alignSelf: "center",
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold"
  },


});

