import React, { Component  } from 'react'
import {StyleSheet,View, Text, TextInput ,TouchableOpacity,Alert,BackHandler} from 'react-native';
import LABELCONSTANT from '../shared/label.constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Loader from './loader.native';
import {Appbar,IconButton,Colors } from 'react-native-paper';
import {SEND_OTP,OTP_POST_VERIFY_EMAIL,OTP_POST_EMAIL,
  POST_UPDATE_EMAIL,BASE_URL_LOGIN,POST_UPDATE_MOBILE} from '../services/api.constans';
import { StackActions, NavigationActions } from 'react-navigation';

export default class VerifyAccount extends Component{

  constructor(props) {
    super(props);
    let passdatavalue = this.props.otppassData;

    let mobilenumber = passdatavalue.MobileNumber
    let email = passdatavalue.Email
    var choose = passdatavalue.Choose
   // let token = this.props.route.params.accesstoken
    let requesID = passdatavalue.reques_id
 
    console.log("mail",email)
    let  verifytext = {};
    let  verifytext1 = {};
    let  verifytext2 = {};
        if(mobilenumber){
           verifytext  = LABELCONSTANT.LBL_OTP.PLEASETYPE;
           verifytext1  = LABELCONSTANT.LBL_OTP.PLEASETYPEMobileOTP;
           verifytext2  = LABELCONSTANT.LBL_OTP.SMSOTP;
        }else{
           verifytext  = LABELCONSTANT.LBL_OTP.PLEASETYPE;
           verifytext1  = LABELCONSTANT.LBL_OTP.OTPSEND;
           verifytext2  = LABELCONSTANT.LBL_OTP.PLEASETYPEEmailOTP;
        }

        this.state = {
          TextInputFirst: '',
          TextInputSecond: '',
          TextInputThird: '',
          TextInputFourth: '',
          sendnum:mobilenumber,
          PassEmail:email,

          PLEASETYPEOTP:verifytext,
          PLEASETYPEOTP1:verifytext1,
          PLEASETYPEOTP2:verifytext2,
          errortext:'',
          numvalidate:false, loading: false,
          timer: null,
          counter: 10,
          otpresend:false,
          resendsecond:false,
          count: 0,
          request_ID:requesID,
          authorization:'',
          choosepage:choose,
          autoFocus1: false,
          autoFocus2: false,
          autoFocus3: false,
          autoFocus4: false,
        };

        this.token_data();
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      this.startTimer();
    
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      clearInterval(this.state.timer);
    }
  
    handleBackPress = () => {
     
       if(this.state.choosepage  == "indi_email" || this.state.choosepage  == "indi_mobile"){
  
         this.props.otp_data({key:''})
       }
       else if(this.state.choosepage  == "institu_email" || this.state.choosepage  == "institu_mobile"){
  
        this.props.otp_data({key:''})
       }
     else{
  
        // this.props.navigation.navigate('login');
     }
    //  const{goBack} = this.props.navigation;
    //  goBack();
      return true;
    };
    
    token_data = async () => {

      try {
       
        const token = await AsyncStorage.getItem('auth_Token');
  
        this.setState({ authorization: token });
       
      } catch (e) {
        console.log(e)
       
      }
    };
  startTimer = () => {

      let timer = setInterval(this.manageTimer, 1000);
      this.setState({timer });
   

  }

  manageTimer = () => {

    var states = this.state

    if (states.counter === 0) {
        //alert('Times Up !\nTimer  is reset')
        clearInterval(this.state.timer)
        this.setState({
            counter: 10,
            otpresend:true
        })

    }
    else {
        this.setState({
            counter: this.state.counter - 1
        });

    }
}

  CheckTextInput = () => {
        let self = this;
       
        if(this.state.resendsecond == true){

          if(this.state.choosepage  == "indi_email" || this.state.choosepage  == "indi_mobile"){

            self.props.navigation.navigate('profileDetails')
          }
          else if(this.state.choosepage  == "institu_email" || this.state.choosepage  == "institu_mobile"){
    
            self.props.navigation.navigate('profileDetails_institute')
          }
          else{
    
    
          }

        }else{

        if(this.state.count == 2){

          this.setState({loading: false});
         // this.props.navigation.navigate('Indivdualinfo')
        }
        else{
        if (this.state.TextInputFirst == ''||this.state.TextInputSecond == ''||this.state.TextInputThird == ''||
            this.state.TextInputFourth == '') {
              this.setState({numvalidate:true,errortext:LABELCONSTANT.LBL_OTP.ENTEROTP});
        }else if(!/^[0-9]+$/i.test(this.state.TextInputFirst )||
                 !/^[0-9]+$/i.test(this.state.TextInputSecond )||
                 !/^[0-9]+$/i.test(this.state.TextInputThird )||
                 !/^[0-9]+$/i.test(this.state.TextInputFourth )){
           this.setState({numvalidate:true,errortext:LABELCONSTANT.LBL_OTP.INVALIDOTP, 
           TextInputFirst: '',
           TextInputSecond: '',
           TextInputThird: '',
           TextInputFourth: ''});
        }
        else{

          var first = this.state.TextInputFirst;
          var second = this.state.TextInputSecond;
          var third = this.state.TextInputThird;
          var fourth = this.state.TextInputFourth;
      
          this.setState({numvalidate:false,errortext:''});
          const dataToSend =  first + second + third+ fourth ;
          console.log(dataToSend);
          console.log(this.state.choosepage );
     
          if(this.state.choosepage  == "indi_email" || this.state.choosepage  == "institu_email"){

            this.verifyEmailOtp(dataToSend);
          }
          else if(this.state.choosepage  == "indi_mobile" || this.state.choosepage  == "institu_mobile"){
    
            this.mobileOtpVerify(dataToSend);
           // self.props.navigation.navigate('profileDetails_institute')
          }
          else{
    

    
          }
                        
        }
      }

    }
}    

mobileOtpVerify = (text_password) =>{
    
  let self = this;
     var dataToSend = {mobile: "91"+this.state.sendnum, otp: text_password, authkey: '156873AC11NF8mRv5f2d2698P1'};
     var formBody = [];
  
     for (var key in dataToSend) {
       var encodedKey = encodeURIComponent(key);
       var encodedValue = encodeURIComponent(dataToSend[key]);
       formBody.push(encodedKey + "=" + encodedValue);
     }

     formBody = formBody.join("&");
    // //POST request 
    // fetch('https://api.msg91.com/api/v5/otp/verify', {
    //   method: "POST",
    //   body: formBody,
    //   headers: {
       
    //   },
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {

    //  // alert(JSON.stringify(responseJson));
    //   console.log(responseJson);

      
    
    // })
    
    // .catch((error) => {
    //  // alert(JSON.stringify(error));
    //   console.error(error);
    // });

    const params = {
      "mobile": "91"+this.state.sendnum,
      "otp": text_password,
      "authkey": "156873AC11NF8mRv5f2d2698P1"
    };
    console.log(params);
    console.log("otp",self.state.choosepage);
    axios.post("https://api.msg91.com/api/v5/otp/verify",formBody,
      {
        headers: {
      
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
    .then(function (response) {
      // handle success
  
      console.log("otp",response.data);
      if (response.data.type == "success") {
  
        console.log("otp",response.data);
     
         self.mobileupdate();
         
      }
      else {
  
        self.setState({numvalidate:true,errortext:response.data.message,
          TextInputFirst: '',
          TextInputSecond: '',
          TextInputThird: '',
          TextInputFourth: ''});
          self.refs['first'].focus();
        
        console.log(response.data);
       // Toast.show(response.data.message, Toast.SHORT);
      }
     
   
    })
    .catch(function (error) {
      // handle error
      // alert("error"+error);
      console.log("error", error);
    });
  

  
};

mobileupdate = () =>{

  let self = this;

  const params = {
    "mobile": self.state.sendnum,
  
  };
  console.log("sendnum", this.state.sendnum);
  console.log("sendnum", self.state.authorization);

  axios.get(BASE_URL_LOGIN+POST_UPDATE_MOBILE,{
    params: {
      mobile: self.state.sendnum
    },

    headers: {
        'Authorization': self.state.authorization,
        'Content-Type': 'application/json'
    }
    })
    .then(function (response) {

      if (response.data.status == "Success") {

        console.log(response.data);
       
        if(self.state.choosepage  == "indi_mobile"){

        //  self.props.navigation.navigate('profileDetails')

          self.props.otp_data({mobile:self.state.sendnum,key:"mobile"});
         
        }
        else if(self.state.choosepage  == "institu_mobile"){
  
        //  self.props.navigation.navigate('profileDetails_institute')
          self.props.otp_data({mobile:self.state.sendnum,key:"mobile"});
        }
        else{


        }
        
      }
      else {

        console.log(response.data);
      
      }
       

    })
    .catch(function (error) {

        console.log(error);
      
    })
}

verifyEmailOtp = (otpValue) => {
  let self = this;
   
 
  const params = {
    "mailId": self.state.PassEmail,
    "otp": otpValue,
    "requestId": self.state.request_ID
  };
 
  axios.post(OTP_POST_VERIFY_EMAIL,params,
    {
      headers: {
        'Authorization':self.state.authorization,
        'Content-Type': 'application/json'
      }
    })
  .then(function (response) {
    // handle success

    if (response.data.status == "Success") {

      console.log("otp",response.data);
   
        self.checkmailupdate();
       
    }
    else {

      self.setState({numvalidate:true,errortext:response.data.message,
        TextInputFirst: '',
        TextInputSecond: '',
        TextInputThird: '',
        TextInputFourth: ''});
        self.refs['first'].focus();
      
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

checkmailupdate = () => {

  let self = this;

  // const params = {
  //   "email": self.state.PassEmail,
  // };
 
  
  axios.get(BASE_URL_LOGIN+POST_UPDATE_EMAIL,  {
    params: {
      email: self.state.PassEmail
    },
    headers: {
        'Authorization': self.state.authorization,
        'Content-Type': 'application/json'
    }
    })
    .then(function (response) {

      if (response.data.status == "Success") {

       
        if(self.state.choosepage  == "indi_email"){

          console.log("indi_email",response.data);
        
      
         self.props.otp_data({mail:self.state.PassEmail,key:"mail"});
       
        
        }
        else if(self.state.choosepage  == "institu_email"){
  
          self.props.otp_data({mail:self.state.PassEmail,key:"mail"});
         // self.props.navigation.navigate('profileDetails_institute')
        }
        else{


        }
        
      }
      else {

        console.log("indi_email",response.data);

        self.setState({numvalidate:true,errortext:response.data.message,
          TextInputFirst: '',
          TextInputSecond: '',
          TextInputThird: '',
          TextInputFourth: ''});
          self.refs['first'].focus();
        
      
      }
       

    })
    .catch(function (error) {

        console.log(error);
      
    })

};

onResendOtp = () => { 
  let self = this;
 
    if(this.state.count == 0){

      this.setState({otpresend: false});
      this.startTimer();

      if(this.state.choosepage  == "indi_email" || this.state.choosepage  == "institu_email"){

        this.emailOtp_Send();
      }
      else if(this.state.choosepage  == "indi_mobile" || this.state.choosepage  == "institu_mobile"){

        this.onSubmitMobile();
      
      }
      else{

      }
                 
  }else{

    self.setState({resendsecond: true});
   
  }

}

onSubmitMobile = () => {
  let self = this;
    
  
  axios.get('https://api.msg91.com/api/v5/otp?authkey=156873AC11NF8mRv5f2d2698P1&mobile=91' +self.state.sendnum+ '&invisible=1&userip=IPV4', {
    })
    .then(function (response) {
       
      console.log(response.data);
      if(response.data.type == "success"){

        self.setState({ count: self.state.count + 1 })
        self.setState({
          TextInputFirst: '',
          TextInputSecond: '',
          TextInputThird: '',
          TextInputFourth: ''});

      }
      else{


      }
     
      
    })
    .catch(function (error) {
        console.log(error);
       //alert(error);
    })

 
  
}
emailOtp_Send = ()=>{

  let self = this;
  const params = JSON.stringify({
    "mailId":self.state.PassEmail, 
  });

  this.setState({numvalidate:false,errortext:''});

 
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

      console.log("otp",response.data);
      const requestId = response.data.data.requestId;
      self.setState({request_ID:requestId})
     self.setState({ count: self.state.count + 1 })
        self.setState({
          TextInputFirst: '',
          TextInputSecond: '',
          TextInputThird: '',
          TextInputFourth: ''});
     
    }
    else {

      this.setState({numvalidate:false,errortext:''});
      Toast.show(response.data.message, Toast.SHORT);
    }
   
 
  })
  .catch(function (error) {
    // handle error
    console.log("error_otp", error);
  });


}


render() {

        return (
            <View style={styles.Container}>   
              <Loader loading={this.state.loading} />
              {/* <Appbar.Header style = {styles.toolbarstyle}>
                       
              </Appbar.Header> */}
            <Text  style={styles.Textone}>{this.state.PLEASETYPEOTP}
            <Text  style={styles.TextTwo}>{this.state.PLEASETYPEOTP1}</Text>
            <Text  style={styles.Textone}>{this.state.PLEASETYPEOTP2}</Text>
            </Text>

            <View style={styles.Viewcontainer}>

            <TextInput
                   ref='first'
                   maxLength ={1}
                   style={styles.TextInputBox}
                   placeholderTextColor = {LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                   secureTextEntry={this.state.showpassword}
                   numeric
                   keyboardType={'numeric'}
                //   numberOfLines={1}
                   value={this.state.TextInputFirst} 
                  // onChangeText={(TextInputFirst) => this.onTextChanged(TextInputFirst,2)}
                   onChangeText={(TextInputFirst) => {
                     this.setState({TextInputFirst})
                     this.refs['second'].focus()       
                 }}      
                 //this.refs['second'].focus()             
                   />

               <TextInput
                   ref='second'
                   style={styles.TextInputBox}
                   placeholderTextColor = {LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                   value={this.state.TextInputSecond} 
                   secureTextEntry={this.state.showpassword}
                   maxLength ={1}
                  // autoFocus={this.state.autoFocus2}
                   numeric
                   keyboardType={'numeric'}
                  // onChangeText={(TextInputSecond) => this.onTextChanged(TextInputSecond,3)}
                   onChangeText={(TextInputSecond) => {
                    this.setState({TextInputSecond})
                    this.refs['third'].focus()
                }} 
                 />
                    
                  <TextInput
                   ref='third'
                   style={styles.TextInputBox}
                   placeholderTextColor = {LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                   value={this.state.TextInputThird} 
                   secureTextEntry={this.state.showpassword}
                   maxLength ={1}
                 // autoFocus={this.state.autoFocus3}
                   numeric
                   keyboardType={'numeric'}
                 //  onChangeText={(TextInputThird) => this.onTextChanged(TextInputThird,3)}
                   onChangeText={(TextInputThird) => {
                    this.setState({TextInputThird})
                    this.refs['fourth'].focus()
                }} 
                />

                  <TextInput
                   ref='fourth'
                   style={styles.TextInputBox}
                   placeholderTextColor = {LABELCONSTANT.TEXTCOLOR.PLASCEHOLDERGRAY}
                   value={this.state.TextInputFourth} 
                   secureTextEntry={this.state.showpassword}
                   maxLength ={1}
                   numeric
                   keyboardType={'numeric'}
                   onChangeText={(TextInputFourth) => {
                    this.setState({TextInputFourth})
                   
                }} />
              
                 </View>

                 {this.state.numvalidate ? (
                   <Text style={styles.errorMessage}>
                   {this.state.errortext} </Text>) : null }


              
                    
                    <View style={styles.Viewcontainermain}>

                   
                 {this.state.resendsecond ? (  
                   <View style={{
                    flexDirection: 'row',margin:10}}>
                      <IconButton
              icon="information-outline"
              color='red'
              size={20}/>

             <Text style={styles.resendfailed}>{LABELCONSTANT.LBL_OTP.RESEND_FAILED}</Text>
             
             </View> ):
             (  this.state.otpresend ? (
              <View style={styles.Viewcontainer1}>

             <Text style={styles.dontreceive}>{LABELCONSTANT.LBL_OTP.DONTRECEIVE}</Text> 
           
             <TouchableOpacity
              onPress = {() =>  this.onResendOtp()}>
              <Text style={styles.resendtext}>{LABELCONSTANT.LBL_OTP.RESEND}</Text>

          </TouchableOpacity>
          </View >
          ): <Text style={styles.dontreceivenumber}>{"00 : "+this.state.counter+" s"}</Text> )}

             </View> 

         
            
            
                <TouchableOpacity
                style = {styles.submitButton}
                onPress={() => this.CheckTextInput()}
               >
                 {this.state.resendsecond ? (  
                <Text style = {styles.submitButtonText}>
                   {LABELCONSTANT.LBL_OTP.CLICK_HERE_PROCEED}</Text>):
                   <Text style = {styles.submitButtonText}>
                   {LABELCONSTANT.LBL_OTP.ACTIVATE}</Text>}
                </TouchableOpacity>
            

              
           </View>


        
        
        
            );


        }

}

const styles = StyleSheet.create({
  Container: {
    flex:1,
   // backgroundColor:'black',
    fontFamily: 'sans-serif',
  },
  toolbarstyle:{
    backgroundColor :'white',
  },
  Viewcontainer:{
    alignItems:"center",flex: 0, 
    flexDirection: 'row',
    justifyContent:"center",
    marginTop:20
  },
  Viewcontainer1:{
    alignItems:"center",flex: 0, 
    flexDirection: 'row',
    justifyContent:"center",
    marginTop:5
  },
  Viewcontainererror:{
    alignItems:"center",flex: 0, 
    flexDirection: 'row',
    justifyContent:"center",
  },
  Viewcontainermain:{
    alignItems:"center",flex: 0, 
    justifyContent:"center",
  },
  TextInputBox:{
    textAlign:"center" ,
    width:40,
    height:0,
    color:'white',
    fontWeight: 'bold',
    borderColor: 'black', 
    borderWidth: 10, 
    backgroundColor:'black',
    borderRadius: 0.7,
    marginRight:10,
    padding:15
  },
  Text: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle:'italic',
    textAlign:"center",
    justifyContent:"center",     
  },
  Textone: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    margin:10,
    fontStyle:'italic',
    marginTop:10,
    justifyContent:"center",
    padding:13,
  },
  TextTwo: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 17,
    fontWeight: 'bold',
    margin:10,
    fontStyle:'italic',
    marginTop:10,
    justifyContent:"center",
    padding:13,
  },
  Texttwo: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle:'italic',
    textAlign:"center",
    justifyContent:"center",
  },
  submitButton: {
    backgroundColor: LABELCONSTANT.TEXTCOLOR.DARKGRAY,
    height: 50,
    marginLeft:50,
    marginRight:50,
  
    borderRadius: 6,
    marginTop:30,
    justifyContent:"center",  
  },
  submitButtonText:{
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    textAlign:"center",
    fontSize: 25,
    fontWeight: 'bold',        
  },
  errorMessage: {
    fontSize: 14,
    color:"red",
    fontWeight: 'bold',  
    alignSelf:"center",  
    padding: 3 ,
    marginTop:10,
  },
  dontreceive: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle:'italic',
    justifyContent:"center",
    padding:13,
  },
  dontreceivenumber: {
    color: 'black',
    fontSize: 15,
    marginTop:10,
    fontWeight: 'bold',
    fontStyle:'italic',
    justifyContent:"center",
    padding:13,
  },
  resendtext: {
    color: LABELCONSTANT.TEXTCOLOR.YELLOW,
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle:'italic',
    marginLeft:-25,
    padding:13,
  },
  resendfailed: {
    color: 'red',
    fontSize: 15,
    marginTop:10,
    fontWeight: 'bold',
    fontStyle:'italic',
    justifyContent:"center",
  },
  
});
