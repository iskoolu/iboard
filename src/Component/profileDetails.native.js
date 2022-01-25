import React, { Component ,Fragment} from 'react'
import { StyleSheet, View, Keyboard,Text, BackHandler, ScrollView, RefreshControl ,TouchableOpacity } from 'react-native';
import { Avatar, TextInput, Appbar, Button ,IconButton,Colors} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import LABELCONSTANT from '../shared/label.constants';
import axios from 'axios';
import { Formik } from 'formik';
import { POST_UPDATE_IMAGE, BASE_URL_LOGIN, INDIV_POST_ADDINFO ,GET_USER_DETAILS} from '../services/api.constans';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Modal from 'react-native-modal';
import Emailupdate from './Emailupdate.native';
import { StackActions, NavigationActions } from 'react-navigation';
import VerifyAccount from './VerifyAccount.native';
import Mobileupdate from './Mobileupdate.native';

export default class profileDetails extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      username: '', email: '', mobile: "xxxxxxxxxx", image_URL: null,image_send:'',image_sendURL:'',
      userInfo: '',show_modal:false,
      authorization: '',
      mail_modal:false,otp_modal:false,pass_otpdata:'', mobile_modal:false,
      interested_value: '', about_value: '', dateofBirth__value: '',
      pincode_value: '', city_value: '', state_value: '',
      texturl_facebook: "", texturl_youtube: "", texturl_insta: "",
      texturl_linked: "", texturl_twitter: "", texturl_web: "", refreshing: false,
      TextInputDisableStatus: false,
      buttondisablestatus: false,errorprofeesion:false,errorgender:false,
      professionlist: [
        { id: 0, profession: 'PROFESSION' ,Value:''},
        { id: 1, profession: 'Teacher',Value:'Teacher' },
        { id: 2, profession: 'Lecture',Value:'Lecture' },
        { id: 3, profession: 'Professor' ,Value:'Professor'},
        { id: 4, profession: 'Professional' ,Value:'Professional'},
        { id: 5, profession: 'House Maker',Value:'House Maker' },
        { id: 6, profession: 'others' ,Value:'others'}
      ],
      PickerSelectedVal: '',profeesionVal:'',othervalue:'',
      genderList: [
        { id: 0, genderval: 'GENDER',Value:''},
        { id: 1, genderval: 'Male' ,Value:'Male'},
        { id: 2, genderval: 'Female',Value:'Female' },
        { id: 3, genderval: 'Transgender',Value:'Transgender' },
      ],
      select_gendervalue: '',genderVal: '',
      showpicker: false,
      choose_Type:'',
      error_show_msg:'',
      error_showvalue:true,  error_facebook:false,error_youtube:false,
      error_insta:false,error_linked:false,error_twitter:false,error_web:false,
    };

    this.userdata();
    console.log("data 1")

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

      
      //  500000 2776277 Photo size should be at least 100px wide and upto 500KB. 
      // Photo formate supported are .jpg,.png,.gif and .bmp
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
    console.log(JSON.stringify(payload));

    axios.post(BASE_URL_LOGIN+POST_UPDATE_IMAGE, payload,
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
        profeesionVal: item.profession, genderValue: item.gender,
        PickerSelectedVal: item.profession, select_gendervalue: item.gender,
        choose_Type:item.userType
      })

      const pincode = String(item.pincode);
     
      console.log("texturl_facebook", this.state.texturl_facebook);
      if(pincode == "null"){

        this.setState({pincode_value: ''});
      }
      else{

        this.setState({pincode_value: pincode});
      }

     
    } catch (e) {
      console.log(e)
      // error reading value
    }

  };

  pincodeurl = (pincode) => {
    let self = this;

    this.setState({ pincode_value: pincode })
    axios.get("https://api.postalpincode.in/pincode/" + pincode,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        // handle success

        if (response.data[0].Status == "Success") {

       
          const state_Set = response.data[0].PostOffice[0].State;
          const district_Set = response.data[0].PostOffice[0].District;

          self.setState({ city_value: district_Set, state_value: state_Set })

        } else {

          self.setState({ city_value: "", state_value: "" })

        }

      })
      .catch(function (error) {
        console.log("error", error);
      });

  }
  onSubmit = (values) => {
    let self = this;

    
    let valuestore = values;

   
    const params = JSON.stringify({
      "aboutYou": this.state.about_value,
      "city": this.state.city_value,
      "dateOfBirth": this.state.dateofBirth__value,
      "faceLink": valuestore.facebookurl,
      "gender": this.state.select_gendervalue,
      "imageUrl": this.state.image_sendURL,
      "instaLink": valuestore.instagramurl,
      "interestedIn": this.state.instagramurl,
      "linkinLink": valuestore.linkedinurl,
      "pincode": this.state.pincode_value,
      "profession":this.state.PickerSelectedVal == "others"?(this.state.othervalue):(this.state.PickerSelectedVal),
      "state": this.state.state_value,
      "twiLink": valuestore.twitterurl,
      "webUrl": valuestore.websiteurl,
      "youLink": valuestore.youtubeurl,
      "fullName":this.state.username
    });
   
    axios.post(BASE_URL_LOGIN+INDIV_POST_ADDINFO, params,
      {
        headers: {
          'Authorization':self.state.authorization,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        // handle success

        if (response.data.status == "success") {

          console.log(response.data);
          Keyboard.dismiss;

          
          self.setState({genderValue:self.state.select_gendervalue})
          self.onPressdisableButton();
          Toast.show(response.data.data, Toast.SHORT);
          self.userDatafunction();
          self.setState({errorprofeesion:false})
        
          // self.setState({error_facebook:false,error_youtube:false,
          //   error_insta:false,error_linked:false,error_twitter:false,error_web:false,})

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

  userDatafunction = () =>{

    let self = this;
   
    let token = self.state.authorization;

    axios.get(BASE_URL_LOGIN+GET_USER_DETAILS, {
      headers: {
        'Authorization': token
      }
    })
    .then((response) => {
      

     
      self.setState({profeesionVal:response.data.profession})
      self.setState({othervalue:response.data.profession})
      console.warn("userDatafunction",response.data)
      self.setState({userInfo: response.data});
      self.savenormalloginData();
      
    
    })
    .catch((error) => {
      console.error(error)
    })
  
  }

  savenormalloginData () {  

    var data = this.state.userInfo;
    let user_value = data;  
   
    var authtoken = this.state.authorization;
  
    AsyncStorage.setItem("userinfo",JSON.stringify(user_value));  
  }  
 
  show_Modalfun = () => {

    this.setState({ show_modal: this.show_modal = true })

  }

  hide_modelfunc = () => {

    this.setState({ show_modal: this.show_modal = false })

  }
  remove_pic = () => {

    this.setState({ image_URL: null })

    this.hide_modelfunc();
  }
  onPressdisableButton = () => {  
    // this.setState({ showeditmodel: true })  
       this.setState({ TextInputDisableStatus: false })  
       this.setState({ buttondisablestatus: false})  
   }
  
  onPressButton = () => {  
   // this.setState({ showeditmodel: true })  
      this.setState({ TextInputDisableStatus: true })  
      this.setState({ buttondisablestatus: true})  
  }
  selectedValue_fun = (itemvalue,index) => {  

    console.log(itemvalue)
    const value = itemvalue;
    
    if(value == ""){

      this.setState({errorprofeesion :true})
     
    }
    else{

      this.setState({errorprofeesion :false})
      this.setState({ PickerSelectedVal: value })  
      this.setState({ profeesionVal: this.state.PickerSelectedVal }) 
    }
  
    
  }

  selectedGender_fun = (itemvalue,index) => {  

    console.log(itemvalue)
    const value = itemvalue;
    
    if(value == ""){

      this.setState({errorgender :true})
     
    }
    else{

      this.setState({errorgender :false})
      this.setState({ select_gendervalue: value }) 
      this.setState({ genderValue: this.state.select_gendervalue }) 
    }
  
    
  }

 validate_url = (type,url)=>
{

  if(type == "facebook"){

  if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(url))
  {

    this.setState({ texturl_facebook: url, error_facebook:false })
   
  }
  else{

    this.setState({ error_facebook:true})
  }

  }
  else if(type == "youtube"){

    if (/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(url))
    {
  
      this.setState({ texturl_youtube: url, error_youtube:false  })
  
    
      
    }
    else{
  
    
      this.setState({ error_youtube:true})
    }

  }

  else if(type == "insta"){
  

  if (/(https?:\/\/(www\.)?)?instagram\.com(\/p\/\w+\/?)/.test(url))
  {

    this.setState({ texturl_insta: url ,error_insta:false })

   
    
  }
  else{

    this.setState({ error_insta:true})

  }

  }
  else if(type == "linked"){

    if (/http(s)?:\/\/([w]{3}\.)?linkedin\.com\/in\/([a-zA-Z0-9-])\/?/.test(url))
    {
  
      this.setState({ texturl_linked: url,error_linked:false  })
  
   
      
    }
    else{
      this.setState({ error_linked:true})
    }

  }
  else if(type == "twitter"){

    if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(url))
    {
  
      this.setState({ texturl_twitter: url,error_twitter:false  })
  
    
      
    }
    else{
  
      this.setState({ error_twitter:true})
    }

  }
  else{

   let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/; 
      
   if (regexp.test(url)) 
        { 
          this.setState({ texturl_web: url,error_web:false  })
        } 
        else 
        { 
          this.setState({ error_web:true})
         
        } 

  }


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
   
  //  this.props.navigation.navigate('verifyAccount', { data})

   //this.setState({email: data.Email})
    console.log(data)

  }

  mobileunction = (data) =>{

    this.hide_mobileModal();
    this.setState({pass_otpdata:data})

    this.show_otpModal();
  //  this.props.navigation.navigate('verifyAccount', { data})

   //this.setState({email: data.Email})
    console.log(data)

  }


  otpFunction = (data) =>{

     if(data.key == "mail"){

       this.setState({email: data.mail})
     }
     else
    if(data.key == "mobile"){

      this.setState({mobile: data.mobile})
    }
    else{

     
    }
    //this.setState({email: data.mail})
   this.userDatafunction();
   
    console.log(data)
    this.hide_otpModal();

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

            <Emailupdate choosevalue = "indi_email" emailupdate_data={this.emailFunction.bind(this)} />
          </SwipeablePanel>

          <SwipeablePanel isActive={this.state.mobile_modal}
            fullWidth={true}
            openLarge={false}
            onClose={() => this.hide_mobileModal()}>

            <Mobileupdate choosevalue ="indi_mobile" mobileupdate_data={this.mobileunction.bind(this)} />

          </SwipeablePanel>

          
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'> 
        <Formik
        enableReinitialize
         initialValues={
          {
            facebookurl: this.state.texturl_facebook, youtubeurl: this.state.texturl_youtube,
             instagramurl: this.state.texturl_insta,
            linkedinurl: this.state.texturl_linked, twitterurl: this.state.texturl_twitter, 
            websiteurl: this.state.texturl_web
          }
           } 
            validationSchema={yup.object().shape({
              facebookurl: yup
                .string()
                .matches(
                  /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              youtubeurl: yup
                .string()
                .matches(
                  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              instagramurl: yup
                .string()
                .matches(
                  /(https?:\/\/(www\.)?)?instagram\.com(\/p\/\w+\/?)/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              linkedinurl: yup
                .string()
                .matches(
                  /http(s)?:\/\/([w]{3}\.)?linkedin\.com\/in\/([a-zA-Z0-9-])\/?/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              twitterurl: yup
                .string()
                .matches(
                  /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              websiteurl: yup
                .string()
                .matches(
                  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                ),
              
              

            })}
            onSubmit={(values, actions) => {


              //actions.resetForm();
              //this.submitAllDetails(values);

              this.onSubmit(values);


            }}>

     {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>     
          <View style={styles.iconviewstyleedit}>
            <Text style={styles.textsmallstyle}>Profile Photo</Text>
            {/* <IconButton style={{alignItems:'flex-end'}}
                         icon="account-edit"
                         color="#ffd700"
                         onPress={() => this.handleChoosePhoto()}
                         size={20}/> */}
          </View>
          <TouchableOpacity>
            <View style={styles.imageviewstyle}>

              <Avatar.Image style={styles.imagestyle} size={80}
                source={{ uri: this.state.image_URL }}  />

              <Button style={styles.editstyle} icon="camera" mode="Text" color="#ffd700"
               disabled = {this.state.buttondisablestatus?(false):(true)}
                onPress={() => this.show_Modalfun()}>

                <Text style={styles.buttontextstyle}>Add Photo</Text>

              </Button>


            </View>
          </TouchableOpacity>
          <View style={styles.divederstyle} />
          <View style={styles.iconviewstyle}>

            <TextInput label={LABELCONSTANT.LBL_REGISTER.FirstName}   
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.LBL_REGISTER.FirstName}
              value={this.state.username}
              selectTextOnFocus={false}     
              onChangeText={username => this.setState({ username })}
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle } />


            <TouchableOpacity style={styles.inputStyle}
             disabled = {this.state.buttondisablestatus?(false):(true)}
              onPress={() => this.showDatePicker()}>
              <TextInput label={LABELCONSTANT.LBL_WELCOME.DATE_BIRTH}
                underlineColor="#696969"
                editable={false}
              //  editable={this.state.TextInputDisableStatus}  
                value={this.state.dateofBirth__value}
                mode="outlined"
                left={
                  <TextInput.Icon name="calendar-month" size={20} color={'#696969'} />
                }
                onChangeText={fromdate_value => this.setState({ fromdate_value })}
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
              />

            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={this.state.showpicker}
              mode="date"
              maximumDate={new Date()}
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker} />

            {this.state.TextInputDisableStatus?null:(
             <TextInput label={LABELCONSTANT.profile.profession}    
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.profile.profession}
              value={this.state.profeesionVal}
              selectTextOnFocus={false}     
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle } />
              )}

             
           {this.state.TextInputDisableStatus?(
            <Picker
              enabled={this.state.TextInputDisableStatus}
              selectedValue={this.state.PickerSelectedVal}
              onValueChange={(itemValue, itemIndex) => this.selectedValue_fun(itemValue,itemIndex)}
            >
              
              { this.state.professionlist.map((item, key) => {
                  return <Picker.Item label={item.profession} value={item.Value} />

                })
              } 
          
            </Picker>
            ):null}


            {this.state.errorprofeesion == true ? (
                   <Text style={styles.errorMessage}>
                   Please select a option </Text>) : null }

          {this.state.PickerSelectedVal == 'others' && this.state.TextInputDisableStatus ? (
           <TextInput label={LABELCONSTANT.LBL_WELCOME.OTHERS_PROFESSION}
            style={styles.inputStyle}
            underlineColor="#696969"
            mode='outlined'
            editable={this.state.TextInputDisableStatus}  
            placeholder={ LABELCONSTANT.LBL_WELCOME.OTHERS_PROFESSION}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
            onChangeText={othervalue => this.setState({ othervalue })}
            theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} /> ):null}

  {this.state.TextInputDisableStatus?(
            <Picker
              enabled={this.state.TextInputDisableStatus}
              selectedValue={this.state.select_gendervalue}
             // onValueChange={this.state.TextInputDisableStatus == true?(
              //  (itemValue, itemIndex) => this.selectedGender_fun(itemValue,itemIndex)):null}
              onValueChange={(itemValue, itemIndex) => this.selectedGender_fun(itemValue,itemIndex)}
            >
             {
                this.state.genderList.map((item, key) => {
                  return <Picker.Item label={item.genderval} value={item.Value} />

                })
              } 

            </Picker>
              ):null}

{this.state.TextInputDisableStatus?null:(
               <TextInput label={LABELCONSTANT.profile.gender}   
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.profile.gender}
              value={this.state.genderValue}
              selectTextOnFocus={false}     
              
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle } />
          
              )}

            {this.state.errorgender == true ? (
                   <Text style={styles.errorMessage}>
                   Please select a option </Text>) : null }

            <TextInput label={LABELCONSTANT.LBL_WELCOME.ABOUT_INFO}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              placeholder={LABELCONSTANT.LBL_WELCOME.ABOUT_INFO}
              value={this.state.about_value}
              maxLength={100}
              onChangeText={about_value => this.setState({ about_value })}
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.PINCODE}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              keyboardType={'numeric'}
              maxLength={6}
              value={this.state.pincode_value}
              onChangeText={pincode_value => this.pincodeurl(pincode_value)}
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.CITY_NAME}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              value={this.state.city_value}
              onChangeText={city_value => this.setState({ city_value })}
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle} />

            <TextInput label={LABELCONSTANT.LBL_WELCOME.STATE}
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              value={this.state.state_value}
              onChangeText={state_value => this.setState({ state_value })}
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle} />


            <TextInput
              underlineColor="#696969"
              mode='outlined'
              editable={this.state.TextInputDisableStatus}  
              theme={this.state.TextInputDisableStatus ?(
                {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                (
                  {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
              }
              style={styles.inputStyle}
              value={this.state.interested_value}
              label={LABELCONSTANT.LBL_WELCOME.INTERESTED}
              onChangeText={interested_value => this.setState({ interested_value })}
              placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

          
             <TextInput
             underlineColor="#696969"
             mode='outlined'
             theme={this.state.TextInputDisableStatus ?(
              {colors: { primary: 'gray', underlineColor: 'transparent' }}):
              (
                {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
            }
             style={styles.inputStyle}
             editable={this.state.TextInputDisableStatus}  
             value={values.facebookurl}
             left={
              <TextInput.Icon name="facebook" size={20} color={'#696969'}   />
            }
             label={LABELCONSTANT.LBL_WELCOME.FACEBOOK}
             onChangeText={handleChange('facebookurl')}
             onBlur={() => setFieldTouched('facebookurl')}
             //onChangeText={texturl_facebook =>this.validate_url( "facebook",texturl_facebook )}
             
            //onChangeText={texturl_facebook => this.setState({ texturl_facebook })}
             placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

             {touched.facebookurl && errors.facebookurl &&
                  <Text style={styles.errorMessage}>{errors.facebookurl}</Text>
                }
            
            {this.state.error_facebook == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }
          
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
                style={styles.inputStyle}
                editable={this.state.TextInputDisableStatus}  
                value={values.youtubeurl}
                left={
                  <TextInput.Icon name="youtube" size={20} color={'#696969'}   />
                }
                onChangeText={handleChange('youtubeurl')}
                onBlur={() => setFieldTouched('youtubeurl')}
                label={LABELCONSTANT.LBL_WELCOME.YOU_TUBE}
                //onChangeText={texturl_youtube =>this.validate_url( "youtube",texturl_youtube )}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

 {touched.youtubeurl && errors.youtubeurl &&
                  <Text style={styles.errorMessage}>{errors.youtubeurl}</Text>
                }
{this.state.error_youtube == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }
          
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
                style={styles.inputStyle}
                editable={this.state.TextInputDisableStatus}  
                value={values.instagramurl}
                left={
                  <TextInput.Icon name="instagram" size={20} color={'#696969'}   />
                }
                onChangeText={handleChange('instagramurl')}
                onBlur={() => setFieldTouched('instagramurl')}
                label={LABELCONSTANT.LBL_WELCOME.INSTAGRAM}
              //  onChangeText={texturl_insta => this.validate_url("insta", texturl_insta )}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

                {touched.instagramurl && errors.instagramurl &&
                  <Text style={styles.errorMessage}>{errors.instagramurl}</Text>
                }

{this.state.error_insta == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }
           
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
                style={styles.inputStyle}
                editable={this.state.TextInputDisableStatus}  
                value={values.linkedinurl}
                left={
                  <TextInput.Icon name="linkedin" size={20} color={'#696969'}   />
                }
                onChangeText={handleChange('linkedinurl')}
                onBlur={() => setFieldTouched('linkedinurl')}
                label={LABELCONSTANT.LBL_WELCOME.LINKED}
               // onChangeText={texturl_linked => this.validate_url("linked",texturl_linked)}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

                 {touched.linkedinurl && errors.linkedinurl &&
                  <Text style={styles.errorMessage}>{errors.linkedinurl}</Text>
                }

{this.state.error_linked == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }
            
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
                style={styles.inputStyle}
                editable={this.state.TextInputDisableStatus}  
                value={values.twitterurl}
                left={
                  <TextInput.Icon name="twitter" size={20} color={'#696969'}   />
                }
                label={LABELCONSTANT.LBL_WELCOME.TWITTER}
                onChangeText={handleChange('twitterurl')}
                onBlur={() => setFieldTouched('twitterurl')}
               // onChangeText={texturl_twitter =>this.validate_url( "twitter",texturl_twitter )}
               // onChangeText={texturl_twitter => this.setState({ texturl_twitter })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

                 {touched.twitterurl && errors.twitterurl &&
                  <Text style={styles.errorMessage}>{errors.twitterurl}</Text>
                }

         {this.state.error_twitter == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }
           
              <TextInput
                underlineColor="#696969"
                mode='outlined'
                theme={this.state.TextInputDisableStatus ?(
                  {colors: { primary: 'gray', underlineColor: 'transparent' }}):
                  (
                    {colors: { primary: 'gray', underlineColor: 'transparent',text:'#D3D3D3'}})
                }
                style={styles.inputStyle}
                left={
                  <TextInput.Icon name="web" size={20} color={'#696969'}   />
                }
                editable={this.state.TextInputDisableStatus}  
                value={values.websiteurl}
                label={LABELCONSTANT.LBL_WELCOME.WEB}
                onChangeText={handleChange('websiteurl')}
                onBlur={() => setFieldTouched('websiteurl')}
               // onChangeText={texturl_web =>this.validate_url( "web",texturl_web )}
               // onChangeText={texturl_web => this.setState({ texturl_web })}
                placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />

                 {touched.websiteurl && errors.websiteurl &&
                  <Text style={styles.errorMessage}>{errors.websiteurl}</Text>
                }

      {this.state.error_web == true ? (
                   <Text style={styles.errorMessage}>
                     {LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL}</Text>) : null }

                {this.state.buttondisablestatus?(<Button 
             // style = {styles.buttonstyle}
              style={isValid ? (styles.buttonstyle) : (styles.buttonhidestyle)}
            //  onPress={() => this.onSubmit()}
              onPress={handleSubmit}
              color="#696969"
              mode="contained" >

              <Text style={{ color: "#ffd700" }}>{LABELCONSTANT.EditProfile.update_profile}</Text>

            </Button>):(null)}


            

            <TextInput label={LABELCONSTANT.LBL_REGISTER.EMAIL}
              mode='outlined'
              underlineColor="#696969"
              value={this.state.email}
              editable={false}
              right={
                <TextInput.Icon name="pencil" size={20} color={'#696969'} 
               // onPress = {() => this.props.navigation.navigate('emailupdate',{Choose:'indi_email'})}
               onPress = {() => this.show_mailModal()}
                 
                />
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
               // onPress = {() => this.props.navigation.navigate('mobileupdate',{Choose:'indi_mobile'})}
                onPress = {() => this.show_mobileModal()} />
              }
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
              style={styles.inputStyle} />

            <Button style={styles.updatestyle}
           
              icon="lock-outline" mode="Text" color="#000"
              onPress = {() => this.props.navigation.navigate('changePassword',{Choose:this.state.choose_Type})}
               >

              <Text style={styles.updatetextstyle}>Change Password</Text>
            </Button>

          
          </View> 
         
          </View> 
   )}
          </Formik>

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
  buttonhidestyle: {
    backgroundColor: "#e3f2fd",
    margin: 5,
    padding: 5,
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
  imageviewstyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  nameviewstyle: {
    flex: 1,
    marginTop: 5,
  },
  imagestyle: {
    margin: 10,
    //backgroundColor:"#000",
   
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
  iconviewstyleedit: {
    padding: 10,
    flexDirection:'row'
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
  errorMessage: {
    fontSize: 14,
    color:"red",
    padding: 3 ,
  },
  inputStyle: {
    backgroundColor: "#fff",
    padding: 5,
   
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },
 


});



