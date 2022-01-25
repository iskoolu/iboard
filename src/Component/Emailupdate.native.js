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
import {POST_UPDATE_EMAIL,BASE_URL_LOGIN,OTP_POST_EMAIL} from '../services/api.constans';

export default class Emailupdate extends Component {

  constructor(props) {
   
    super(props);
    var choose = this.props.choosevalue;
    console.log(choose)
    this.state = {
      mailID: ' ',authorization:'',
      mailvalidate: true,
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
 
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  
  
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
   
  }

  handleBackPress = () => {
   
     if(this.state.choosevalue  == "indi_email" ){

       this.props.emailupdate_data({key:''})
     }
     else if(this.state.choosevalue  == "institu_email" ){

      this.props.emailupdate_data({key:''})
     }
   else{

      // this.props.navigation.navigate('login');
   }
  //  const{goBack} = this.props.navigation;
  //  goBack();
    return true;
  };

 
  onSubmitEmail = (value) => {
    let self = this;
   
    self.setState({mailID:value.Email})

    const params = JSON.stringify({
      "mailId":value.Email, 
    });
  
    axios.post(OTP_POST_EMAIL,params,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success
     
      if (response.data.status == "Success") {

        console.log(response.data);
      
        const requestId = response.data.data.requestId;
        self.props.emailupdate_data({Email: self.state.mailID,
          Choose: self.state.choosevalue,reques_id:requestId});
      //  self.props.navigation.navigate('verifyAccount', { Email: self.state.mailID,
      //   Choose: self.state.choosevalue,reques_id:requestId,accesstoken:self.state.authorization },
      // )

      }
      else {

        console.log(response.data);
       // Toast.show(response.data.message, Toast.SHORT);
      }
     
   
    })
    .catch(function (error) {
      // handle error
      // alert("error"+error);
      console.log("error", error);
    });


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

       
         
          <View style={styles.layoutstyle1} >

          <Formik
        initialValues={{ 
          Email: '', 
        }}
        validationSchema = { yup.object().shape({
          Email: yup
            .string()
            .matches(/^[a-z ., A-z .]+[0-9,., A-z @]+[a-z A-z ,0-9]+\.[a-z]+$/,LABELCONSTANT.LBL_REGISTER.EMAIL_INVALID)
            .required(LABELCONSTANT.LBL_REGISTER.EMAIL_REQUIRED ),
          
        })}
        onSubmit={ (values,actions) =>{

          this.onSubmitEmail(values);

        }}>

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        
        <View> 
        <Text style={styles.forgetpasswordtextstyle}> {LABELCONSTANT.EditProfile.updatemail}</Text>

          

            <Text style={styles.fotgettext}> {LABELCONSTANT.EditProfile.verified}</Text>

            <TextInput
              label="Email"
              underlineColor="#696969"
              keyboardType='email-address'
              mode="outlined"
              left={
                <TextInput.Icon name="gmail" size={20} color={'#ffd700'} />
              }
              onChangeText={handleChange('Email')}
              onBlur={() => setFieldTouched('Email')}
           
              theme={{ colors: { primary: '#ffd700', underlineColor: 'transparent', borderColor: '#ffd700' } }}
              style={styles.inputStyle} />
              
              
              {touched.Email && errors.Email &&
              <Text style={styles.errorMessage}>{errors.Email}</Text>
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
    flex: 0.1,
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

