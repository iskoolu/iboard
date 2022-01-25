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
import { TextInput, Appbar } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { POST_UPDATEPASSWORD, BASE_URL_LOGIN } from '../services/api.constans';

export default class changePassword extends Component {

  constructor(props) {

    super(props);
    var choose = this.props.route.params.Choose

    console.log(choose)
    this.state = {
      mailID: ' ', authorization: '',
      mailvalidate: true,
      choosevalue: choose,
      eyeIcon_current: LABELCONSTANT.profile.ICONEYECLOSE,
      eyeIcon_new: LABELCONSTANT.profile.ICONEYECLOSE,
      showPassword: true, new_showpassword: true,new_reconfirm:true,
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

    const { goBack } = this.props.navigation;
    goBack();
    return true;
  };

  eyeicon_PaswwordClick = (value) => {

    if (value == "current") {

      if (this.state.eyeIcon_current == LABELCONSTANT.profile.ICONEYECLOSE) {

        this.setState({ eyeIcon_current: LABELCONSTANT.profile.ICONEYE })

        this.setState({ showPassword: !this.state.showPassword })

      } else {
        this.setState({ eyeIcon_current: LABELCONSTANT.profile.ICONEYECLOSE, showPassword: true })
      }

    }
    else if (value == "new") {

      if (this.state.eyeIcon_new == LABELCONSTANT.profile.ICONEYECLOSE) {

        this.setState({ eyeIcon_new: LABELCONSTANT.profile.ICONEYE })

        this.setState({ new_showpassword: !this.state.new_showpassword })

      } else {
        this.setState({ eyeIcon_new: LABELCONSTANT.profile.ICONEYECLOSE, new_showpassword: true })
      }

    }
    else {

      if (this.state.eyeIcon_new == LABELCONSTANT.profile.ICONEYECLOSE) {

        this.setState({ eyeIcon_new: LABELCONSTANT.profile.ICONEYE })

        this.setState({ new_reconfirm: !this.state.new_reconfirm })

      } else {
        this.setState({ eyeIcon_new: LABELCONSTANT.profile.ICONEYECLOSE, new_reconfirm: true })
      }

    }

  }

  updatepassword = (value) => {

    // this.setState({passwordfield:false})

    let self = this;

    const params = JSON.stringify({

      "currentPassword": value.current_pwd,
      "newPassword": value.new_pwd,

    });

    axios.post(BASE_URL_LOGIN+POST_UPDATEPASSWORD, params,
      {
        headers: {
          'Authorization': self.state.authorization,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(function (response) {
        // handle success

        if (response.data.status == "Success") {

          console.log("newPassword", response.data);

          Toast.show(response.data.message, Toast.SHORT);

          self.handleBackPress();
        }
        else {

          console.log("newPassword", response.data);
          Toast.show(response.data, Toast.SHORT);
        }

      })
      .catch(function (error) {
        // handle error
        // alert("error"+error);
        console.log("error", error);
      });

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

  render() {

    return (

      <View style={styles.layoutstyle} >

        <ScrollView style={styles.layoutscroll} >

          <Appbar.BackAction color='#000' onPress={() => this.handleBackPress()} />

          <View style={styles.layoutstyle1} >

            <Formik
              initialValues={{
                current_pwd: '',new_pwd:'',reconfirm:'',
              }}
              validationSchema={yup.object().shape({
                current_pwd: yup
                  .string()
                  // .matches(
                  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  //   LABELCONSTANT.LBL_REGISTER.PASSWORD_VALIDATE
                  // )
                  // .max(13, LABELCONSTANT.LBL_REGISTER.PASSWORD_MAX)
                  // .min(8, LABELCONSTANT.LBL_REGISTER.PASSWORD_MIN)
                  .required(LABELCONSTANT.LBL_REGISTER.PASSWORD_REQUIRED),
                new_pwd: yup
                  .string()
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    LABELCONSTANT.LBL_REGISTER.PASSWORD_VALIDATE
                  )
                  .max(13, LABELCONSTANT.LBL_REGISTER.PASSWORD_MAX)
                  .min(8, LABELCONSTANT.LBL_REGISTER.PASSWORD_MIN)
                  .required(LABELCONSTANT.LBL_REGISTER.PASSWORD_REQUIRED),
                reconfirm: yup
                  .string()
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    LABELCONSTANT.LBL_REGISTER.PASSWORD_VALIDATE
                  )
                  .max(13, LABELCONSTANT.LBL_REGISTER.PASSWORD_MAX)
                  .min(8, LABELCONSTANT.LBL_REGISTER.PASSWORD_MIN)
                  .required(LABELCONSTANT.LBL_REGISTER.PASSWORD_REQUIRED)

              })}
              onSubmit={(values, actions) => {

                this.updatepassword(values);

              }}>

              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                <View>
                  <Text style={styles.forgetpasswordtextstyle}> {LABELCONSTANT.EditProfile.updatepassword}</Text>


                  <TextInput label={LABELCONSTANT.EditProfile.current_password}
                    mode='outlined'
                    value={this.state.currentpassword}
                    underlineColor="#696969"
                    onChangeText={handleChange('current_pwd')}
                    onBlur={() => setFieldTouched('current_pwd')}
                    secureTextEntry={this.state.showPassword}
                   // onChangeText={currentpassword => this.setState({ currentpassword })}
                    left={
                      <TextInput.Icon name={this.state.eyeIcon_current} size={20} color={'#ffd700'}
                        onPress={() => this.eyeicon_PaswwordClick("current")} />
                    }

                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                    style={styles.inputStyle} />
                    
                    {touched.current_pwd && errors.current_pwd &&
                    <Text style={styles.errorMessage}>{errors.current_pwd}</Text>
                  }

                  <TextInput label={LABELCONSTANT.EditProfile.new_password}
                    mode='outlined'
                    left={
                      <TextInput.Icon name={this.state.eyeIcon_new} size={20} color={'#ffd700'}
                        onPress={() => this.eyeicon_PaswwordClick("new")} />
                    }
                    secureTextEntry={this.state.new_showpassword}
                    underlineColor="#696969"
                    onChangeText={handleChange('new_pwd')}
                    onBlur={() => setFieldTouched('new_pwd')}
                   // onChangeText={(newpassword) => this.setState({ newpassword })}
                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                    style={styles.inputStyle} />

                  {touched.new_pwd && errors.new_pwd &&
                    <Text style={styles.errorMessage}>{errors.new_pwd}</Text>
                  }

                  <TextInput label={LABELCONSTANT.EditProfile.reconfirm}
                    mode='outlined'
                    left={
                      <TextInput.Icon name={this.state.eyeIcon_new} size={20} color={'#ffd700'}
                        onPress={() => this.eyeicon_PaswwordClick("")} />
                    }
                    secureTextEntry={this.state.new_reconfirm}
                    underlineColor="#696969"
                    onChangeText={handleChange('reconfirm')}
                    onBlur={() => setFieldTouched('reconfirm')}
                   // onChangeText={(newpassword) => this.setState({ newpassword })}
                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                    style={styles.inputStyle} />

{touched.reconfirm && errors.reconfirm &&
                    <Text style={styles.errorMessage}>{errors.reconfirm}</Text>
                  }

                  <TouchableOpacity
                    style={styles.loginbtn}
                    onPress={handleSubmit}>

                    <Text style={styles.btntext}> {LABELCONSTANT.EditProfile.update_password}</Text>

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
    backgroundColor: "#fff",
    flexDirection: 'row'
  },
  layoutstyle1: {
    flex: 1,
    margin: 5,
    justifyContent: "center",

  },
  layoutscroll: {
    marginHorizontal: 0,

  },
  inputStyle: {
    marginTop: 10,
    margin: 10,
    backgroundColor: "#fff"
  },
  toolbarstyle: {
    backgroundColor: "#fff"
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
    margin: 10,
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
    alignSelf: 'center',

  },
  notlogin: {
    fontSize: 15,
    color: "#696969"
  },
  fotgettext: {
    margin: 5,
    fontSize: 12,
    alignSelf: 'center',
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

