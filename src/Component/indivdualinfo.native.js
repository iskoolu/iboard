import React, { Component,Fragment } from 'react'
import { StyleSheet, BackHandler,View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import LABELCONSTANT from '../shared/label.constants';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar,Appbar,Button,Colors,IconButton} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {INDIV_POST_ADDINFO,BASE_URL_LOGIN,POST_UPDATE_IMAGE,GET_USER_DETAILS} from '../services/api.constans';
import axios from 'axios';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Toast from 'react-native-simple-toast';

export default class indivdualinfo extends Component {

  constructor(props) {
    super(props);
    let choosename = LABELCONSTANT.LBL_REGISTER.INSTITUTION
    var now = moment().format();
    var currentDate = moment().format("DD/MM/YYYY");
    console.log("checking" + choosename);

    this.state = {
    
      dateofBirth__value: "",
      gender_selectvalue:"",
      maxLength :200,
      about_value:"",
      pincode_value:"",
      city_value:"",
      state_value:"",
      interested_value:"",
      PickerSelectedVal : "",othervalue:'',sendProfession:'',
      currentdate: currentDate, ImageSource:null,send_image:'', error_show_msg:'',
      error_showvalue:true,image_send:'',image_sendURL:'',show_modal:false,
      professionlist: [
        { id: 0 ,profession: 'Profession'},
        { id: 1 ,profession: 'Teacher'},
        { id: 2 ,profession: 'Lecture'},
        { id: 3 ,profession: 'Professor'},
        { id: 4 ,profession: 'Professional'},
        { id: 5 ,profession: 'House Maker'},
        { id: 6 ,profession: 'others'}
       ],
       genderList: [
        { id: 0 ,genderval: 'Gender'},
        { id: 1 ,genderval: 'Male'},
        { id: 2 ,genderval: 'Female'},
        { id: 3 ,genderval: 'Transgender'},
       ],
       textLength: 0,
       textbox_facebook:false, textbox_youtube:false, textbox_insta:false,
       textbox_linked:false, textbox_twitter:false,textbox_web:false,
       placeholder_facebook:"",  placeholder_youtube:"",  placeholder_insta:"",
       placeholder_linked:"",  placeholder_twitter:"", placeholder_web:"",
       texturl_facebook:"",  texturl_youtube:"",  texturl_insta:"",
       texturl_linked:"",  texturl_twitter:"", texturl_web:"",
       authorization:'',
    };

    this.authtoken_fun();
  
  }

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization:value});
     
     
    } catch(e) {
      // error reading value
    }
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
  
  handleChoosePhoto = () => {
    this.hide_modelfunc();
    const options = {
      noData: true,
  }
   
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
  
            this.setState({ ImageSource: response.uri });
            this.setState({error_showvalue:true})
            this.setState({image_send : response})

            this.uploadimage();
          }
          else{
  
            this.setState({error_showvalue:false})
            this.setState({error_show_msg: LABELCONSTANT.EditProfile.photo_size})
  
          }
         
         //send_image
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

  onChangeText(text){

    this.setState({
      textLength: this.state.maxLength - text.length,
      about_value:text
    });

    if(this.state.textLength == 0){


      console.log("not type",this.state.textLength);
    }
    else
    {
      console.log(" type",this.state.textLength);
    }
  }

  validateInputs = ( type) => {

    // let numreg = /[0-9 /\W|_/g ]+$/;

    if (type == 'facebook') {

        this.setState({placeholder_facebook: LABELCONSTANT.LBL_WELCOME.FACEBOOK,textbox_facebook:true});

    }
    else if (type == 'youtube') {

      this.setState({placeholder_youtube: LABELCONSTANT.LBL_WELCOME.YOU_TUBE,textbox_youtube:true });

    }
    else  if (type == 'insta') {

      this.setState({placeholder_insta: LABELCONSTANT.LBL_WELCOME.INSTAGRAM,textbox_insta:true });

    }
  
    else if (type == 'linked') {

      this.setState({placeholder_linked: LABELCONSTANT.LBL_WELCOME.LINKED ,textbox_linked:true});


    }
    else if (type == 'twitter') {

     
      this.setState({placeholder_twitter: LABELCONSTANT.LBL_WELCOME.TWITTER ,textbox_twitter:true});

    }
    else {
      this.setState({placeholder_web: LABELCONSTANT.LBL_WELCOME.WEB,textbox_web:true });

    }

  }
  pincodeurl=(pincode)=>{
    let self = this;

    this.setState({pincode_value:pincode})
    axios.get("https://api.postalpincode.in/pincode/"+pincode,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success

      if(response.data[0].Status == "Success" ){

        console.log(response.data);
        const state_Set = response.data[0].PostOffice[0].State;
        const district_Set = response.data[0].PostOffice[0].District;
        
        self.setState({city_value:district_Set,state_value:state_Set})
        
      }else{

        self.setState({city_value:"",state_value:""})

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
   
    // const profession_send = '';
    // if(this.state.PickerSelectedVal == "others")
    // {
    //   this.setState({sendProfession : this.state.othervalue}) ;
    // }
    // else{
    //   this.setState({sendProfession : this.state.PickerSelectedVal}) ;
      
    // }

    // console.log("sendProfession", this.state.sendProfession);

    const params = JSON.stringify({
      "aboutYou": this.state.about_value,
      "city": this.state.city_value,
      "dateOfBirth": this.state.dateofBirth__value,
      "faceLink": this.state.texturl_facebook,
      "gender": this.state.gender_selectvalue,
      "imageUrl": this.state.image_sendURL,
      "instaLink": this.state.texturl_insta,
      "interestedIn": this.state.interested_value,
      "linkinLink": this.state.texturl_linked,
      "pincode": this.state.pincode_value,
      "profession":this.state.PickerSelectedVal == "others"?(this.state.othervalue):(this.state.PickerSelectedVal),
      "state": this.state.state_value,
      "twiLink": this.state.texturl_twitter,
      "webUrl": this.state.texturl_web,
      "youLink": this.state.texturl_youtube,
      "fullName":""
    });
   
    console.log("params", params);

    axios.post(BASE_URL_LOGIN+INDIV_POST_ADDINFO,params,
      {
        headers: {
          'Authorization':self.state.authorization,
          'Content-Type': 'application/json'
        }
      })
    .then(function (response) {
      // handle success

      if (response.data.status == "success") {

        console.log("indiv",response.data);
        self.userDatafunction();
        Toast.show(response.data.data, Toast.SHORT);
       

      }
      else {

        console.log("indiv",response.data);
       
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
    console.log("test",token);

    axios.get(BASE_URL_LOGIN+GET_USER_DETAILS, {
      headers: {
        'Authorization': token
      }
    })
    .then((response) => {
      console.log(response.data)

      self.setState({userInfo: response.data});
      self.savenormalloginData();
      self.props.navigation.navigate('bottomNavigator')
    
    })
    .catch((error) => {
      console.error(error)
    })
    
  }

  savenormalloginData () {  

    var data = this.state.userInfo;
    let token_value = data;  
   
    var authtoken = this.state.authorization;
  //  let token = authtoken;  

    AsyncStorage.setItem("auth_Token",authtoken);  
    AsyncStorage.setItem("userinfo",JSON.stringify(token_value));  
    AsyncStorage.setItem("key","login");  
   

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

 show_Modalfun = () => {

    this.setState({ show_modal: this.show_modal = true })

  }

  hide_modelfunc = () => {

    this.setState({ show_modal: this.show_modal = false })

  }
  remove_pic = () => {

    this.setState({ ImageSource: null })

    this.hide_modelfunc();
  }

  render() {
    return (
      <View style={styles.Container}>

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
        <ScrollView style={styles.scrollView}>
          
          <Appbar.Header style = {styles.toolbarstyle}/>
        
     
    <View>
        <View style={{ flex: 1, flexDirection: 'row',
           margin: 10, padding: 0, justifyContent: "space-between", marginRight: 10 }}>
            <View  style={{ flex: 1,alignItems:"center", }} >
            
                <Avatar.Image size={100}
                  source ={{ uri:this.state.ImageSource}} color="#fff" />

                <Button  style = {styles.editstyle}
                 onPress={() => this.show_Modalfun()} icon="camera" mode="Text" color = "#ffd700" >
                
                  <Text style={styles.buttontextstyle}>Add Photo</Text>

            </Button>
                  
             
            </View>

          </View>

          { this.state.error_showvalue == false?(this.renderWarning()):null}
          <Picker 
              style={styles.inputStyle}
              selectedValue={this.state.PickerSelectedVal}
              onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})}>
                  {
                 this.state.professionlist.map( (v)=>{
                  
                  return <Picker.Item label={v.profession} value={v.profession} />
                   })
                  }
                
          </Picker>

          {this.state.PickerSelectedVal == 'others' ? (
           <TextInput
            style={styles.inputStyle}
            placeholder={ LABELCONSTANT.LBL_WELCOME.OTHERS_PROFESSION}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
            onChangeText={othervalue => this.setState({ othervalue })}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} /> ):null}


          <TextInput
            style={{ flex: 3, margin: 15, height: 80, borderColor: 'white', borderWidth: 1,
             backgroundColor: '#f5f5f5', borderRadius: 4, }}
            placeholder={ LABELCONSTANT.LBL_WELCOME.ABOUT_INFO}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
            onChangeText={this.onChangeText.bind(this)}
            maxLength={100}
          
             />
 

         <Text style={{
                fontSize:10,
                color:'lightgrey',
                textAlign: 'right',
                marginRight:20
                
            }}>  
                {this.state.textLength}/200
            </Text>
          <View style={{
            elavation: 1, alignItems: "center", flex: 0.1, flexDirection: 'row', margin: 15, height: 40,
            borderColor: 'white', borderWidth: 8, backgroundColor: 'white', borderRadius: 4, placeholderTextColor: 'red'
          }}>

            <DatePicker
              style={{ width: 320 }}
              date={this.state.dateofBirth__value} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder={ LABELCONSTANT.LBL_WELCOME.DATE_BIRTH}
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              maxDate={new Date()}
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  paddingRight: 180,
                },
                dateText: {
                  fontSize: 14,
                  color: 'black',
                  textAlign: "left",
                  placeholderTextColor: LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY

                }

              }}
              onDateChange={(dateofBirth__value) => { this.setState({ dateofBirth__value: dateofBirth__value }) }}
            />


          </View>

           <Picker 
               style={styles.inputStyle}
               selectedValue={this.state.gender_selectvalue}
               onValueChange={(itemValue, itemIndex) => this.setState({gender_selectvalue: itemValue})}>
                  {
                 this.state.genderList.map( (v)=>{
                  
                  return <Picker.Item label={v.genderval} value={v.genderval} />
                   })
                  }
                
          </Picker>

          <TextInput
            style={styles.inputStyle}
            placeholder={ LABELCONSTANT.LBL_WELCOME.PINCODE}
            keyboardType={'numeric'}
            maxLength={6}
            onChangeText = {pincode_value => this.pincodeurl(pincode_value)}
          //  onChangeText={pincode_value =>  this.setState({pincode_value})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />


          <TextInput
            style={styles.inputStyle}
            placeholder={ LABELCONSTANT.LBL_WELCOME.CITY_NAME}
            value= {this.state.city_value}
            onChangeText={city_value => this.setState({city_value})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />


                  
          <TextInput
            style={styles.inputStyle}
            placeholder={ LABELCONSTANT.LBL_WELCOME.STATE}
            value= {this.state.state_value}
            onChangeText={state_value => this.setState({state_value})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />


                  
          <TextInput
            style={styles.inputStyle}
            placeholder={ LABELCONSTANT.LBL_WELCOME.INTERESTED}
            onChangeText={interested_value => this.setState({interested_value})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />


                            
            <View style={{ flex: 1, flexDirection: 'row', margin: 10}}>

            <Icon.Button
              name="facebook-square"
              onPress={() =>this.validateInputs("facebook")}
              backgroundColor="#0000">

            </Icon.Button>

            <Icon.Button
              name="youtube-square"
              onPress={() =>this.validateInputs("youtube")}
              backgroundColor="#0000">

            </Icon.Button>

            <Icon.Button
              name="instagram"
              onPress={() =>this.validateInputs("insta")}
              backgroundColor="#0000">

            </Icon.Button>

            <Icon.Button
              name="linkedin-square"
              onPress={() =>this.validateInputs("linked")}
              backgroundColor="#0000">

            </Icon.Button>

            <Icon.Button
              name="twitter"
              onPress={() =>this.validateInputs("twitter")}
              backgroundColor="#0000">

            </Icon.Button>

            <MaterialCommunityIcons  style={{ marginTop: 7 }}
            name="web" color="#fff" 
            onPress={() =>this.validateInputs("web")}
            size={20}
            />
            

            </View>

           {this.state.textbox_facebook == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_facebook}
            onChangeText={texturl_facebook => this.setState({texturl_facebook})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

             {this.state.textbox_youtube == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_youtube}
            onChangeText={texturl_youtube => this.setState({texturl_youtube})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

             {this.state.textbox_insta == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_insta}
            onChangeText={texturl_insta => this.setState({texturl_insta})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

             {this.state.textbox_linked == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_linked}
            onChangeText={texturl_linked => this.setState({texturl_linked})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

             {this.state.textbox_twitter == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_twitter}
            onChangeText={texturl_twitter => this.setState({texturl_twitter})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

             {this.state.textbox_web == true ?(<TextInput
            style={styles.inputStyle}
            placeholder={ this.state.placeholder_web}
            onChangeText={texturl_web => this.setState({texturl_web})}
            placeholderTextColor={LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY} />):null} 

          <View style={{ flex: 1, flexDirection: 'row', margin: 10, padding: 0, justifyContent: "space-between", marginRight: 10 }}>

            <TouchableOpacity
               style = {styles.submitButton}
             onPress={() =>this.onSubmit() }
              >
              <Text style={styles.submitButtonText}> {LABELCONSTANT.LBL_COMMONS.SAVE} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.SkipButton}
              onPress={() =>this.userDatafunction() }>
              <Text style={styles.SkipButtonText}> {LABELCONSTANT.LBL_COMMONS.SKIP} </Text>
            </TouchableOpacity>
          </View>
          </View>
 
        
        </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    color: 'black',
    fontFamily: 'sans-serif',
    backgroundColor: 'black',
  },
  containerWarning: {
    flexDirection:'row',
    height: 40,
    width: "100%",
    backgroundColor: "red",
   // justifyContent: "center",
    alignItems: "center",
 },
  Text: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center",
    marginTop: 10,

  },
  Textwhite: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center",

  },
  inputStyle: {
    margin: 15,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: LABELCONSTANT.TEXTCOLOR.DARKGRAY,
    padding: 10,
    margin: 10,
    height: 50,
    marginLeft: 10,
    borderWidth: 1.5,
    borderRadius: 6,

  },
  submitButtonhide: {
    backgroundColor: "#e3f2fd",
    padding: 10,
    margin: 10,
    height: 50,
    marginLeft: 10,
    borderWidth: 1.5,
    borderRadius: 6,

  },
  errorMessage: {
    fontSize: 12,
    color: "red",
    marginLeft: 10,
    marginBottom: 4,
    padding: 3
  },
  submitButtonText: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollView: {
    color: 'black',
    marginHorizontal: 0,
  },
  ImageContainer: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    margin: 13,
    width: 150,
    height: 140,
    borderColor: 'white',
    borderWidth: 1,
    marginRight: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    justifyContent: "center",
  },

  SkipButton: {

    padding: 10,
    margin: 15,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 6,
    right: 0,
    position: 'absolute'

  },
  SkipButtonText: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 3, borderColor: LABELCONSTANT.TEXTCOLOR.DARKGRAY
  },
  toolbarstyle:{
    backgroundColor :'black',
  },

});
