import React, { Component } from 'react';
import { Image, Switch, TouchableOpacity, ScrollView,
  Alert, View, StyleSheet, Text, BackHandler, FlatList } from 'react-native';
import { Button, IconButton, Card, Appbar, List, TextInput } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LABELCONSTANT from '../shared/label.constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Formik } from 'formik';
import * as yup from 'yup';
import Timeslot from './TimeSlot.native';
import AddHeading from './Addheading.native';
import { COURSE_POST_ADD_COURSE ,POST_UPDATE_IMAGE,BASE_URL_LOGIN } from '../services/api.constans';
import moment from 'moment';

export default class classDetails extends Component {

  constructor(props) {
    super(props);
    const data_pass = this.props.route.params.passdata;


    this.state = {

      coursename: '', coursenamevalidate: true,
      subjectkey: '', subjectkeyvalidate: true,
      Description: '', descriptionValidate: true, errorDescription: '',
      durationCalss: '', durationCalssvalidate: true, error_durationclass: '',
      noOfclass: '', noOfclassvalidate: true,
      sessionname: '', sessionratevalidate: true,
      courseRate: '', courseRatevalidate: true,
      noOfParticipant: '', participantvalidate: true, errorParticipant: '',
      demovideo: '', demovideovalidate: true, errorDemovideo: '',
      ImageSource: null, courseImage: null,
      singleFile: '',
      fromdate_value: data_pass.fromDate, validate_greaterdate: true, errorvalidateDate: '',
      from_edit: false,
      todate_value: data_pass.toDate,
      noOfDays: '',
      whichdate: '',
      whattype: '',
      showtimepicker: false,
      timeset_start: '',
      timeset_end: '',
      whichtime: '',
      nextclass: false,
      totaltimearray: {},
      message: '',
      timeArray: [],
      error_coursename: '',
      isFocusedsubject: true, isFocusedKeyword: '',
      array_timeslot: data_pass.slots,
      data_preview: '',
      showTime_modal: false,
      show_flatlist: true,
      showHeading_modal: false,
      datasend_heading: '',
      datasend_timeslot: '',
      send_time_index: '',
      send_heading_index: '',
      howHeading_flatlist: true,
      array_heading: [],
      radiossesment: false,
      toggleassignment: false, send_assign: '',
      assesment_toggle: false, send_assesment: '',
      download_toggle: false, send_download: '',
      recording_toggle: false, send_record: '',
      authorization: '',certificate_url:'',course_url:'',
    };


  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.authtoken_fun();
    this.headingset();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

  }

  handleBackPress = () => {

    const { goBack } = this.props.navigation;
    goBack();
    return true;
  };

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: value });


    } catch (e) {
      // error reading value
    }
  }

  headingset = () => {

    const data_pass = this.props.route.params.passdata;

   // let headings = data_pass.content.tableOfContents
    let headings = "dev#NH#jai#NH#dev#NH#"

  let valueArray = headings.split("#NH#");
  console.log(valueArray);
  var heading = [];
  var joinHeadSubHead = null;
  var tSub = [];
  {
    valueArray.map((item) =>{   
      item.split("#AMP#").map((headSplit, index) => {
        if (index > 0) {
          headSplit.split("#SH#").map((subHead) => {
            tSub.push({value: subHead})
          });
          this.state.array_heading.push({ head: joinHeadSubHead, subHead: tSub });
          joinHeadSubHead = null;
        } else {
          joinHeadSubHead = headSplit;
        }
        tSub = [];
      })
    }
    );
  }
  console.log(" ====> " + JSON.stringify(this.state.array_heading));

  }
  showDatePicker = (whichdateset) => {

    // console.log(whichdateset);
    this.setState({ whichdate: whichdateset })
    this.setState({ showpicker: this.showpicker = true })

  }
  hideDatePicker = () => {

    this.setState({ showpicker: this.showpicker = false })

  }

  handleConfirm = (date) => {

    var month = date.getMonth() + 1;
    var monthformat = month < 10 ? '0' + month : '' + month;

    var date_val = date.getDate();
    var dateformat = date_val < 10 ? '0' + date_val : '' + date_val;


    var date_set = date.getFullYear() + "-" + monthformat + "-" + dateformat;

    if (this.state.whichdate == "FROM") {


      this.setState({ fromdate_value: date_set })

      this.setState({ todate_value: '' });


    } else {


      var startdate = new Date(this.state.fromdate_value);
      var enddate = new Date(date_set);

      if (startdate < enddate) {

        var Difference_In_Time = enddate.getTime() - startdate.getTime();

        var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);


        this.setState({ noOfDays: Difference_In_Days });

        this.setState({ todate_value: date_set, validate_greaterdate: true })

      }
      else {


        this.setState({ todate_value: '', validate_greaterdate: false, errorvalidateDate: LABELCONSTANT.CLASS_CREATION.ENDDATE_VALIDATE });

      }


    }

    this.hideDatePicker();

  };

  ontitleText = (subjectkey) => {

    if (subjectkey.trim().length >= 5) {

      this.setState({ subjectkey: subjectkey, subjectkeyvalidate: true });

    } else {

      this.setState({ subjectkey: '', subjectkeyvalidate: false });
    }

  }


  oncourserateText = (courseRate) => {

    if (courseRate.trim().length >= 2) {

      this.setState({ courseRate: courseRate, courseRatevalidate: true });

    } else {

      this.setState({ courseRate: '', courseRatevalidate: false });
    }

  }

  onNoOfParticpant = (noOfParticipant) => {



    if (noOfParticipant > 20) {

      this.setState({ noOfParticipant: '', participantvalidate: false, errorParticipant: LABELCONSTANT.CLASS_CREATION.PARTICIPANTS_ERROR });

    }
    else if (noOfParticipant.trim().length <= 0) {

      this.setState({ noOfParticipant: '', participantvalidate: false, errorParticipant: LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY });

    }
    else {

      this.setState({ noOfParticipant: noOfParticipant, participantvalidate: true });
    }

  }

  togglesetValue = (value, key) => {

    if (key == 'assign') {

      if (value == true) {

        this.setState({ toggleassignment: true, send_assign: "Y" })

      }
      else {

        this.setState({ toggleassignment: false, send_assign: "N" })

      }

    }
    else if (key == 'download') {

      if (value == true) {

        this.setState({ download_toggle: true, send_download: "Y" })

      }
      else {

        this.setState({ download_toggle: false, send_download: "N" })

      }

    }
    else if (key == 'assesment') {

      if (value == true) {

        this.setState({ assesment_toggle: true, send_assesment: "Y" })

      }
      else {

        this.setState({ assesment_toggle: false, send_assesment: "N" })

      }

    }
    else if (key == 'record') {

      if (value == true) {

        this.setState({ recording_toggle: true, send_record: "Y" })

      }
      else {

        this.setState({ recording_toggle: false, send_record: "N" })

      }

    }
    else {


    }



  }

  submitAllDetails = (value_store) => {

    // if (this.state.coursename == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_COURSENAME, Toast.SHORT);

    // }
    // else if (this.state.subjectkey == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_SUBJECTKEY, Toast.SHORT);

    // }
    // else if (this.state.Description == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_DESCRIPTION, Toast.SHORT);

    // }
    // else if (this.state.durationCalss == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_DURATIONCLASS, Toast.SHORT);

    // }
    // else if (this.state.noOfclass == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_NOOFCLASS, Toast.SHORT);

    // }
    // else if (this.state.sessionname == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_RATEPERSESSION, Toast.SHORT);

    // }
    // else if (this.state.courseRate == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_RATECOURSE, Toast.SHORT);

    // }
    // else if (this.state.noOfParticipant == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_PARTICIPANT, Toast.SHORT);

    // } else if (this.state.demovideo == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_DEMOLINK, Toast.SHORT);

    // }
    // else if (this.state.fromdate_value == '' || this.state.todate_value == '') {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_DATE, Toast.SHORT);

    // }
    // else if (this.state.ImageSource == null) {

    //   Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_CERTIFICATE, Toast.SHORT);

    // }
    // else {


    let payload = {

      "subjectName": value_store.courseTitle,
      "demoUrl": value_store.demoVideolink,
      "downloadAllow": this.state.send_download,
      "courseKeyword": value_store.courseKeyword,
      "content": {
        "description": value_store.description
      },
      "noOfParticipant": value_store.participants,
      "courseDuration": value_store.classDuration,
      "noOfClass": value_store.noofClass,
      "ratePerSession": (value_store.rateperCourse / value_store.noofClass).toFixed(),
      "ratePerCourse": value_store.rateperCourse,
      "testAvail": this.state.send_assesment,
      "courseStartDate": this.state.fromdate_value,
      "courseEndDate": this.state.todate_value,
      "assignAvail": this.state.send_assign,
      "timeSlot": this.state.array_timeslot

    };


    // "courseStartDate": this.state.fromdate_value,
    // "courseEndDate": this.state.todate_value,
    let self = this;
    console.log(payload);
    console.log(self.state.authorization);

    axios.post(COURSE_POST_ADD_COURSE, payload,
      {
        headers: {
          'Authorization': self.state.authorization,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        // handle success

        if (response.data.status == "success") {

          console.log(response.data);

          Toast.show(response.data.data, Toast.SHORT);

          //  this.props.navigation.navigate('detail', { payload, key: true })

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




    //  }
  };

  selectPhotoTapped = (type) => {
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
        let source = { uri: response.uri };
        const filesize = response.fileSize;
        if( filesize < 500000){

          // this.setState({ image_URL: response.uri });
          // this.setState({error_showvalue:true})
           if (type == "course") {
 
             this.setState({ courseImage: source });
   
           } else {
   
             this.setState({ ImageSource: source });
           }
 
           this.uploadimage(response,type);
         }
         else{
 
          // this.setState({error_showvalue:false})
          // this.setState({error_show_msg: LABELCONSTANT.EditProfile.photo_size})
 
         }


      }
    });

  }

  uploadimage = (image,type) =>{

    let self = this;

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

          if (type == "course") {

            self.setState({ course_url: url });
  
          } else {
  
            self.setState({ certificate_url: url });

          }

       
         
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

  async selectOneFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  checkonfocus = (type) => {

    if (type == "course") {

      this.setState({ isFocusedsubject: true });

    }
    else if (type == "keyword") {

      this.setState({ isFocusedKeyword: true });

    } else {

      this.setState({ isFocused: false });
    }

  }

  show_TimeModal = () => {

    this.setState({ showTime_modal: this.showTime_modal = true })

  }

  hide_TimeModal = () => {

    this.setState({ datasend_timeslot: '' })
    this.setState({ showTime_modal: this.showTime_modal = false })

  }

  show_headingModal = () => {

    this.setState({ showHeading_modal: this.showHeading_modal = true })

  }

  hide_headingModal = () => {

    this.setState({ showHeading_modal: this.showHeading_modal = false })

  }

  timeslotFunction = (data_from_child) => {


    this.hide_TimeModal();

    this.setState({ show_flatlist: false })

    if (this.state.datasend_timeslot == '') {


      let textInput = this.state.array_timeslot;
      textInput.push(data_from_child);
      this.setState({ array_timeslot: textInput })


    }
    else {

      let index = this.state.send_time_index;

      this.setState({ datasend_timeslot: '' })

      this.state.array_timeslot[index] = data_from_child
    }

  }

  headingFunction = (data_from_child) => {


    this.hide_headingModal();

    this.setState({ showHeading_flatlist: false })

    if (this.state.datasend_heading == '') {

      let value = data_from_child.pop();

      let textInput = this.state.array_heading;
      textInput.push(value);
      this.setState({ array_heading: textInput })


    }
    else {

      let index = this.state.send_heading_index;

      this.setState({ datasend_heading: '' })

      let value = data_from_child.pop();
      this.state.array_heading[index] = value
    }


  }


  handleChange = e => {

    e.map((item, index) => {


      if (item.checked == true) {


        this.setState({ radiossesment: !this.state.radiossesment })


      }
      else {

      }
    })
  };


  removetimeslot = (itemvalue, index) => {
    let textInput = this.state.array_timeslot;

    if (index > -1) {
      textInput.splice(index, 1);
    }

    this.setState({ array_timeslot: textInput });

  }

  removeheading = (itemvalue, index) => {

    console.log(itemvalue)
    console.log(index)

    let textInput = this.state.array_heading;

    if (index > -1) {
      textInput.splice(index, 1);
    }
    console.log(textInput);
    this.setState({ array_heading: textInput });

  }

  onPressButton = () => {  
    this.setState({ showeditmodel: true })  
      this.setState({ TextInputDisableStatus: true })  
      this.setState({ buttondisablestatus: true })  
  }

  deleteButtonAlert = () => {  
    Alert.alert(
      "Are you sure want to delete",
      this.state.subjectname,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK",
         onPress: () => this.deletecourse()
        }
      ],
      { cancelable: false }
    );
  }

  deletecourse = () => {  

    let self = this;

    axios
  .post('http://localhost:8084/iskoolu/api/v1/remove-course', {
  
   "user": 7,
  
   },
   {  
     headers: {
     
     'Content-Type': 'application/json'
 } 
   }
   ) 
  .then(function(response) {
    // handle success

    if(response.data.status == "Success"){

      console.log(response.data);
      Toast.show(response.data.message, Toast.SHORT);

    }
    else{

     
    }
   
    
  })
  .catch(function(error) {
  
    console.log("error",error);
  });



  }

  preview = (value_store) => {

    let payload = {
      "subjectName": value_store.courseTitle,
      "courseUrl": this.state.course_url,
      "content": {"title": value_store.courseTitle, 
                "description":value_store.description},
      "courseKeyword": value_store.courseKeyword,
      "classDuration":  value_store.classDuration,
      "noOfClass": value_store.noofClass,
      "ratePerCourse": value_store.rateperCourse,
      "ratePerSession": (value_store.rateperCourse / value_store.noofClass).toFixed(),
      "noOfParticipant": value_store.participants,
      "courseStartDate": this.state.fromdate_value,
      "courseEndDate": this.state.todate_value,
      "courseDuration": this.state.noOfDays,
      "demoUrl": value_store.demoVideolink,
      "timeSlot":this.state.array_timeslot,
      "certificationUrl": this.state.certificate_url,
      "assignAvail": this.state.send_assign,
      "downloadAllow": this.state.send_download,
      "testAvail": this.state.send_assesment,
      "TEST_MODE": this.state.send_assesment == "Y"? value_store.assesment:null,
    };

    this.setState({ data_preview: payload })
    let datasend = [payload];
    console.log('datasend', datasend);


    this.props.navigation.navigate('detail', { datasend, key: true })

  };
  selectedvalue = (item, index) => {

    this.setState({ showHeading_modal: this.showHeading_modal = true })
    const passdata = item;
    this.setState({ datasend_heading: item, send_heading_index: index })



  };
  selectedvalueTime = (item, index) => {

    this.setState({ showTime_modal: this.showTime_modal = true })
    const passdata = item;
    this.setState({ datasend_timeslot: item, send_time_index: index })

  };

  render() {
    const data_pass = this.props.route.params.passdata;
    console.log(JSON.stringify(data_pass));

    const keyteach = this.props.route.params.key;

    return (

      <View style={styles.Container}>

        <Appbar.Header style={styles.toolbarstyle}>
          <Appbar.BackAction color='#696969' onPress={() => this.handleBackPress()} />
          <Appbar.Content color = '#696969'  />
          <Appbar.Action color = '#696969' icon="pencil-outline"  onPress={this.onPressButton} />
          <Appbar.Action color = '#696969' icon="delete" onPress={this.deleteButtonAlert}  />
        </Appbar.Header>


        {this.state.showHeading_modal ? (
          <SwipeablePanel isActive={this.state.showHeading_modal}
            closeOnTouchOutside={true}
            fullWidth={true} onClose={() => this.hide_headingModal()} >

            <AddHeading heading_data={this.headingFunction.bind(this)}
              passingdata={this.state.datasend_heading}
            />

          </SwipeablePanel>) : null}
        {/* //   passingdata={this.state.datasend_heading} */}
        {this.state.showTime_modal ? (

          <SwipeablePanel isActive={this.state.showTime_modal}
            fullWidth={true}
            openLarge={true}
            onClose={() => this.hide_TimeModal()} >

            <Timeslot timeslot_data={this.timeslotFunction.bind(this)}
              passingdata={this.state.datasend_timeslot} />

          </SwipeablePanel>) : null}


        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
          <Formik
         initialValues={
           keyteach ? ( {
        
              courseTitle: '', courseKeyword: '', description: '',
              classDuration: '', noofClass: '', participants: '',
              rateperCourse: '', demoVideolink: '', ratePerSession: '',
              assesment: '',
              
            }): {courseTitle: data_pass.courseName, courseKeyword: data_pass.tableOfContents, 
              description: data_pass.content.description,
            classDuration:  data_pass.courseDuration, noofClass: data_pass.noOfClass, 
            participants:  data_pass.noOfParticipant,rateperCourse: data_pass.ratePerCourse,
             demoVideolink:  '', ratePerSession:  '',
            assesment:  '', }} 
            validationSchema={yup.object().shape({
              courseTitle: yup
                .string()
                .max(50, LABELCONSTANT.CLASS_CREATION.MAXIMUM_CHARACTER)
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              courseKeyword: yup
                .string()
                //.length() participants: '',
                //.length(20, LABELCONSTANT.CLASS_CREATION.MAXIMUM_WORD)
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              description: yup
                .string()
                .min(20, LABELCONSTANT.CLASS_CREATION.DESCRIPTION_MIN)
                .max(150, LABELCONSTANT.CLASS_CREATION.DESCRIPTION_MAX)
                .required(LABELCONSTANT.CLASS_CREATION.ABOUT_COURSE),
              classDuration: yup
                .string()
                .test(
                  "classDuration",
                  LABELCONSTANT.CLASS_CREATION.CLASS_DURATION_ERROR,
                  (value) => value >= 1 && value <= 8
                )
                // .matches(/^[1-8]+$/, LABELCONSTANT.CLASS_CREATION.CLASS_DURATION_ERROR)
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              noofClass: yup
                .string()
                .test("noOfClasses", "Please enter valid number", (value) => value >= 1)
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              rateperCourse: yup
                .string()
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              ratePerSession: yup
                .string(),
              participants: yup
                .string()
                .test(
                  "participants",
                  LABELCONSTANT.CLASS_CREATION.PARTICIPANTS_ERROR,
                  (value) => value >= 1 && value <= 20
                )
                .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY),
              assesment:
                this.state.assesment_toggle ? (yup
                  .string()
                  .optional()
                  .required(LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY)) : null,
              demoVideolink: yup
                .string()
                .matches(
                  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
                  LABELCONSTANT.CLASS_CREATION.ERROR_VALIDURL
                )
              ,

            })}
            onSubmit={(values, actions) => {


              //actions.resetForm();
              this.submitAllDetails(values);


            }}>

            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <View style={styles.textviewstyle}>

                <TouchableOpacity
                  style={styles.loginbtn}
                  onPress={this.selectOneFile}>

                  <Text style={styles.btntext}>Please Select document to upload class</Text>

                </TouchableOpacity>

                <Text style={styles.ortext}>Or</Text>

                <TextInput
                  label={LABELCONSTANT.CLASS_CREATION.COURSENAME}
                  underlineColor="#696969"
                  keyboardType='email-address'
                  mode="outlined"
                  value={values.courseTitle}
                  maxLength={50}
                  left={
                    <TextInput.Icon name="book-open-variant" size={20} color={'#696969'} />
                  }
                  onChangeText={handleChange('courseTitle')}
                  onBlur={() => setFieldTouched('courseTitle')}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray', } }}
                  style={styles.inputStyle} />

                {touched.courseTitle && errors.courseTitle &&
                  <Text style={styles.errorMessage}>{errors.courseTitle}</Text>
                }
               


                <View style={styles.iconviewstyle}>

                  <Text style={{ color: "#696969", fontSize: 16, padding: 5 }}>Course Image</Text>
                  <IconButton
                    icon="cloud-upload"
                    onPress={() => this.selectPhotoTapped("course")}
                    color="#696969"
                    size={25} />

                </View>


                {this.state.courseImage ?

                  <View style={styles.imageshowstyle}>

                    <Image style={styles.courseImageContainer} source={this.state.courseImage} />

                  </View> : null}

                <TextInput
                  label={LABELCONSTANT.CLASS_CREATION.COURSE_KEYWORD}
                  onFocus={() => this.checkonfocus("keyword")}
                  underlineColor="#696969"
                  returnKeyType={"next"}
                  mode="outlined"
                  value={values.courseKeyword}
                  maxLength={50}
                  left={
                    <TextInput.Icon name="label-variant" size={20} color={'#696969'} />
                  }
                  onChangeText={handleChange('courseKeyword')}
                  onBlur={() => setFieldTouched('courseKeyword')}
                  keyboardType='email-address'
                  // onChangeText = {subjectkey => this.ontitleText(subjectkey)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />
                {touched.courseKeyword && errors.courseKeyword &&
                  <Text style={styles.errorMessage}>{errors.courseKeyword}</Text>
                }

                {this.state.subjectkeyvalidate == false ? (
                  <Text style={styles.errorMessage}>
                    {LABELCONSTANT.CLASS_CREATION.ERROR_EMPTY}
                  </Text>
                ) : null}

                <TextInput
                  label={LABELCONSTANT.CLASS_CREATION.DESCRIPTION}
                  underlineColor="#696969"
                  keyboardType='email-address'
                  maxLength={150}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={() => setFieldTouched('description')}
                  mode="outlined"
                  left={
                    <TextInput.Icon name="book-open-variant" size={20} color={'#696969'} />
                  }
                  //  onChangeText = {Description => this.onsubdescriptionText(Description)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                {touched.description && errors.description &&
                  <Text style={styles.errorMessage}>{errors.description}</Text>
                }
                {this.state.descriptionValidate == false ? (
                  <Text style={styles.errorMessage}>
                    {this.state.errorDescription}
                  </Text>
                ) : null}

                <View style={styles.iconviewstyle}>

                  <Text style={styles.radiotextstyle}>Create a Heading</Text>
                  <IconButton
                    icon="plus"
                    onPress={() => this.show_headingModal()}
                    color="#696969"
                    size={20} />

                </View>

                {this.state.showHeading_flatlist == false ? (
                  <View>

                    {/* {this.state.array_heading.map((itemhead,index) => (
                // <View>
                
                //   <List.Accordion
                //     theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                //     title={itemhead.head}
                //     //expanded={true}
                //     onPress={() => this.selectedvalue(itemhead,index)}
                //     left={props => <List.Icon {...props} icon="chevron-right-circle" />}>

                //     {itemhead.subHead.map((itemsub) => (
                //       <View>
                //         <List.Item title={itemsub.value}
                //           left={props => <List.Icon {...props} icon="menu-right" />}
                //         />

                //       </View>
                //     ))}
                //   </List.Accordion>
                
                //   <View style={styles.divederstyle} />
                // </View>))}  */}

                    <FlatList
                      style={styles.FlatListStyle}
                      data={this.state.array_heading}
                      renderItem={({ item, index }) =>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.selectedvalue(item, index)}>
                            <Card>
                              <View style={{ marginLeft: 5, justifyContent: 'space-between', }}>

                                <View style={styles.iconviewstyle}>

                                  <IconButton
                                    icon="clipboard-text-outline"
                                    color="#696969"
                                    size={20} />

                                  <Text style={{ color: "#696969", fontSize: 16, fontWeight: 'bold' }}>
                                    {item.head}
                                  </Text>

                                  <View style={{ flex: 1, margin: 5, alignItems: 'flex-end', }}>


                                    <IconButton
                                      icon="alpha-x-circle-outline"
                                      onPress={() => this.removeheading(item, index)}

                                      color="#696969"
                                      size={20} />
                                  </View>
                                </View>


                                {item.subHead.map((itemsub) => (


                                  <View style={{
                                    flexDirection: 'row',
                                    alignItems: "center", marginLeft: 20,
                                  }}>

                                    <IconButton
                                      icon="text-subject"
                                      color="#696969"
                                      size={20} />

                                    <Text style={{ color: "#696969", fontSize: 14, }}>

                                      {itemsub.value}
                                    </Text>
                                  </View>

                                ))}

                              </View>

                            </Card>
                          </TouchableOpacity>
                          <View style={styles.divederstyle} />

                        </View>
                      }

                      keyExtractor={(item => item.id)}>
                    </FlatList>

                  </View>) : null}

                <TextInput
                  label={LABELCONSTANT.CLASS_CREATION.CLASS_DURATION}
                  underlineColor="#696969"
                  keyboardType='numeric'
                  maxLength={1}
                  mode="outlined"
                  left={
                    <TextInput.Icon name="clock-outline" size={20} color={'#696969'} />
                  }
                  value={values.classDuration}
                  onChangeText={handleChange('classDuration')}
                  onBlur={() => setFieldTouched('classDuration')}
                  // onChangeText = {durationCalss => this.onclassduartionText(durationCalss)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                {touched.classDuration && errors.classDuration &&
                  <Text style={styles.errorMessage}>{errors.classDuration}</Text>
                }
                {this.state.durationCalssvalidate == false ? (
                  <Text style={styles.errorMessage}>
                    {this.state.error_durationclass}
                  </Text>
                ) : null}

                <TextInput label="No. of classes"
                  underlineColor="#696969"
                  keyboardType='numeric'
                  mode="outlined"
                  left={
                    <TextInput.Icon name="clipboard-text-outline" size={20} color={'#696969'} />
                  }
                  value={values.noofClass}
                  onChangeText={handleChange('noofClass')}
                  onBlur={() => setFieldTouched('noofClass')}
                  //onChangeText = {noOfclass => this.onNoOfClassText(noOfclass)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />


                {touched.noofClass && errors.noofClass &&
                  <Text style={styles.errorMessage}>{errors.noofClass}</Text>
                }

                <TextInput
                  label="Rate per course"
                  underlineColor="#696969"
                  keyboardType='numeric'
                  mode="outlined"
                  value={values.rateperCourse}
                  left={
                    <TextInput.Icon name="currency-inr" size={20} color={'#696969'} />
                  }
                  onChangeText={handleChange('rateperCourse')}
                  onBlur={() => setFieldTouched('rateperCourse')}
                  // onChangeText={(courseRate) => this.setState({courseRate})}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                {touched.rateperCourse && errors.rateperCourse &&
                  <Text style={styles.errorMessage}>{errors.rateperCourse}</Text>
                }
                
                <TextInput
                  label="Rate per session"
                  underlineColor="#696969"
                  keyboardType='numeric'
                  mode="outlined"
                  editable={false}
                  value={values.noofClass && values.rateperCourse ? (

                    (values.rateperCourse / values.noofClass).toFixed()) : null}
                  left={
                    <TextInput.Icon name="currency-inr" size={20} color={'#696969'} />
                  }
                  onChangeText={handleChange('ratePerSession')}
                  onBlur={() => setFieldTouched('ratePerSession')}
                  // onChangeText={(courseRate) => this.setState({courseRate})}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                <TextInput
                  label={LABELCONSTANT.CLASS_CREATION.NO_PARTICIPANTS}
                  underlineColor="#696969"
                  keyboardType='numeric'
                  mode="outlined"
                  left={
                    <TextInput.Icon name="account-group" size={20} color={'#696969'} />
                  }
                  value={values.participants}
                  onChangeText={handleChange('participants')}
                  onBlur={() => setFieldTouched('participants')}
                  //onChangeText = {noOfParticipant => this.onNoOfParticpant(noOfParticipant)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                {touched.participants && errors.participants &&
                  <Text style={styles.errorMessage}>{errors.participants}</Text>
                }
                {this.state.participantvalidate == false ? (
                  <Text style={styles.errorMessage}>
                    {this.state.errorParticipant}
                  </Text>
                ) : null}


                <TextInput label="Demo Video Link"
                  underlineColor="#696969"
                  keyboardType='email-address'
                  onChangeText={handleChange('demoVideolink')}
                  onBlur={() => setFieldTouched('demoVideolink')}
                  mode="outlined"
                  maxLength={50}
                  value={values.demoVideolink}
                  //  onChangeText = {demovideo => this.onDemovideoText(demovideo)}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                {touched.demoVideolink && errors.demoVideolink &&
                  <Text style={styles.errorMessage}>{errors.demoVideolink}</Text>
                }
                {this.state.demovideovalidate == false ? (
                  <Text style={styles.errorMessage}>
                    {this.state.errorDemovideo}
                  </Text>
                ) : null}

                <View style={styles.texinputviewstyle}>

                  <TouchableOpacity style={styles.inpudatetexttStyle}
                    onPress={() => this.showDatePicker("FROM")}>
                    <TextInput label="Start Date"
                      underlineColor="#696969"
                      editable={false}
                      mode="outlined"
                      left={
                        <TextInput.Icon name="calendar-month" size={20} color={'#696969'} />
                      }

                      value={this.state.fromdate_value}
                      onChangeText={fromdate_value => this.setState({ fromdate_value })}
                      theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                      style={styles.inpudatefromtexttStyle} />

                  </TouchableOpacity>

                  <View style={{ width: "100%", justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.inpudatetexttStyle}
                      onPress={() => this.showDatePicker('TO')}>

                      <TextInput label="End Date"
                        underlineColor="#696969"
                        editable={false}
                        mode="outlined"
                        value={this.state.todate_value}
                        left={
                          <TextInput.Icon name="calendar-month" size={20} color={'#696969'} />
                        }
                        // onChangeText={handleChange('enddate')}
                        // onBlur={() => setFieldTouched('enddate')}
                        // value = {values.enddate}
                        onChangeText={todate_value => this.setState({ todate_value })}
                        theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
                        style={styles.inpudatetexttStyle} />

                    </TouchableOpacity>

                    {touched.enddate && errors.enddate &&
                      <Text style={styles.errorMessage}>{errors.enddate}</Text>
                    }
                    {this.state.validate_greaterdate == false ? (
                      <Text style={styles.errorMessage}>
                        {this.state.errorvalidateDate}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {this.state.whichdate == "TO" ? (<DateTimePickerModal
                  isVisible={this.state.showpicker}
                  mode="date"
                  minimumDate={new Date()}
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker} />) :
                  (
                    <DateTimePickerModal
                      isVisible={this.state.showpicker}
                      mode="date"
                      minimumDate={new Date()}
                      maximumDate={new Date(new Date().getTime() + (60 * 24 * 60 * 60 * 1000))}
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker} />)}

                <TextInput
                  label="No of Days"
                  underlineColor="#696969"
                  keyboardType='numeric'
                  mode="outlined"
                  editable={false}
                  value={this.state.noOfDays ? (

                    this.state.noOfDays + "days") : null}

                  left={
                    <TextInput.Icon name="calendar-today" size={20} color={'#696969'} />
                  }
                  // onChangeText={(courseRate) => this.setState({courseRate})}
                  theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                  style={styles.inputStyle} />

                <View style={styles.iconviewstyle}>

                  <Text style={styles.radiotextstyle}>Create a time slot</Text>
                  <IconButton
                    icon="plus"
                    onPress={() => this.show_TimeModal()}
                    // onPress={() => this.openPanel()}
                    color="#696969"
                    size={20} />

                </View>

                {this.state.show_flatlist == false || keyteach == false ? (
                  <View>
                    <View style={{
                      marginLeft: 1, flexDirection: 'row', alignItems: "center",
                      marginTop: 10, justifyContent: 'space-between'
                    }}>

                      <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                        <Text style={styles.subtextouthead}>Time</Text>

                      </View>

                      <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                        <Text style={styles.subtextouthead}>Language</Text>

                      </View>

                      <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                        <Text style={styles.subtextouthead}>Days</Text>

                      </View>
                      <View style={{ flex: 0.3, alignItems: "center", }}>



                      </View>
                    </View>
                    <FlatList
                      style={styles.FlatListStyle}
                      data={this.state.array_timeslot}
                      renderItem={({ item, index }) =>

                        <TouchableOpacity
                          onPress={() => this.selectedvalueTime(item, index)}>
                          <Card>
                            <View style={{
                              marginLeft: 1, flexDirection: 'row', alignItems: "center",
                              marginTop: 5, justifyContent: 'space-between'
                            }}>


                              <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                                <Text style={{ color: "#696969", fontSize: 10, padding: 5 }}>

                                  {item.fromTime} - {item.toTime}
                                </Text>

                              </View>

                              <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>



                                <Text style={styles.listtimetextstyle}>{item.medium}</Text>

                              </View>

                              <View style={{ flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                                <Text style={{ color: "#696969", fontSize: 10, padding: 5 }}>

                                  {item.frequency}
                                </Text>

                              </View>
                              <View style={{ flex: 0.3, margin: 5, bottom: 5, alignItems: "center", }}>


                                <IconButton
                                  icon="alpha-x-circle-outline"
                                  onPress={() => this.removetimeslot(item, index)}

                                  color="#696969"
                                  size={20} />
                              </View>

                            </View>

                          </Card>
                        </TouchableOpacity>
                      }

                    >
                    </FlatList>

                  </View>) : null}

                <View style={{
                  marginLeft: 1, flexDirection: 'row', alignItems: "center",
                  marginTop: 5, justifyContent: 'space-between'
                }}>


                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Assignment</Text>

                    <Switch
                      trackColor={{ false: 'gray', true: "#ffd700" }}
                      thumbColor="white"
                      ios_backgroundColor="gray"
                      onValueChange={(value) => this.togglesetValue(value, "assign")}
                      value={this.state.toggleassignment}
                    />

                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Download</Text>
                    <Switch
                      trackColor={{ false: 'gray', true: "#ffd700" }}
                      thumbColor="white"
                      ios_backgroundColor="gray"
                      onValueChange={(value) => this.togglesetValue(value, "download")}
                      value={this.state.download_toggle}
                    />

                  </View>
                </View>

                <View style={{
                  marginLeft: 1, flexDirection: 'row', alignItems: "center",
                  marginTop: 5, justifyContent: 'space-between'
                }}>


                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Assesment</Text>

                    <Switch
                      trackColor={{ false: 'gray', true: "#ffd700" }}
                      thumbColor="white"
                      ios_backgroundColor="gray"
                      onValueChange={(value) => this.togglesetValue(value, "assesment")}
                      value={this.state.assesment_toggle}
                    />


                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Recording</Text>
                    <Switch
                      trackColor={{ false: 'gray', true: "#ffd700" }}
                      thumbColor="white"
                      ios_backgroundColor="gray"
                      onValueChange={(value) => this.togglesetValue(value, "record")}
                      value={this.state.recording_toggle}
                    />

                  </View>
                </View>

                {this.state.assesment_toggle == true ? (
                  <TextInput
                    label={LABELCONSTANT.CLASS_CREATION.ASSESMENT_MODE}
                    underlineColor="#696969"
                    keyboardType='email-address'
                    mode="outlined"
                    left={
                      <TextInput.Icon name="clipboard-outline" size={20} color={'#696969'} />
                    }
                    onChangeText={handleChange('assesment')}
                    onBlur={() => setFieldTouched('assesment')}
                    // onChangeText = {noOfParticipant => this.onNoOfParticpant(noOfParticipant)}
                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                    style={styles.inputStyle} />


                ) : null}
                {touched.assesment && errors.assesment &&
                  <Text style={styles.errorMessage}>{errors.assesment}</Text>
                }

                <View style={styles.iconviewstyle}>

                  <Text style={{ color: "#696969", fontSize: 16, padding: 10 }}>Select Certificate</Text>
                  <IconButton
                    icon="cloud-upload"
                    onPress={() => this.selectPhotoTapped("certificate")}
                    color="#696969"
                    size={25} />

                </View>

                {this.state.ImageSource ?


                  <View style={styles.imageshowstyle}>

                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />

                  </View> : null}


                <Button
                  // color = "#696969"
                  mode="contained"
                  style={styles.buttonstyle}
                  onPress={() => this.preview(values)}
                // onPress={() => this.submitAllDetails()} 
                >

                  Preview

                </Button>

                <Button
                  // color = "#696969"
                  mode="contained"
                  style={isValid ? (styles.buttonstyle) : (styles.buttonhidestyle)}
                  disabled={!isValid}
                  onPress={handleSubmit}
                // onPress={() => this.submitAllDetails()} 
                >

                  {LABELCONSTANT.CLASS_CREATION.CREATED}

                </Button>

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
    backgroundColor: '#fff'
  },
  inputStyle: {
    marginTop: 10,
    backgroundColor: "#fff"
  },
  inpudatefromtexttStyle: {
    width: "100%",
    backgroundColor: "#fff"
  },
  inpudatetexttStyle: {
    width: "100%",
    backgroundColor: "#fff"
  },
  scrollView: {
    marginHorizontal: 0,
  },
  textviewstyle: {
    flex: 1,
    padding: 10,
    marginTop: 5,
  },
  divederstyle: {
    borderWidth: 0.4,
    borderColor: "#D3D3D3"
  },
  subtextouthead: {
    color: 'white',
    fontSize: 10,
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    width: 73,
    marginRight: 6,
    textAlign: 'center'
  },
  backpresstext: {
    color: "#696969",
    fontSize: 18
  },
  toolbarstyle: {
    backgroundColor: "#ffd700",
  },
  buttonstyle: {
    backgroundColor: "#696969",
    margin: 5,
    padding: 5,
  },
  buttonhidestyle: {
    backgroundColor: "#e3f2fd",
    margin: 5,
    padding: 5,
  },
  alertdialogstyle: {
    backgroundColor: "#696969",

  },
  Radiobuttonstyle: {
    margin: 5,
    padding: 5,
    marginTop: 10
  },
  iconviewstyle: {
    flexDirection: 'row',
    alignItems: "center",
  },

  containerTime: {
    flexDirection: 'row',
    alignItems: "center",
  },
  texinputviewstyle: {
    flexDirection: 'row',
    width: "50%",
    justifyContent: 'space-between'
  },
  radiotextstyle: {
    color: "#696969",
    fontSize: 16,
    padding: 12
  },
  listtimetextstyle: {
    color: "#696969",
    fontSize: 13,
    padding: 5
  },
  texttimestyle: {
    color: "#696969",
    fontSize: 16,
    marginTop: 50
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginLeft: 10,

  },
  textstyle: {
    color: "#696969",
    fontSize: 16,
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
  },
  courseImageContainer: {
    width: 100,
    height: 100,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
  },
  selectimagetextstyle: {
    fontSize: 18,
    padding: 10
  },
  imageshowstyle: {
    color: "#696969",
    fontSize: 16,
    flexDirection: 'column',
    alignItems: "center",
  },
  loginbtn: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#696969",
    textAlign: "center"
  },
  FlatListStyle: {
    borderColor: "#000",
    width: '100%',
    fontSize: 20,
  },
  btntext: {
    fontSize: 16,
    color: '#ffd700',
    textAlign: "center",
    fontWeight: "bold"
  },
  ortext: {
    marginTop: 5,
    fontSize: 18,
    color: "#696969",
    textAlign: "center",
    fontWeight: "bold"
  },
});