import React, { Component ,Fragment} from 'react'
import { StyleSheet, View, Text, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, TextInput, Appbar, Button,IconButton,Colors } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import LABELCONSTANT from '../shared/label.constants';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import {  BASE_URL_LOGIN,GET_USER_DETAILS,
   INSTI_POST_ADDINFO, PINCODE_API } from '../services/api.constans';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SwipeablePanel } from 'rn-swipeable-panel';
import Emailupdate from './Emailupdate.native';
import VerifyAccount from './VerifyAccount.native';
import Mobileupdate from './Mobileupdate.native';

export default class profileDetails_institute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', email: '', mobile: "xxxxxxxxxx", image_URL: null,image_send:'',image_sendURL:'',
      userInfo: [],show_modal:false,
      authorization: '',
      mail_modal:false,otp_modal:false,pass_otpdata:'', mobile_modal:false,
      TextInputDisableStatus: false,
      buttondisablestatus: false,errorprofeesion:false,
      interested_value: '', about_value: '', dateofBirth__value: '',
      pincode_value: '', city_value: '', state_value: '',
      texturl_facebook: "", texturl_youtube: "", texturl_insta: "",
      texturl_linked: "", texturl_twitter: "", texturl_web: "",
      showpicker: false,
      choose_Type:'',
      error_show_msg:'',
      error_showvalue:true,
    };

    this.userdata();
  }

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

  hideDatePicker = () => {

    this.setState({ showpicker: this.showpicker = false })

  }
  handleConfirm = (date) => {


    var date_set = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear();

    this.setState({ dateofBirth__value: date_set })

    this.hideDatePicker();

  };
  showDatePicker = () => {


    this.setState({ showpicker: this.showpicker = true })

  }


  userdata = async () => {

    try {
      const value = await AsyncStorage.getItem("userinfo")
      const token = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: token });
      const item = JSON.parse(value);

      this.setState({
        username: item.name, email: item.email, image_URL: item.imageUrl,
        interested_value: item.interestedIn,
        about_value: item.aboutYou, dateofBirth__value: item.dateOfBirth,
        state_value: item.state, city_value: item.city,
        texturl_facebook: item.faceLink, texturl_youtube: item.youLink,
        texturl_insta: item.instaLink, texturl_linked: item.linkinLink,
        texturl_twitter: item.twiLink, texturl_web: item.webUrl,
        choose_Type:item.userType

      })

      const pincode = String(item.pincode);
      console.log(pincode)
      if(pincode == "null"){

        this.setState({pincode_value: ''});
      }
      else{

        this.setState({pincode_value: pincode});
      }
      console.log(item)
    } catch (e) {
      console.log(e)
      // error reading value
    }
  };

  pincodeurl = (pincode) => {
    let self = this;

    this.setState({ pincode_value: pincode })
    axios.get(PINCODE_API + pincode,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        // handle success

        if (response.data[0].Status == "Success") {

          console.log(response.data);
          const state_Set = response.data[0].PostOffice[0].State;
          const district_Set = response.data[0].PostOffice[0].District;

          self.setState({ city_value: district_Set, state_value: state_Set })

        } else {

          self.setState({ city_value: "", state_value: "" })

        }

      })
      .catch(function (error) {
        // handle error
        // alert("error"+error);
        console.log("error", error);
      });

  }
  handleChoosePhoto = () => {

    this.hide_modelfunc();
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {


        const filesize = response.fileSize;
        
        if( filesize < 500000){

          this.setState({ image_URL: response.uri });
          this.setState({error_showvalue:true})
          this.setState({image_send : response})

          this.uploadimage();
        }
        else{

          this.setState({error_showvalue:false})
          this.setState({error_show_msg: LABELCONSTANT.EditProfile.photo_size})

        }
       
     

      }
    });
  }

  uploadimage = () =>{

    let self = this;

    const image = self.state.image_send;

    var payload = new FormData();
    payload.append('file', {
            // data: response.data,
            uri: Platform.OS === 'android' ? image.uri : 'file://' + image.uri,
            name: image.fileName,
            type: image.type
        })

    axios.post("http://localhost:8000/iskoolu/api/v1/upload", payload,
      {
        headers: {
          'Authorization':self.state.authorization,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
        // handle success

        if (response.data.status == "success") {

          console.log(response.data);
         
          const url = response.data.data.url;
          self.setState({image_sendURL: url});
         
        }
        else {

          console.log(response.data);

        }

      })
      .catch(function (error) {
        // handle error
        // alert("error"+error);
        console.log("error", error);
      });

  }
  onSubmit = () => {
    let self = this;

    const params = {
      "aboutYou": this.state.about_value,
      "city": this.state.city_value,
      "dateOfEstablishment": this.state.dateofBirth__value,
      "faceLink": this.state.texturl_facebook,
      "imageUrl": this.state.image_sendURL,
      "instaLink": this.state.texturl_insta,
      "interestedIn": this.state.interested_value,
      "linkinLink": this.state.texturl_linked,
      "pincode": this.state.pincode_value,
      "state": this.state.state_value,
      "twiLink": this.state.texturl_twitter,
      "webUrl": this.state.texturl_web,
      "youLink": this.state.texturl_youtube,
     // "fullName":"",
      "fullName":this.state.username
    };


    axios.post(BASE_URL_LOGIN+INSTI_POST_ADDINFO, params,
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

          Toast.show(response.data.data, Toast.SHORT);
          self.userDatafunction();

        }
        else {

          console.log(response.data);
         
        }


      })
      .catch(function (error) {
        // handle error
        // alert("error"+error);
        console.log("error", error);
      });


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
  
userDatafunction = () =>{

    let self = this;
   
    let token = self.state.authorization;

    axios.get(BASE_URL_LOGIN+GET_USER_DETAILS, {
      headers: {
        'Authorization': token
      }
    })
    .then((response) => {
      console.log(response.data)

      self.setState({userInfo: response.data});
      self.savenormalloginData();
      
    
    })
    .catch((error) => {
      console.error(error)
    })
  
  }

  savenormalloginData () {  

    var data = this.state.userInfo;
    let token_value = data;  
   
    AsyncStorage.setItem("userinfo",JSON.stringify(token_value));  
   
  }  
  
  show_headingModal = () => {

    this.setState({ show_modal: this.show_modal = true })

  }

  hide_modelfunc = () => {

    this.setState({ show_modal: this.show_modal = false })

  }
  remove_pic = () => {

    this.setState({ image_URL: null })

    this.hide_modelfunc();
  }

  onPressButton = () => {  
   
    this.setState({ TextInputDisableStatus: true })  
    this.setState({ buttondisablestatus: true})  
  }

  show_mailModal = () => {

    this.setState({ mail_modal: this.mail_modal = true })

  }

  hide_mailModal = () => {

    this.setState({ mail_modal: this.mail_modal = false })

  }

  show_otpModal = () => {

    this.setState({ otp_modal: this.otp_modal = true })

  }

  hide_otpModal = () => {

    this.setState({ otp_modal: this.otp_modal = false })

  }
  show_mobileModal = () => {

    this.setState({ mobile_modal: this.mobile_modal = true })

  }

  hide_mobileModal = () => {

    this.setState({ mobile_modal: this.mobile_modal = false })

  }
  
  emailFunction = (data) =>{

    this.hide_mailModal();

    if(data.key == ""){
      

    }else {

      this.setState({pass_otpdata:data})

      this.show_otpModal();
    }
   //this.setState({email: data.Email})
    console.log(data)

  }

  mobileunction = (data) =>{

    this.hide_mobileModal();
    this.setState({pass_otpdata:data})

    this.show_otpModal();
  

   //this.setState({email: data.Email})
    console.log(data)

  }


  otpFunction = (data) =>{

    this.hide_otpModal();

    if(data.key == "mail"){

      this.setState({email: data.mail})
    }
    else
    if(data.key == "mobile"){

      this.setState({mobile: data.mobile})
    }
    else{

     
    }
  
    
   this.userDatafunction();
   
    console.log(data)

  }
 

  render() {

    return (
      <View style={styles.layoutstyle}>

          {this.state.otp_modal == false ?(  

<View  style={styles.layoutstyle}> 

        <Appbar.Header style={styles.toolbarstyle}>
          <Appbar.BackAction color='#696969' onPress={() => this.handleBackPress()} />
          <Appbar.Content/>
          <Appbar.Action color = '#696969'  icon="pencil-circle" size={30} onPress={this.onPressButton} />
        </Appbar.Header>

        <SwipeablePanel isActive={this.state.show_modal}
          openLarge={false} onlySmall={true}
            fullWidth={true} onClose={() => this.hide_modelfunc()} >

       <View style={{flex: 0.5, backgroundColor: "#fff" ,
                      marginLeft: 1, flexDirection: 'row', alignItems: "center",
                      marginTop: 10, justifyContent: 'space-between'
                    }}>

                      <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                       <IconButton
                         icon="delete"
                         color={Colors.DarkTheme}
                         
                         onPress={() => this.remove_pic()}
                         size={50}/>

                        <Text style={styles.subtextouthead}>Remove</Text>

                      </View>

                      <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                      <IconButton
                         icon="image"
                         color="#ffd700"
                         onPress={() => this.handleChoosePhoto()}
                         size={50}/>
                        <Text style={styles.subtextouthead}>Gallery</Text>

                      </View>

                      </View>
           
          </SwipeablePanel>

          { this.state.error_showvalue == false?(this.renderWarning()):null}

          
          <SwipeablePanel isActive={this.state.mail_modal}
            fullWidth={true}
           openLarge={false}
            onClose={() => this.hide_mailModal()}>

            <Emailupdate emailupdate_data={this.emailFunction.bind(this)} choosevalue ="institu_email"/>
          </SwipeablePanel>

        

          <SwipeablePanel isActive={this.state.mobile_modal}
            fullWidth={true}
           openLarge={false}
            onClose={() => this.hide_mobileModal()}>

            <Mobileupdate mobileupdate_data={this.mobileunction.bind(this)} choosevalue ="institu_mobile" />
          </SwipeablePanel>

        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View>     
          <View style={styles.iconviewstyle}>
            <Text style={styles.textsmallstyle}>Profile Photo</Text>

          </View>
          <TouchableOpacity>
            <View style={styles.imageviewstyle}>

              <Avatar.Image style={styles.imagestyle} size={80}
                source={{ uri: this.state.image_URL }} />

              <Button style={styles.editstyle} icon="camera" mode="Text" color="#ffd700"
                onPress={() => this.show_headingModal()} >

                <Text style={styles.buttontextstyle}>Add Photo</Text>

              </Button>


            </View>
          </TouchableOpacity>
          <View style={styles.divederstyle} />
          <View style={styles.iconviewstyle}>

            <TextInput label={LABELCONSTANT.LBL_REGISTER.FirstName}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.LBL_REGISTER.FirstName}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />


            <TouchableOpacity style={styles.inputStyle}
              disabled = {this.state.buttondisablestatus?(false):(true)}
              onPress={() => this.showDatePicker()}>
              <TextInput label={LABELCONSTANT.LBL_WELCOME.DATE_ESTABLISH}
                underlineColor="#696969"
                editable={false}  
                value={this.state.dateofBirth__value}
                mode="outlined"
                left={
                  <TextInput.Icon name="calendar-month" size={20} color={'#696969'} />
                }
                onChangeText={fromdate_value => this.setState({ fromdate_value })}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              />

            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={this.state.showpicker}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker} />


            <TextInput label={LABELCONSTANT.LBL_WELCOME.ABOUT_INFO}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.LBL_WELCOME.ABOUT_INFO}
              value={this.state.about_value}
              onChangeText={about_value => this.setState({ about_value })}
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.PINCODE}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              keyboardType={'numeric'}
              value={this.state.pincode_value}
              onChangeText={pincode_value => this.pincodeurl(pincode_value)}
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.CITY_NAME}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              value={this.state.city_value}
              onChangeText={city_value => this.setState({ city_value })}
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.STATE}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              value={this.state.state_value}
              onChangeText={state_value => this.setState({ state_value })}
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />


            <TextInput
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle}
              value={this.state.interested_value}
              label={LABELCONSTANT.LBL_WELCOME.INTERESTED}
              onChangeText={interested_value => this.setState({ interested_value })}
              placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

          
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                value={this.state.texturl_facebook}
                left={
                  <TextInput.Icon name="facebook" size={20} color={'#696969'}   />
                }
                label={LABELCONSTANT.LBL_WELCOME.FACEBOOK}
                onChangeText={texturl_facebook => this.setState({ texturl_facebook })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />
            

         
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                left={
                  <TextInput.Icon name="youtube" size={20} color={'#696969'}   />
                }
                value={this.state.texturl_youtube}
                label={LABELCONSTANT.LBL_WELCOME.YOU_TUBE}
                onChangeText={texturl_youtube => this.setState({ texturl_youtube })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />


           
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                value={this.state.texturl_insta}
                left={
                  <TextInput.Icon name="instagram" size={20} color={'#696969'}   />
                }
                label={LABELCONSTANT.LBL_WELCOME.INSTAGRAM}
                onChangeText={texturl_insta => this.setState({ texturl_insta })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

           
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                left={
                  <TextInput.Icon name="linkedin" size={20} color={'#696969'}   />
                }
                value={this.state.texturl_linked}
                label={LABELCONSTANT.LBL_WELCOME.LINKED}
                onChangeText={texturl_linked => this.setState({ texturl_linked })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

          
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                left={
                  <TextInput.Icon name="twitter" size={20} color={'#696969'}   />
                }
                value={this.state.texturl_twitter}
                label={LABELCONSTANT.LBL_WELCOME.TWITTER}
                onChangeText={texturl_twitter => this.setState({ texturl_twitter })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

           
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                editable={this.state.TextInputDisableStatus}  
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                style={styles.inputStyle}
                left={
                  <TextInput.Icon name="web" size={20} color={'#696969'}   />
                }
                value={this.state.texturl_web}
                label={LABELCONSTANT.LBL_WELCOME.WEB}
                onChangeText={texturl_web => this.setState({ texturl_web })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

               {this.state.buttondisablestatus?(<Button 
              style = {styles.buttonstyle}
              onPress={() => this.onSubmit()}
              color="#696969"
              mode="contained" >

              <Text style={{ color: "#ffd700" }}>{LABELCONSTANT.EditProfile.update_profile}</Text>

            </Button>):(null)}

            <TextInput label={LABELCONSTANT.LBL_REGISTER.EMAIL}
              mode='outlined'
              underlineColor="#696969"
              editable={false}
              value={this.state.email}
              right={
                <TextInput.Icon name="pencil" size={20} color={'#696969'} 
                //onPress = {() => this.props.navigation.navigate('emailupdate',{Choose:'institu_email'})} 
                onPress = {() => this.show_mailModal()} />
              }
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_REGISTER.MOBILE}
              mode='outlined'
              underlineColor="#696969"
              editable={false}
              value={this.state.mobile}
              right={
                <TextInput.Icon name="pencil" size={20} color={'#696969'} 
                
               // onPress = {() => this.props.navigation.navigate('mobileupdate',{Choose:'institu_mobile'})} 
                onPress = {() => this.show_mobileModal()} />
              }
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <Button style={styles.updatestyle}
              icon="lock-outline" mode="Text" color="#000"
              onPress = {() => this.props.navigation.navigate('changePassword',{Choose:this.state.choose_Type})} >

              <Text style={styles.updatetextstyle}>Change Password</Text>
            </Button>

        
          </View>

          </View>
        </ScrollView>

        </View>

             ): 
          
           <VerifyAccount otp_data={this.otpFunction.bind(this)} otppassData = {this.state.pass_otpdata}/>
           
     }
      </View>

    );
  }

}

const styles = StyleSheet.create({

  layoutstyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  btntext: {
    fontSize: 25,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
  imageviewstyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  containerWarning: {
    flexDirection:'row',
    height: 40,
    width: "100%",
    marginBottom:10,
    backgroundColor: "red",
   // justifyContent: "center",
    alignItems: "center",
 },
  nameviewstyle: {
    flex: 1,
    marginTop: 5,
  },
  imagestyle: {
    margin: 10,
  },
  updatetextstyle: {
    color: "#000",
    fontSize: 12,
    alignSelf: 'stretch'

  },
  updatestyle: {
    borderColor: "#696969",
    borderWidth: 1,
    margin: 5,
    padding: 5
  },
  textstyle: {
    color: "#696969",
    fontSize: 18,
  },
  editstyle: {
    width: "45%",
  },
  textsmallstyle: {
    color: "#696969",
    fontSize: 15,
  },
  divederstyle: {
    borderWidth: 0.4,
    borderColor: "#D3D3D3"
  },
  texticonstyle: {
    color: "#000",
    fontSize: 13,
  },
  iconviewstyle: {
    padding: 10
  },
  icontextviewstyle: {
    flex: 1,
    margin: 5,
    bottom: 5,
    alignItems: "center",
  },
  titlestyle: {
    color: "#696969",
    fontSize: 15,
    height: "26%",

  },
  inputStyle: {
    backgroundColor: "#fff",
    padding: 5
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },
  submitButtonhide: {
    backgroundColor: "#e3f2fd",
    margin: 20,
    padding: 5,
    justifyContent: "center",
  },
  buttonstyle: {
    color: "#696969",
    borderRadius: 4,
    margin: 20,
    padding: 5,
  },

});


