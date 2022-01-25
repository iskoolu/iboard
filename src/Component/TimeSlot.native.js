import React, { Component, } from 'react';
import { BackHandler,TouchableOpacity,Text,View,StyleSheet,FlatList,Dimensions } from 'react-native';
import { Button,Appbar,TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LABELCONSTANT from '../shared/label.constants';
import { CheckBox } from 'react-native-elements'
import {Picker} from '@react-native-community/picker';
import moment from 'moment';

const deviceheight = Dimensions.get("window").height;
const devicewidth = Dimensions.get("window").width;

export default class TimeSlot extends Component{
    
    constructor(props) {
        super(props);

        let passdatavalue = this.props.passingdata;
        let starttime_set = this.props.passingdata.fromTime;
        let endtime_set = this.props.passingdata.toTime;
        let medium_set = this.props.passingdata.medium;
        let days_set = this.props.passingdata.frequency;

        console.log("pass",passdatavalue);
       
        this.state = {
        durationCalss : '', durationCalssvalidate: true,
        noOfclass:'',noOfclassvalidate: true,
        sessionname:'',sessionratevalidate: true,
        TextInputDisableStatus: false,
        checked:true,
        tuesdaycheck:false,
        showtimepicker:false,
        timeset_start:starttime_set,
        timeset_end:endtime_set,
        whichtime:'',
        PickerSelectedVal : medium_set,
        validate_time:true,
        errorvalidatetime:'',
        validate_Starttime:true,
        errorvalidate_starttime:'',
        daySlots: [
          { id: '0', day: 'Mon', checked_list:true },
          { id: '1', day: 'Tue' , checked_list:true},
          { id: '2', day: 'Wed', checked_list:true },
          { id: '3', day: 'Thu', checked_list:true },
          { id: '4', day: 'Fri' , checked_list:true},
          { id: '5', day: 'Sat' , checked_list:true},
          { id: '6', day: 'Sun' , checked_list:true},
        ],
       languagelist: [
        { id: 1 ,language: 'Select your language'},
        { id: 2 ,language: 'English'},
        { id: 3 ,language: 'Tamil'},
        { id: 4 ,language: 'Hindi'}
       ],
       timearray:[],
      validate_language:true,
      errorValidate_language:'',
      setday:days_set,schedulername:null,
       
    };
    this.daysSelect();
  
    }

    daysSelect = () => {
     
      if(this.state.setday == null)
      {

      }else{

      var days= this.state.setday;
      var res = days.split(",");
     

    this.state.daySlots.map((itemchecked,indexall) =>{

      this.state.daySlots[indexall].checked_list = false

      res.map((item,index)=>{

          var day_check = itemchecked.day;
         
         // day_check != item ? { ...item, checked_list: false } : item

          if(day_check == item){
  
            this.state.daySlots[indexall].checked_list = true
         
          }else{
           
            //this.state.daySlots[indexall].checked_list = false
           // console.log("item",item);
         //   console.log("day_check",day_check);
           //this.state.daySlots[indexall].checked_list = false
            //this.state.daySlots[indexall].checked_list.splice(index, false);
            //console.log("res",true);

          }
  
         
        })

      
            })

          }
    } 
    showTimePicker = (whichtimeset) => {
     
      this.setState({whichtime :whichtimeset})
      this.setState({showtimepicker: this.showtimepicker=true})
    } 
    hideTimePicker = () => {
      this.setState({showtimepicker: this.showtimepicker=false})
    } 
  
    

    handleTimeConfirm = (date) => {
      var date, TimeType, hour, minutes, seconds, fullTime;
      
     
      hour = date.getHours(); 
     
      // if(hour <= 11)
      // {
   
      //   TimeType = 'AM';
   
      // }
      // else{
   
      //   TimeType = 'PM';   
      // }

      // if( hour > 12 )
      // {
      //   hour = hour - 12;
      // }
   
      // if( hour == 0 )
      // {
      //     hour = 12;
      // } 

      minutes = date.getMinutes();
       if(minutes < 10)
       {
         minutes = '0' + minutes.toString();
       }
    
      seconds = date.getSeconds();
      if(seconds < 10)
      {
        seconds = '0' + seconds.toString();
      }
      var timeset = hour.toString() + ':' + minutes.toString() ;
     
      if(this.state.whichtime == "START"){

        this.setState({timeset_start : timeset,validate_Starttime : true})
      }
      else
      {

        var startTime = moment(this.state.timeset_start, "HH:mm");
        var endTime = moment(timeset, "HH:mm");

        if(this.state.timeset_start == ""){

          this.setState({validate_Starttime : false,errorvalidate_starttime:LABELCONSTANT.TIMESLOT.START_TIME}) ;

        } else 
        if(startTime.isBefore(endTime)){
         
          this.setState({timeset_end : timeset,validate_time : true})
        }
        else{

          this.setState({timeset_end : '',validate_time : false,errorvalidatetime:LABELCONSTANT.TIMESLOT.END_TIME_VALIDATION}) ;

        }

       
      }
     
      this.hideTimePicker();

    };
   
    submitAllDetails =  () =>{

    
     if(this.state.timeset_start == null){
   
      this.setState({validate_Starttime : false,errorvalidate_starttime:LABELCONSTANT.TIMESLOT.START_TIME}) ;
     
      }
      else if(this.state.timeset_end == null){
   
        this.setState({validate_time : false,errorvalidatetime:LABELCONSTANT.TIMESLOT.END_TIME}) ;

      }
      else if(this.state.PickerSelectedVal == null){
   
        this.setState({validate_language : false,errorValidate_language:LABELCONSTANT.TIMESLOT.LANGUAGE}) ;

      }
      
      else {
   
       
       var starttime =  this.state.timeset_start;
       var endtime = this.state.timeset_end;
      
       var language = this.state.PickerSelectedVal;

       var truevalue = [];
       this.state.daySlots.map((itemchecked) =>{

      
        var true_check = itemchecked.checked_list;
        if(true_check == true){


          var true_check = itemchecked.day;
        

         
          truevalue.push(true_check);

          
        }else{


        }


      })

       var timeslot = {};
       var time = [];
      
      
       timeslot["fromTime"] = starttime;
       timeslot["toTime"] = endtime;
       timeslot["medium"] = language;
       timeslot["frequency"] = truevalue.toString();
       timeslot["scheduleName"] = this.state.schedulername

       time.push(timeslot);

       console.log("time",time);

       this.props.timeslot_data(timeslot);
    
      }
    };
  
  
    checkThisBox=(itemID)=>{

      let list=this.state.daySlots
      list[itemID].checked_list=!list[itemID].checked_list
      this.setState({daySlots:list})

   }

   componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
   }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.timeslot_data("back");
    return true;
  };
  
  render(){

    
        return(
        
        <View style={styles.Container}>
                                    
                <View style = {styles.textviewstyle}>

               
                  <View  style = {styles.texinputviewstyle}>
                  
                  <View  style = {{width:"100%",justifyContent:'space-between'}}> 
                     <TouchableOpacity  style = {styles.inpudatetexttStyle}
                        onPress={() =>this.showTimePicker('START')}>

                       <TextInput label = "Start time to set" 
                        underlineColor = "#696969"
                        editable={false}
                        value={this.state.timeset_start}
                        onChangeText={timeset_start => this.setState({timeset_start})}
                        theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}
                        style = {styles.inpudatetexttStyle}/>
                 
                      </TouchableOpacity>
                      {this.state.validate_Starttime == false? (
                <Text style={styles.errorMessage}>
                 {this.state.errorvalidate_starttime}
                </Text> ):null}

                </View>
                

                      <View  style = {{width:"100%",justifyContent:'space-between'}}> 

                      <TouchableOpacity  style = {styles.inpudatetexttStyle}
                          onPress={() =>this.showTimePicker('END')}>

                      <TextInput label = "End time to set" 
                        underlineColor = "#696969"
                        editable={false}
                        value={this.state.timeset_end}
                        onChangeText={timeset_end => this.setState({timeset_end})}
                        theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}
                        style = {styles.inpudatetexttStyle}/>
                 
                      </TouchableOpacity>

                      {this.state.validate_time == false? (
                <Text style={styles.errorMessage}>
                 {this.state.errorvalidatetime}
                </Text>
                 ) : null }

                      </View>

                  </View>

                <DateTimePickerModal
                       isVisible={this.state.showtimepicker} 
                       mode='time'
                       
                       is24Hour={false}
                       onConfirm = {this.handleTimeConfirm}
                       onCancel={this.hideTimePicker}/>

                <Picker
                selectedValue={this.state.PickerSelectedVal}
                onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue, validate_language:true})}
                >

                  {
                    
                 this.state.languagelist.map( (item, key)=>{
                  
                  return <Picker.Item label={item.language} value={item.language}  />
                  
                   })
                  }
                
                </Picker>
                {this.state.validate_language == false? (
                <Text style={styles.errorMessage}>
                 {this.state.errorValidate_language}
                </Text>
                 ) : null }

                  <FlatList
                      style = {styles.FlatListStyle}
                      numColumns={3}
                      data ={this.state.daySlots}
                      extraData={this.state}
                      renderItem={({item})=>
                      <View style = {{ flex:1,
                        backgroundColor:'#fff',}} >

                    <CheckBox
                    activeOpacity={1}
                      title={item.day}
                      checked={this.state.daySlots[item.id].checked_list}
                      onPress={() => this.checkThisBox(item.id)}/>
                        
                        </View>
                     } 
                      keyExtractor={(item =>item.id)}>
                 </FlatList>

                 <TextInput
                    label="Schedule Name"
                    placeholder="Schedule name (optional)"
                    underlineColor="#696969"
                    keyboardType='email-address'
                    mode="flat"
                    onChangeText={schedulername => this.setState({ schedulername })}
                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                    style={styles.inputStyle} />

              </View>

           
              <Button style = {styles.buttonstyle}  
                color = "#696969"
                mode = "contained"
                onPress={() => this.submitAllDetails()} >
                    
                  {LABELCONSTANT.CLASS_CREATION.CREATED}

              </Button>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
Container: {
    flex:1,
    backgroundColor:'#fff',
    justifyContent: 'flex-end',
},
inputStyle: {
  marginTop: 10,
  backgroundColor:"#fff",
  width:"95%",
  alignSelf:'center'
},
inpudatetexttStyle: {
  width:"90%",
  backgroundColor:"#fff"
},
scrollView: {
    marginHorizontal: 0,
},
textviewstyle:{
    flex: 1,
    padding: 10,
    maxHeight:deviceheight *0.5,
    maxWidth:devicewidth*1
   
},
FlatListStyle: {
  height:"200%",
  backgroundColor:'#fff',
  borderColor: "#000",
  fontSize: 20,
 // alignContent:"center",
},
backpresstext:{
    color : "#696969",
    fontSize : 18
},
toolbarstyle:{
    backgroundColor :"#ffd700",
},
errorMessage: {
  fontSize: 14,
  color:"red",
  marginLeft:10, 
},
buttonstyle:{
    color : "#696969",
    margin:5,
    width:"50%",
    alignSelf:"center",
    padding:5,
},
alertdialogstyle:{
    backgroundColor : "#696969",
  
},
Radiobuttonstyle:{
    margin:5,
    padding:5,
    marginTop:10
},
iconviewstyle:{
    flexDirection:'row',
    alignItems:"center",  
},

containerTime:{
  flexDirection:'row',
  alignItems:"center",  
},
texinputviewstyle:{
  flexDirection:'row',
  width:"50%",
  justifyContent:'space-between'
},
radiotextstyle:{
    color : "#696969",
    fontSize: 16,
    padding:12
},
texttimestyle:{
  color : "#696969",
  fontSize: 16,
  marginTop:50
},


});

