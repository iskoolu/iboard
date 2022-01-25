import React, { Component,Fragment } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity,
  BackHandler, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import LABELCONSTANT from '../shared/label.constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {GoogleSigninButton} from 'react-native-google-signin';
import {Appbar,IconButton } from 'react-native-paper';
import Loader from './loader.native';
import IconsocialLogin from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import AsyncStorage  from '@react-native-community/async-storage';
import * as yup from 'yup';
import {INDIV_POST_REGISTER,OTP_POST_EMAIL,INSTI_POST_REGISTER,
  BASE_URL_LOGIN} from '../services/api.constans';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let numreg = /[0-9 /\W|_/g ]+$/;

let emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      LBL_FIRSTNAME: LABELCONSTANT.LBL_REGISTER.FirstName,
      LBL_INSTITUTION: LABELCONSTANT.LBL_REGISTER.NAMEOFINSTITUTION,
      LBL_INSTITUTIONCLICK: LABELCONSTANT.LBL_REGISTER.INSTITUTION,
      TextInputFirstname: '',
      TextInputInstitution: '',
      TextInputEmail: '',
      TextInputMobile: '',
      TextInputPassword: '',
      showInstitution: false,
      showFirstName: true,
      firstnamevalidate: false,
      institutionvalidate: false,
      emailvalidate: false,
      mobilevalidate: false,
      passwordvalidate: false,
      policyvalidate: false,
      errorfirst: "",
      errorinstitution: '',
      erroremail: "",
      errormobile: "",
      errorpassword: "",
      errorpolicy: '', loading: false, showpassword: true,
      passvalue_institution:true,//individual
      choosevalue:'',
      authorization:'',
      ICONNAME: LABELCONSTANT.LBL_REGISTER.ICONEYECLOSE,
      error_show_msg:'',
      error_showvalue:true,
    };
    this.TextInputFirstname = React.createRef();
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

  eyeClick = () => {
    if (this.state.ICONNAME == LABELCONSTANT.LBL_REGISTER.ICONEYECLOSE) {
      this.setState({
        ICONNAME: LABELCONSTANT.LBL_REGISTER.ICONEYE, showpassword: this.state.showpassword = false
      })
    } else {
      this.setState({ ICONNAME: LABELCONSTANT.LBL_REGISTER.ICONEYECLOSE, showpassword: this.state.showpassword = true })
    }
  }

 
  ChangeText = () => {

    if (this.state.LBL_INSTITUTIONCLICK == LABELCONSTANT.LBL_REGISTER.INSTITUTION) {

      //institution
      this.setState({
        showFirstName: !this.state.showFirstName,
        showInstitution: !this.state.showInstitution,
        LBL_INSTITUTIONCLICK: LABELCONSTANT.LBL_REGISTER.INDIVDUAL,
        TextInputFirstname: '',
        errorfirst: "",
        passvalue_institution: false,
        firstnamevalidate: false,
        emailvalidate:false,
        mobilevalidate:false,
        passwordvalidate:false,
        TextInputEmail:'',
       
      })
      console.log('institution -->', this.state.LBL_INSTITUTIONCLICK);
     
    } else {
      //individual
      this.setState({
        showFirstName: !this.state.showFirstName,
        showInstitution: !this.state.showInstitution,
        LBL_INSTITUTIONCLICK: LABELCONSTANT.LBL_REGISTER.INSTITUTION,
        institutionvalidate: false,
        TextInputInstitution: "",
        passvalue_institution: true,
        emailvalidate:false,
        mobilevalidate:false,
        passwordvalidate:false,
        errorinstitution: '',
       
        TextInputEmail:"",
      
      })
      console.log('individual -->', this.state.LBL_INSTITUTIONCLICK);
    }
  }

  onSubmit_indiv = (values) => {

    let self = this;

    const params = {

      "fullName":values.Fullname,
      "email":values.Email,
      "password":values.NewPassword,
      
    };
    axios.post(BASE_URL_LOGIN+INDIV_POST_REGISTER,params,
       {
        "headers": {
          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success

      const status = response.data.status;
      if (status == "Success") {

        console.log("indiv",response.data);
        Toast.show(response.data.message, Toast.SHORT);

        self.setState({TextInputEmail:values.Email })

        var access_token =  response.data.data.accessToken;
        var token_type = response.data.data.tokenType;

        var auth_token = token_type+" "+access_token;
        self.setState({authorization:auth_token})

        self.savenormalloginData();
        self.onSubmitEmail();

      
      }
      else if (status == "Error"){

        console.log(response.data);

        self.setState({error_showvalue:false})
        self.setState({error_show_msg:response.data.data})

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

       
       
        // this.setState({
        //   firstnamevalidate: false, laststnamevalidate: false, institutionvalidate: false, cityvalidate: false
        //   , emailvalidate: false, mobilevalidate: false, passwordvalidate: false, policyvalidate: false
        // });

        // this.setState({
        //   firstnamevalidate: false, laststnamevalidate: false, institutionvalidate: false, cityvalidate: false
        //   , emailvalidate: false, mobilevalidate: false, passwordvalidate: false, policyvalidate: false
        // });

  }

  onSubmit_institution = (values) => {

    let self = this;
  
    const params = JSON.stringify({

      "institutionName":values.institution,
      "email":values.Email,
      "mobile":values.MobileNumberinstitution,
      "password":values.NewPassword
      
    });

    
    axios.post(BASE_URL_LOGIN+INSTI_POST_REGISTER,params,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      // handle success
      const status = response.data.status;
      if (status == "Success") {

        console.log(response.data);
        Toast.show(response.data.message, Toast.SHORT);

      
        self.setState({TextInputEmail:values.Email })

        var access_token =  response.data.data.accessToken;
        var token_type = response.data.data.tokenType;

        var auth_token = token_type+" "+access_token;
        self.setState({authorization:auth_token})

        self.savenormalloginData();
        self.onSubmitEmail();

      }
      else if (status == "Error"){

        console.log(response.data);

        self.setState({error_showvalue:false})
        self.setState({error_show_msg:response.data.data})

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

       
       
        // this.setState({
        //   firstnamevalidate: false, laststnamevalidate: false, institutionvalidate: false, cityvalidate: false
        //   , emailvalidate: false, mobilevalidate: false, passwordvalidate: false, policyvalidate: false
        // });

        // this.setState({
        //   firstnamevalidate: false, laststnamevalidate: false, institutionvalidate: false, cityvalidate: false
        //   , emailvalidate: false, mobilevalidate: false, passwordvalidate: false, policyvalidate: false
        // });

  }
  onSubmitMobile = () => {

    let self = this;
    self.setState({ loading: true });
    axios.get('https://api.msg91.com/api/v5/otp?authkey=156873AC11NF8mRv5f2d2698P1&mobile=91' + self.state.TextInputMobile + '&invisible=1&userip=IPV4', {
    })
    .then(function (response) {
       
        self.setState({ loading: false });
       // alert(" Registered was Sucessfulley");

        self.props.navigation.navigate('OTP', { MobileNumber: self.state.TextInputMobile }, { Email: self.state.TextInputEmail },
           { Choose: self.state.choosevalue})
    })
    .catch(function (error) {
        console.log(error);
       //alert(error);
    })

  }
  
  onSubmitEmail = () => {
    let self = this;
    
    const params = JSON.stringify({
      "mailId":this.state.TextInputEmail, 
    });

    axios.post(OTP_POST_EMAIL,params,
      {
        headers: {
          'Authorization':self.state.authorization,
          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success

      if (response.data.status == "Success") {

        console.log(response.data);
      
        const requestId = response.data.data.requestId;
        self.props.navigation.navigate('OTP', { Email: self.state.TextInputEmail,
        Choose: self.state.choosevalue,reques_id:requestId,accesstoken:self.state.authorization},)

      }
      else {

        console.log(response.data);
        Toast.show(response.data.message, Toast.SHORT);
      }
     
   
    })
    .catch(function (error) {
      // handle error
      console.log("error", error);
    });

  }

  savenormalloginData () {  

    var authtoken = this.state.authorization;
 
    AsyncStorage.setItem("auth_Token",authtoken);  
    
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
  
  render() {

    return (
      <View style={styles.Container}>
        <Loader loading={this.state.loading} />
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        
        <Appbar.Header style = {styles.toolbarstyle}>
                    
              <Appbar.BackAction color = 'white' onPress={() => this.handleBackPress()} />
                
      
           </Appbar.Header>
         
          {/* <KeyboardAvoidingView enabled> */}
          <Formik
        initialValues={{ 
          Fullname: '',
          Email: '', 
          institution:'',
          MobileNumber: '',
          MobileNumberinstitution: '',
          NewPassword: '',
        }}
        validationSchema = { yup.object().shape({
          Fullname: 
          this.state.showFirstName ?(
            yup
            .string()
            .matches(/^[a-z,A-Z,. ]+$/,LABELCONSTANT.LBL_REGISTER.FULLNAME_ERROR)
            .required(LABELCONSTANT.LBL_REGISTER.FULLNAME_REQUIRED)):null,  
          
          institution: 
           this.state.showInstitution ?(
              yup
             .string()
             .required(LABELCONSTANT.LBL_REGISTER.INSTITUION_REQUIRED)):null,
          Email: yup
            .string()
            .matches(/^[a-z ., A-z .]+[0-9,., A-z @]+[a-z A-z ,0-9]+\.[a-z]+$/,LABELCONSTANT.LBL_REGISTER.EMAIL_INVALID)
            .required(LABELCONSTANT.LBL_REGISTER.EMAIL_REQUIRED ),
           MobileNumber: yup
              .string()
              .matches(/^[0-9]+$/,LABELCONSTANT.LBL_REGISTER.MOBILE_VALIDATE)
              .min(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
              .max(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
              .optional(),
           MobileNumberinstitution: 
           this.state.showInstitution ?(
             yup
             .string()
             .min(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
              .max(10,LABELCONSTANT.LBL_REGISTER.ERROR_MOBILE)
             .matches(/^[0-9]+$/,LABELCONSTANT.LBL_REGISTER.MOBILE_VALIDATE)
            .required(LABELCONSTANT.LBL_REGISTER.MOBILE_REQUIRED)):null,
          NewPassword: yup
            .string()
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              LABELCONSTANT.LBL_REGISTER.PASSWORD_VALIDATE
            )
            .max(13,LABELCONSTANT.LBL_REGISTER.PASSWORD_MAX)
            .min(8,LABELCONSTANT.LBL_REGISTER.PASSWORD_MIN)
            .required(LABELCONSTANT.LBL_REGISTER.PASSWORD_REQUIRED ),
          
        })}
        onSubmit={ (values,actions) =>{

         // this.onSubmit() ;
        //  if (this.state.LBL_INSTITUTIONCLICK == LABELCONSTANT.LBL_REGISTER.INDIVDUAL) {

        if(this.state. passvalue_institution == true){
            console.log('indivudual -->');
         
            this.setState({choosevalue:"indiv"})
            this.onSubmit_indiv(values);

          }else{
            this.setState({choosevalue:"insti"})
            console.log('institution -->');
            this.setState({TextInputMobile: values.MobileNumberinstitution, TextInputEmail:values.Email })  
            this.onSubmit_institution(values) ;

           
          }

        }}
        >

{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View> 
            <View>

              <View style={{
             justifyContent:'space-between',margin:10,alignItems: 'center'}}>

                <IconsocialLogin.Button 
                  name="facebook"
                  backgroundColor="#3b5998">

                  <Text style={styles.textsocial}> {LABELCONSTANT.LOGIN.facebook}</Text>

                </IconsocialLogin.Button>

                <GoogleSigninButton 
                  style={{ width: "100%", height: 48,marginTop:10}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
               
              />
                </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',margin: 10}}>
              <Text style={{
               color: 'white', fontSize: 14, fontWeight: 'bold',
               fontStyle: 'italic', justifyContent: 'center'}}> Or </Text>

               </View>
               { this.state.error_showvalue == false?(this.renderWarning()):null}
              {this.state.showFirstName &&

                <TextInput
                 // ref={this.num1}
                  style={styles.inputStyle}
                  placeholder={this.state.LBL_FIRSTNAME}
                  placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                  onChangeText={handleChange('Fullname')}
                onBlur={() => setFieldTouched('Fullname')}
                  //onSubmitEditing={() => { this.refs.LastnameInput.focus(); }}
                 // onChangeText={TextInputFirstname => this.validateInputs(TextInputFirstname, 'FullName')}
                />}
              {this.state.firstnamevalidate ? (
                <Text style={styles.errorMessage}>
                  {this.state.errorfirst} </Text>) : null}

                  {touched.Fullname && errors.Fullname &&
              <Text style={styles.errorMessage}>{errors.Fullname}</Text>
            }   

              {this.state.showInstitution ?(
                <TextInput
                 // ref='institutionInput'
                 // onSubmitEditing={() => { this.refs.cityInput.focus(); }}
                  style={styles.inputStyle}
                  placeholder={this.state.LBL_INSTITUTION}
                  onChangeText={handleChange('institution')}
                  onBlur={() => setFieldTouched('institution')}
                  placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                 // value={this.state.TextInputInstitution}
                  //ref="3"
                 // onChangeText={TextInputInstitution => this.validateInputs(TextInputInstitution, 'institution')}
                  />):null}
 {touched.institution && errors.institution &&
              <Text style={styles.errorMessage}>{errors.institution}</Text>
            }    
              {this.state.institutionvalidate ? (
                <Text style={styles.errorMessage}>
                  {this.state.errorinstitution} </Text>) : null}


              <TextInput
               // ref='emailInput'
               // onSubmitEditing={() => { this.refs.mobileInput.focus(); }}
                style={styles.inputStyle}
                onChangeText={handleChange('Email')}
                onBlur={() => setFieldTouched('Email')}
                placeholder={LABELCONSTANT.LBL_REGISTER.EMAIL}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                keyboardType="email-address"
                // value={this.state.TextInputEmail}
              //  onChangeText={TextInputEmail => this.validateInputs(TextInputEmail, 'email')}
              />
 {touched.Email && errors.Email &&
              <Text style={styles.errorMessage}>{errors.Email}</Text>
            }   
              {this.state.emailvalidate ? (
                <Text style={styles.errorMessage}>
                  {this.state.erroremail} </Text>) : null}

           {this.state.showInstitution ?(
             <TextInput

             style={styles.inputStyle}
             placeholder={LABELCONSTANT.LBL_REGISTER.MOBILE}
             placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
             maxLength={10}
             onChangeText={handleChange('MobileNumberinstitution')}
             onBlur={() => setFieldTouched('MobileNumberinstitution')}
             keyboardType={'numeric'}
             //  value={this.state.TextInputMobile}
           //  onChangeText={TextInputMobile => this.validateInputs(TextInputMobile, 'mobile_institute')}
           />
           ) :  <TextInput
           //ref='mobileInput'
           //onSubmitEditing={() => { this.refs.passwordInput.focus(); }}
           style={styles.inputStyle}
           placeholder={LABELCONSTANT.LBL_REGISTER.MOBILE_OPTIONAL}
           placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
           maxLength={10}
           onChangeText={handleChange('MobileNumber')}
           onBlur={() => setFieldTouched('MobileNumber')}
           value = {values.MobileNumber}
           keyboardType={'numeric'}
           //  value={this.state.TextInputMobile}
          // onChangeText={TextInputMobile => this.validateInputs(TextInputMobile, 'mobile')}
         /> }
          {touched.MobileNumber && errors.MobileNumber &&
              <Text style={styles.errorMessage}>{errors.MobileNumber}</Text>
            }    
               {touched.MobileNumberinstitution && errors.MobileNumberinstitution &&
              <Text style={styles.errorMessage}>{errors.MobileNumberinstitution}</Text>
            }    
              {this.state.mobilevalidate ? (
                <Text style={styles.errorMessage}>
                  {this.state.errormobile} </Text>) : null}

              <View style={styles.rowSection}>
                <TextInput
                 // ref='passwordInput'
                  style={styles.input}
                  placeholder={LABELCONSTANT.LBL_REGISTER.PASSWORD}
                  placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                  //value={this.state.TextInputPassword}
                  onChangeText={handleChange('NewPassword')}
                  onBlur={() => setFieldTouched('NewPassword')}
                  secureTextEntry={this.state.showpassword}
                //  onChangeText={TextInputPassword => this.validateInputs(TextInputPassword, 'password')}
                />
 
                <Icon
                  style={styles.eyeIcon}
                  name={this.state.ICONNAME}
                  size={20}
                  color={LABELCONSTANT.TEXTCOLOR.DARKGRAY}
                  onPress={this.eyeClick} />

              </View>
              {touched.NewPassword && errors.NewPassword &&
              <Text style={styles.errorMessage}>{errors.NewPassword}</Text>
            }   
              {this.state.passwordvalidate ? (
                <Text style={styles.errorMessage}>
                  {this.state.errorpassword} </Text>) : null}

            </View>
            
          {/* </KeyboardAvoidingView> */}

          <View style={{
            flex: 0.1, flexDirection: 'row', margin: 10, padding: 0,
            justifyContent: "space-between", marginRight: 10,marginLeft:15
          }}>


            <Text style={{
              fontSize: 13, fontWeight: 'bold',
              margin: 1, color: 'white'
            }}>
              {LABELCONSTANT.LBL_REGISTER.POLICYCLICK}

              <Text style={{
                color: LABELCONSTANT.TEXTCOLOR.YELLOW, fontSize: 13,
                margin: 6, textAlign: "center", marginTop: 1,
              }}
                onPress={() => this.props.navigation.navigate('Policy')}   >
                {LABELCONSTANT.LBL_REGISTER.POLICY}</Text>

              <Text style={{
                fontSize: 13, fontWeight: 'bold',
                margin: 1, color: 'white'
              }}> and </Text>
              <Text style={{
                color: LABELCONSTANT.TEXTCOLOR.YELLOW, fontSize: 13,
                margin: 6, textAlign: "center", marginTop: 1,
              }}
                onPress={() => this.props.navigation.navigate('Cookies')} >
                {LABELCONSTANT.LBL_REGISTER.POLICYCOOKIE}</Text>
            </Text>
          </View>

          {this.state.policyvalidate ? (
            <Text style={styles.errorMessage}>
              {this.state.errorpolicy} </Text>) : null}

          <TouchableOpacity
           style = {isValid?(styles.submitButton):(styles.submitButtonhide)}
           disabled = {isValid?(false):(true)}
            onPress={handleSubmit}
         //  onPress={() => this.onSubmit()}
            >
            <Text style={styles.submitButtonText}>{LABELCONSTANT.LBL_REGISTER.SIGNUP}  </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
          height: 40, margin: 13, }}>
            <Text style={{
              color: 'white', fontSize: 14, fontWeight: 'bold',
              fontStyle: 'italic', justifyContent: "space-between",
              justifyContent: "space-between"
            }}> {this.state.LBL_INSTITUTIONCLICK}


              <Text style={{
                color: LABELCONSTANT.TEXTCOLOR.YELLOW, fontSize: 14, fontWeight: 'bold'
                , justifyContent: "space-between"
              }}
                onPress={this.ChangeText}>
                {LABELCONSTANT.LBL_REGISTER.CLICK} </Text>

            </Text>
          </View>

          </View>
           )}
       </Formik>
        </ScrollView>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'black',
    fontFamily: 'sans-serif',
  },
  initialText: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center",
    marginTop: 10,
    fontSize: 14
  },
  toolbarstyle:{
    backgroundColor :'black',
  },
  inputStyle: {
    margin: 13,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    justifyContent: "center",
    fontSize: 15
  },
  Buttonstyle:{
    padding: 10,
  },
  textsocial:{
    width:"90%",
    fontSize: 16,
    margin:2,
    color: "#FFFFFF"
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    margin: 13,
    borderColor: 'white',

  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 0,
    marginRight: 0,
  },
  containerWarning: {
    flexDirection:'row',
    height: 40,
    width: "90%",
    marginBottom:5,
    alignSelf:'center',
    backgroundColor: "red",
   // justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 15
  },
  Textwhite: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: LABELCONSTANT.TEXTCOLOR.DARKGRAY,
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 1,
   
    justifyContent: "center",
  },
  submitButtonhide: {
    backgroundColor: "#e3f2fd",
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 1,
   
    justifyContent: "center",
  },
  submitButtonText: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollView: {
    marginHorizontal: 0,
  },
  socialloginstyle: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000"
  },
  errorMessage: {
    fontSize: 12,
    color: "red",
    marginLeft: 10,
    marginBottom: 4,
    padding: 3
  },
});
