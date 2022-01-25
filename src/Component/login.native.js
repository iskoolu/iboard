import React, { Component,Fragment } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Image,
  Text,
  TextInput,
} from 'react-native';
import constantvalue from '../shared/label.constants';
import {GoogleSignin, statusCodes,GoogleSigninButton} from 'react-native-google-signin';
import {AccessToken, GraphRequest, GraphRequestManager,LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_eye from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { IconButton, Button,} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import PushController from './PushController.native';
import AsyncStorage  from '@react-native-community/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Constants from '../shared/label.constants';
import {API_POST_LOGIN,BASE_URL_LOGIN,GET_USER_DETAILS,
  CLIENT_ID_GMAIL,GOOGLE_AUTH_URL} from '../services/api.constans';

export default class login extends Component{

  constructor(props) {

    super(props);
    this.state = {text_number : '',
     text_password: '',
     numbervalidate: true,
     length_name: true, 
     password_validate: true,
     userInfo: null,
     userType:'',
     gettingLoginStatus: true,
     jsonData: '',
     user_name: '',
     token: '',
     token_facbook:'',
     loggedIn: true,
     userID:'',
     error_show_msg:'',
     error_showvalue:true,
     profile_pic: '',
     deviceid:'',
     authorization:'',showpassword: true,
     ICONNAME: constantvalue.LBL_REGISTER.ICONEYECLOSE,
    };
    this.componentDidMount();
   
  }

  
  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
    
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '647278679470-cpq2kp74peu388ppmv7sap37j89q3tna.apps.googleusercontent.com',
      offlineAccess: true, 
    });
    //Check if user is already signed in
    this._isSignedIn();
  };

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
    
      this._getCurrentUserInfo();
    } else {
      
  
    }
    this.setState({ gettingLoginStatus: false });
  };

  facebook_login(){

    LoginManager.logInWithPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      }
      else {
       
        AccessToken.getCurrentAccessToken().then(data => {
          alert("value"+data.accessToken.toString());
          console.log('User facebboktoken--> ',data);

          this.setState({
            loggedIn: true,
            userID: data.userID,
            token_facbook: data.accessToken
        })
          const processRequest = new GraphRequest(
            '/me?fields=name,email,picture.type(large)',
            null,
            this.get_Response_Info);
       
      
          // Start the graph request.
          new GraphRequestManager().addRequest(processRequest).start();

          this.props.navigation.navigate('bottomNavigator')
        });

        
      }
    }.bind(this),
    function (error) {
      alert('Login fail with error: ' + error);
    }
  );

  }

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
   
      const user_Data = result
      this.setState({userInfo: user_Data});
      this.facebookData()
      console.log('User facebbok --> ',result);
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
     
    }
  };

  _getCurrentUserInfo = async () => {
    try {
      const userdetails = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userdetails.user);
      console.log('token gmail --> ', userdetails.idToken);

      const user_Data = userdetails.user
      this.setState({userInfo: user_Data});
      this.saveData()
      
      this.props.navigation.navigate('bottomNavigator',{user_Data});
       
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet')
        ;
        console.log('User has not signed in yet');
      } else {
        alert(error);
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  facebookData () {  

    var data = this.state.userInfo;
    let token_value = data;  
   
    AsyncStorage.setItem("userinfo",JSON.stringify(token_value));  
    AsyncStorage.setItem("key","facebook");  
    console.log("async",token_value);

  }  

  saveData () {  

    var data = this.state.userInfo;
    let token_value = data;  
   
    AsyncStorage.setItem("userinfo",JSON.stringify(token_value));  
    AsyncStorage.setItem("key","gmail");  
    console.log("async",token_value);

  }  
  _signIn = async () => {
    
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        autoResolve: true,
        showPlayServicesUpdateDialog: true,
     });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Isignin --> ', userInfo);
      
      const user_Data = userInfo.user
      this.setState({ userInfo: user_Data });
      this.saveData()
      this.props.navigation.navigate('bottomNavigator',{user_Data});

    } catch (error) {
      console.log("Play services error", error.code, error.message);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }

    }
  };

 


  checkInputDetails =  (values,actions) =>{

    let self = this;

    const params = {

      "username":values.phone,
      "password":values.password,
      
    };
    axios.post(BASE_URL_LOGIN+API_POST_LOGIN,params,
       {
        "headers": {

          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success

      if (response.data.status == "Success") {

        console.log(response.data);

        var access_token =  response.data.data.accessToken;
        var token_type = response.data.data.tokenType;

        var auth_token = token_type+" "+access_token;
        self.setState({authorization:auth_token})
        self.savenormalloginData();
        self.userDatafunction(actions);
        self.setState({error_showvalue:true})
        Toast.show(response.data.message, Toast.SHORT);

  
        // this.setState({userInfo: {"email": "devikamaheswari18@gmail.com", "givenName": "DEVIKA.R","photo": ""}});
     
       
      } else  if (response.data.status == "Failure") {

        console.log(response.data);
        self.setState({error_showvalue:false})
        self.setState({error_show_msg:response.data.message})
      
        
      }
      else {

        Toast.show(response.data, Toast.SHORT);
      }

    })
    .catch(function (error) {
      // handle error
      // alert("error"+error);
      console.log("error", error);
    });

   
  
  };
  savenormalloginData () {  

    var data = this.state.userInfo;
    let token_value = data;  
    let type = this.state.userType;
    var authtoken = this.state.authorization;
  //  let token = authtoken;  
  
    AsyncStorage.setItem("userType",type);  
    AsyncStorage.setItem("auth_Token",authtoken);  
    AsyncStorage.setItem("userinfo",JSON.stringify(token_value));  
    AsyncStorage.setItem("key","login");  
   

  }  

 
  eyeClick = () => {
    if (this.state.ICONNAME == constantvalue.LBL_REGISTER.ICONEYECLOSE) {
      this.setState({
        ICONNAME: constantvalue.LBL_REGISTER.ICONEYE, showpassword: this.state.showpassword = false
      })
    } else {
      this.setState({ ICONNAME: constantvalue.LBL_REGISTER.ICONEYECLOSE, showpassword: this.state.showpassword = true })
    }
  }
  userDatafunction = (actions) =>{

    let self = this;
   
    let token = self.state.authorization;
    console.log("test",token);

    axios.get(BASE_URL_LOGIN+GET_USER_DETAILS, {
      headers: {
        'Authorization': token
      }
    })
    .then((response) => {
      console.log(response.data)

      self.setState({userInfo: response.data});
      self.setState({userType: response.data.userType});
      
      self.savenormalloginData();
      self.props.navigation.navigate('bottomNavigator',{name:"dev"})
      actions.resetForm();
    })
    .catch((error) => {
      console.error(error)
    })
  
  }

  renderWarning() {
    
    return (
        <Fragment>
           
            {this.renderWarningText(this.state.error_show_msg)}

        </Fragment>
    );
  }

  renderWarningText(warningText) {
    return (
        <View style={styles.containerWarning}>
            <IconButton 
              icon="alpha-x-circle-outline"
              color="white"
              size={20} />

            <Text style={{ color: "white" }}>
           { warningText}
            </Text>


        </View>
    );
}
  render(){

    return(

      <View style = {styles.layoutstyle} >
        
        
        <ScrollView  >
        <Formik
        initialValues={{ 
          aboutyou: '',
          pincode: '', 
          cityname: '',
          state: '',
          interested: '',
        }}
        validationSchema = { yup.object().shape({
          phone: yup
            .string()
            .required(constantvalue.LOGIN.errorNumber),
          password: yup
            .string()
            .required(constantvalue.LBL_REGISTER.PASSWORD_REQUIRED ),
        })}
        onSubmit={ (values,actions) =>{


          this.checkInputDetails(values,actions);

         
        }}
        
       >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <View style = {styles.layoutstyle1} >
        
          <View  style = {styles.stylesocial}>

              
      <Icon.Button
          name="facebook"
          backgroundColor="#3b5998"
          onPress={() => this.facebook_login()}>
         <Text style = {styles.textsocial}> {constantvalue.LOGIN.facebook}</Text>
      </Icon.Button>

      </View>
      
      <TouchableOpacity  style={{ width: "95%", height: 40,marginBottom:10 }}
            onPress={() =>this._signIn()}>
           <View  style = {styles.stylegmailsocial}>

       
           <Image
            source={require('../../assets/images/google.png')}
            style={styles.buttonImageIconStyle}/>
          
           <Text style = {{ fontSize: 16,margin:5,color: "#000",alignSelf:'center'}}>
                {constantvalue.LOGIN.gmail}</Text>

          
           </View> 
           </TouchableOpacity>
      {/* <GoogleSigninButton 
                  style={{ width: "90%", height: 48,marginBottom:10 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() =>this.googlelogin_()}
              /> */}

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',margin: 10}}>
              <Text style={{
               color: 'white', fontSize: 14, fontWeight: 'bold',
               fontStyle: 'italic', justifyContent: 'center'}}> Or </Text>

               </View>

               { this.state.error_showvalue == false?(this.renderWarning()):null}

      <TextInput style = {styles.inputtext  }
        placeholder = {constantvalue.LOGIN.Username}
        placeholderTextColor = "#d3d3d3"
        keyboardType="email-address"
        onChangeText={handleChange('phone')}
        onBlur={() => setFieldTouched('phone')}
        value = {values.phone}
      />
      {touched.phone && errors.phone &&
              <Text style={styles.errorMessage}>{errors.phone}</Text>
            }   
      {this.state.numbervalidate == false ? (
             <Text style={styles.errorMessage}>
                 {constantvalue.errorNumber}
             </Text>
            ) : null }

<View style={styles.rowSection}>
      <TextInput
        style = {styles.input}
        placeholder = {constantvalue.LOGIN.Password}
        placeholderTextColor = "#d3d3d3"
        secureTextEntry={this.state.showpassword}
        value = {values.password}
        onChangeText={handleChange('password')}
        onBlur={() => setFieldTouched('password')}
        />

              <Icon_eye
                  style={styles.eyeIcon}
                  name={this.state.ICONNAME}
                  size={20}
                  color={constantvalue.TEXTCOLOR.DARKGRAY}
                  onPress={this.eyeClick} />

              </View>
{touched.password && errors.password &&
              <Text style={styles.errorMessage}>{errors.password}</Text>
            }  
      { this.state.password_validate == false ? (
             <Text style={styles.errorMessagepasword}>
               {constantvalue.errorpassword}
             </Text>
            ) : null  }

      <TouchableOpacity>
          <Text style = {styles.forgetpassword}
          onPress = {() => this.props.navigation.navigate('forgotPassword')}>
            {constantvalue.LOGIN.Forgotpassword}
           
          </Text>
      </TouchableOpacity>

      <TouchableOpacity
        
        style = {isValid?(styles.loginbtn):(styles.loginbtnhide)}
        disabled = {isValid?(false):(true)}
        onPress={handleSubmit}
         >

        
<Text style = {styles.btntext}> {constantvalue.LOGIN.login}</Text>
      </TouchableOpacity>

     


    
<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
          height: 40, margin: 13, }}>
            <Text style={{
              color: 'white', fontSize: 14, fontWeight: 'bold',
              fontStyle: 'italic', justifyContent: "space-between",
              justifyContent: "space-between"
            }}>  Don't have an Account ? 


              <Text style={{
                color:"#ffd700", fontSize: 14, fontWeight: 'bold'
                , justifyContent: "space-between"
              }}
              onPress = {() => this.props.navigation.navigate('Register')}>
                {  constantvalue.LOGIN.signup}</Text>

            </Text>
          </View>

 
      <PushController/>
      </View>

          )}
      </Formik>
      </ScrollView>

      </View>

    );
  }

}

const styles = StyleSheet.create({

  layoutstyle :{
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    alignSelf:'center',
    resizeMode: 'stretch',
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 50,
    width:"90%",
    borderColor: 'gray',
    margin: 13,
    borderColor: 'white',

  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 0,
    borderColor: 'gray',
    borderRadius:15,
    marginRight: 0,
  },
  input: {
    flex: 1,
    borderRadius: 4,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft: 10,
    width:"90%",
    borderColor: 'gray',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 18
  },
  containerWarning: {
    flexDirection:'row',
    height: 40,
    width: "90%",
    marginBottom:10,
    backgroundColor: "red",
   // justifyContent: "center",
    alignItems: "center",
 },
  layoutstyle1 :{
    justifyContent: "center",
    alignItems: "center",
  },
  inputtext:{
    fontSize: 18,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    width: "90%",
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: "#FFFFFF"
  },
  forgetpassword:{
    fontSize: 16,
    color: 'gray'
  },
  loginbtn:{
    padding: 10,
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: constantvalue.TEXTCOLOR.DARKGRAY,
    textAlign: "center"
  },
  loginbtnhide:{
    padding: 10,
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#e3f2fd",
    textAlign: "center",
    opacity:1
  },
  signup:{
    width: "90%",
  },
  signuptext:{
    fontSize: 14,
    color: "#ffd700",
    marginTop:7,
    textAlign: "center",
    fontWeight: "bold"
  },
  btntext:{
    fontSize: 25,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
  errorMessage: {
    fontSize: 16,
    color:"red",
    marginLeft:15,
    marginBottom:4,
    padding: 3 
  },
  errorMessagepasword: {
    fontSize: 16,
    color:'red',
    margin:-5,
    marginBottom: 4,
    padding: 3 
  },
  stylesocial:{   
    margin:10,
    width:"90%"
  },
  stylegmailsocial:{   
    margin:10,
    flexDirection:'row',
  
    height:40,
    borderRadius:4,
    backgroundColor:"#fff"
  },
  Buttonstyle:{
    padding: 10
  },
  textsocial:{
    fontSize: 16,
    margin:2,
    color: "#FFFFFF"
  }

});