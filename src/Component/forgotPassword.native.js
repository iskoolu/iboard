import React, { Component ,Fragment} from 'react';
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
import imagesconstant from "../Constant/imagesconstant";
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput,Appbar,IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import {POST_FORGETPASSWORD,BASE_URL_LOGIN} from '../services/api.constans';

export default class forgotPassword extends Component {

  constructor(props) {

    super(props);
    this.state = {
      mailID: ' ',
      mailvalidate: true,
      error_show_msg:'',
      error_showvalue:true,
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

  checkInputDetails = (value) => {

    let self = this;
    const params = JSON.stringify({
      "userEmail":value.Email, 
    });

      axios.post(BASE_URL_LOGIN+POST_FORGETPASSWORD,params,  {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {

        if (response.data.status == "Success") {

          console.log(response.data);
          Toast.show(response.data.message, Toast.SHORT);

         
          self.handleBackPress();
        }
        else {
  
          console.log(response.data);
          self.setState({error_showvalue:false})
          self.setState({error_show_msg:response.data.message})
        }
         

      })
      .catch(function (error) {

          console.log(error);
        
      })

  };

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

            <Text style={{ color: "white" ,alignSelf:'center'}}>
           { warningText}
            </Text>


        </View>
    );
  }

  render() {

    return (

      <View style={styles.layoutstyle} >
         
        <ScrollView style={styles.layoutscroll} >

          <View style={styles.layoutstyle1} >

          <Appbar.Header style = {styles.toolbarstyle}>

          </Appbar.Header>

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

          this.checkInputDetails(values);

        }}>

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        
        <View> 
        <Text style={styles.forgetpasswordtextstyle}> {LABELCONSTANT.Forget_constant.forgetpassword}</Text>

            <Image style={styles.stretch}
              source={imagesconstant.forget_password_image} />

            <Text style={styles.fotgettext}> {LABELCONSTANT.Forget_constant.text_forgetscreen}</Text>

            { this.state.error_showvalue == false?(this.renderWarning()):null}

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

              <Text style={styles.btntext}> {LABELCONSTANT.Forget_constant.submit}</Text>

            </TouchableOpacity>

            <View style={styles.socialloginstyle} >

              <Text style={styles.notlogin}>

                {LABELCONSTANT.Forget_constant.cannotlogin}</Text>

              <Text style={styles.help}>

                {LABELCONSTANT.Forget_constant.help}</Text>

            </View>
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
    padding: 10,
    backgroundColor: "#000",
    flexDirection: 'row'
  },
  layoutstyle1: {
    flex: 1,
    justifyContent: "center",
  },
  containerWarning: {
    flexDirection:'row',
    height: 40,
    width: "90%",
    marginBottom:10,
    backgroundColor: "red",
   // justifyContent: "center",
    alignSelf: "center",
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
    backgroundColor :'black',
  },
  forgetpassword: {
    fontSize: 18,
    color: 'gray'
  },
  loginbtn: {
    padding: 10,
    width: "95%",
    borderRadius: 4,
    marginTop: 10,
    margin:10,
    marginBottom: 20,
    backgroundColor: "#696969",
    textAlign: "center",
    alignSelf: 'center'
  },
  btntext: {
    fontSize: 25,
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
    padding: 10,
    margin: 5,
    fontSize: 18,
    alignSelf:'center',
    width: "80%",
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
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },


});

