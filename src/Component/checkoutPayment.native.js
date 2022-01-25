
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
} from 'react-native';
import { Avatar ,Button ,Appbar} from 'react-native-paper';
import axios from 'axios';
import { encode } from "base-64";
import RazorpayCheckout from 'react-native-razorpay';
import {BASE_URL_LOGIN,POST_VERIFY_CHECKOUT,POST_ENROLL_COURSE} from '../services/api.constans';
import AsyncStorage from '@react-native-community/async-storage';


export default class CheckoutPayment extends Component{

  constructor(props) {
    super(props);

    const timeslot = this.props.route.params.itemslot;
    const data_item = this.props.route.params.data;

    this.state = {text_number : '',
     text_password: '',authorization:'',
     courseName:data_item.courseName,
     rateperCourse:data_item.ratePerCourse,
     taxval:(10 / 100) * data_item.ratePerCourse,
     totalval:data_item.ratePerCourse + (10 / 100) * data_item.ratePerCourse,
     courseID:data_item.courseId,
     scheduleID:timeslot.scheduleId,
    
    };
   
  }

  componentDidMount() {
    this.authtoken_fun();
    
  }

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: value });


    } catch (e) {
      // error reading value
    }
  }

  razororder = () =>{
     let self = this;
    var amount_var = 100;
    var receipt_var = this.state.courseName;
    var login = 'rzp_test_3pkPRZzYcYAIoW';
    var password = 'jZ78XB6zgwuysuifvKlQVKur';
 
    axios
    .post('https://api.razorpay.com/v1/orders', {
      
       "amount": amount_var,
        "currency": "INR",
        "receipt": receipt_var,
        "payment_capture": 1,
      },
      {  
        headers: {
        'Authorization': 'Basic ' + encode(login + ":" + password), 
        'Content-Type': 'application/json'
    } 
    }) 
    .then(function(response) {
      // handle success
     
      console.log(response.data);
     
      var order_ID = response.data.id;
      
      self.checkoutPayment(order_ID);
    })
    .catch(function(error) {
      console.log(error);
    });
     
  };

  checkoutPayment =  (order_ID) =>{

    var options = {
     // description: 'Credits towards consultation',
    //  image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_3pkPRZzYcYAIoW',
     // amount: '100',
      name: 'dev',
      order_id: order_ID ,
      prefill: {
        email: 'dev@example.com',
        contact: '9191919191',
        method: 'upi',
       
      },
      theme: {color: '#ffd700' }
    }
 
    RazorpayCheckout.open(options).then((data) => {
     // handle success
     
     console.log("RazorpayCheckout",data);
     //this.props.navigation.navigate('detail')
 
     this.verifyCheckout(data);
  
   }).catch((error) => {
     // handle failure
     console.log(error);
 
    // this.props.navigation.navigate('detail')
   //  alert(`Error: ${error.code} | ${error.description}`);
   });
 
  
 };

 verifyCheckout =(data)=>{
  const checkout = this.props.route.params.checkout_id;
  let self = this;
  var payload={
    "iskooluCheckoutId":checkout,
    "vendorOrderId": data.razorpay_order_id,
    "vendorPaymentId": data.razorpay_payment_id,
    "vendorSignature": data.razorpay_signature,
  }
  axios.post(BASE_URL_LOGIN + POST_VERIFY_CHECKOUT, payload,
    {
      headers: {
        'Authorization': this.state.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      // handle success

      console.log(response.data);
      if(response.data.status==="Success"){

      self.enrolledCourse();

      }
      else {

       Alert.alert(
       "Payment Failed",
       response.data,
       [
         {
           text: "OK",
           onPress: () => console.log("ok Pressed"),
           style: "OK"
         },
         
       ],
       { cancelable: false }
      );

     }

    })
    .catch(function (error) {
      // handle error
      console.log("error", error);
    });
  
 }

 enrolledCourse = ()=>{
  let self = this;
  var payload={
    "courseId":this.state.courseID,
    "scheduleId":this.state.scheduleID
  }
 
  axios.post(BASE_URL_LOGIN + POST_ENROLL_COURSE, payload,
    {
      headers: {
        'Authorization': this.state.authorization,
        'Content-Type': 'application/json'
      }
    }
  )
    .then(function (response) {
      // handle success

      console.log(response.data);
       if (response.data.status == "Success") {

        Alert.alert(
       "Sucssfully joined in online Course",
       response.data.message,
       [
         {
           text: "OK",
           onPress: () => console.log("ok Pressed"),
           style: "OK"
         },
         
       ],
       { cancelable: false }
     );

       }
        else {

          Alert.alert(
            "Enrolled Failed",
            response.data,
            [
              {
                text: "OK",
                onPress: () => console.log("ok Pressed"),
                style: "OK"
              },
              
            ],
            { cancelable: false }
           );
        }

    })
    .catch(function (error) {
      // handle error
     
      console.log("error", error);
    });
 }

  render(){

    const timeslot = this.props.route.params.itemslot;
    const data_item = this.props.route.params.data;
  

   

    return(

      <View style = {styles.layoutstyle} >

         <Appbar.Header style = {styles.toolbarstyle}>
                    <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()} />
                    <Appbar.Content color = '#696969'   />
      
           </Appbar.Header>
        
         <View style={{flexDirection:"row",margin:20,justifyContent: 'space-between',}}>
           
           <Avatar.Icon style={{marginRight:5,backgroundColor:'#ffd700',alignSelf:'center'}} 
              size={30} 
              icon="arrow-top-right"
              color="#fff" />

           <View style={{margin:5,flex:1, position: 'relative', left: 0,}}>
             
             <Text style = {styles.bigtextstyle}>{data_item.courseName}</Text>
             {/* <Text style = {styles.textstyle}>Ms.Kalaiyarasi</Text> */}

             <View style={{flexDirection:"row",marginRight:10}}>

             <Text style = {{  fontSize: 13,color: "#000",marginRight:10}}>Date:</Text>

             <Text style = {styles.textstyle}>{data_item.fromDate} - {data_item.toDate}</Text>

             </View>
             <View style={{flexDirection:"row",marginRight:10}}>
             <Text style = {{  fontSize: 13,color: "#000",marginRight:10}}>Time:</Text>

             <Text style = {styles.textstyle}>{timeslot.fromTime} - {timeslot.toTime}</Text>

             </View>
           </View >
           
            <Text style = {styles.amounttextstyle}>{data_item.ratePerCourse}</Text>

          </View>

          {/* <View style={{justifyContent: 'space-between',marginLeft:20,margin:5}}>
          <View style={{flexDirection:"row",marginRight:10}}>

             <Text style = {{  fontSize: 13,color: "#000",marginRight:10}}>Date:</Text>

             <Text style = {styles.textstyle}>{data_item.fromDate} - {data_item.toDate}</Text>

             </View>

             <View style={{flexDirection:"row",marginRight:10}}>
             <Text style = {{  fontSize: 13,color: "#000",marginRight:10}}>Time:</Text>

             <Text style = {styles.smallblackstyle}>{timeslot.fromTime} - {timeslot.toTime}</Text>

             </View>
          
          </View> */}

          <View style= {styles.divederstyle}  />

        <Text style = {{fontSize:20,margin:10,textAlign:"center"}}>Payment Details</Text>
        <View style= {styles.divederstyle}  />

        <View style={{flexDirection:"row",margin:10,justifyContent: 'space-between',}}>

           <Text style={{color:"#000",fontSize:18,position: 'relative', left: 0}}>Course Amount Total</Text>
           
           <Text style={{color:"#000",fontSize:18,position: 'relative', right: 0}}>
             {this.state.rateperCourse}
           </Text>
        
        </View>

        {/* <View style={{flexDirection:"row",margin:10,justifyContent: 'space-between',}}>

           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', left: 0}}>Discount</Text>
           
           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', right: 0}}>- ₹100</Text>
        
        </View> */}

        <View style={{flexDirection:"row",margin:10,justifyContent: 'space-between',}}>

           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', left: 0}}>Tax</Text>
           
           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', right: 0}}>
             {this.state.taxval}
           </Text>
        
        </View>

        {/* <View style={{flexDirection:"row",margin:10,justifyContent: 'space-between',}}>

           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', left: 0}}>Course Discount</Text>
           
           <Text style={{color:"#0000FF",fontSize:18,position: 'relative', right: 0}}>- ₹1000</Text>
        
        </View> */}

         <View style={{flexDirection:"row",margin:10,justifyContent: 'space-between',}}>

           <Text style={{color:"#000",fontSize:18,position: 'relative', left: 0}}>Grand Total</Text>
           
           <Text style={{color:"#000",fontSize:18,position: 'relative', right: 0}}>
             {this.state.totalval}
           </Text>
        
        </View>

        <Button style = {styles.buttonstyle}  
               mode = "contained" 
              onPress={() => this.razororder()}>

             <Text style={{color:"#fff",fontSize:20}}>PAY NOW</Text>

        </Button>

     
    
    




     
      </View>

    );
  }

}

const styles = StyleSheet.create({

  layoutstyle :{
    flex: 1,
  },
  buttonstyle:{
    backgroundColor : "#ffd700",
    margin:10,
    padding:5,
 },
 divederstyle:{
  borderWidth:0.5,
  borderColor:"#D3D3D3"
 },
 toolbarstyle:{
  backgroundColor :"#fff",
 },
 amounttextstyle:{
  fontSize: 18,
  color: "#000",
  margin:5,
},
bigtextstyle:{
    fontSize: 18,
    color: "#000", 
},
smallblackstyle:{
  fontSize: 13,
  color: "#000", 
},
textstyle:{
  fontSize: 13,
  color: "#696969",
},
  

});
