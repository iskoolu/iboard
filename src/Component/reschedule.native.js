import React, { Component, } from 'react';
import { BackHandler,TouchableOpacity,View,StyleSheet } from 'react-native';
import { Button,Appbar,TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LABELCONSTANT from '../shared/label.constants';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';

export default class reschedule extends Component{
    
    constructor(props) {

        super(props);
        this.state = {
        durationCalss : '', durationCalssvalidate: true,
        noOfclass:'',noOfclassvalidate: true,
        sessionname:'',sessionratevalidate: true,
        TextInputDisableStatus: false,
        showdatepicker:false,
        rescheduledate:'',
        PickerSelectedVal : '',
       currencies: [
        { id: 1 ,language: 'Select your time slot'},
        { id: 2 ,language: '3pm-5pm'},
        { id: 3 ,language: '10am-12pm'},
        { id: 4 ,language: '6pm-8pm'}
       ],
       timearray:[],
       greetingMessag: "chech greeting",
    };
      
  
    }

   
    showdatePicker = () => {
     
      this.setState({showdatepicker: this.showdatepicker=true})
    } 
    hidedatePicker = () => {
      this.setState({showdatepicker: this.showdatepicker=false})
    } 
  
    onSubmit() {
      this.props.onSubmitMessage(this.state.greetingMessag);
    }

    handleTimeConfirm = (date) => {

      var date_set = date.getDate() + "-"+ parseInt(date.getMonth()+1) +"-"+date.getFullYear();

      this.setState({rescheduledate : date_set})
      
      this.hidedatePicker();

    };
   
  
    submitAllDetails =  () =>{

     if(this.state.rescheduledate == ''){
   
        Toast.show(LABELCONSTANT.CLASS_CREATION.ERROR_SUBTITLE, Toast.SHORT);
     
      }
    
      else {
   
       var starttime =  this.state.rescheduledate;
       var language = this.state.PickerSelectedVal;
    

       var timeslot = {};
       var time = [];

       timeslot["starttime"] = starttime;
       timeslot["endtime"] = endtime;
       timeslot["medium"] = language;

       time.push(timeslot);

      // global.MyVar = time;
       console.log("time",time);

      }
    };
 
    pickerChange(index){
      this.state.currencies.map( (v,i)=>{
       if( index === i ){
        
        this.setState({
         PickerSelectedVal: this.state.currencies[index].language,
         currentLabel: this.state.currencies[index].currencyLabel,
        })

       }
      })
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
    
  render(){

    return(
        
        <View style={styles.Container}>
            
            <Appbar.Header style = {styles.toolbarstyle}>
                    <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()} />
                    <Appbar.Content color = '#696969'  title="Timeslot" />
      
           </Appbar.Header>
                                    
                <View style = {styles.textviewstyle}>

                  <TouchableOpacity  style = {styles.inpudatetexttStyle}
                        onPress={() =>this.showdatePicker()}>

                       <TextInput label = "select the date to reschedule" 
                        underlineColor = "#696969"
                        editable={false}
                        value={this.state.rescheduledate}
                        onChangeText={rescheduledate => this.setState({rescheduledate})}
                        theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}
                        style = {styles.inpudatetexttStyle}/>
                 
                  </TouchableOpacity>

                <DateTimePickerModal
                       isVisible={this.state.showdatepicker} 
                       mode='date'
                       is24Hour={false}
                       minimumDate={new Date()}
                       onConfirm = {this.handleTimeConfirm}
                       onCancel={this.hidedatePicker}/>

                <Picker
                selectedValue={this.state.PickerSelectedVal}
                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>

                  {
                 this.state.currencies.map( (v)=>{
                  return <Picker.Item label={v.language} value={v.language} />
                   })
                  }
                
                </Picker>

              
                <Button style = {styles.buttonstyle}  
                color = "#696969"
                mode = "contained"
                onPress={() => this.submitAllDetails()} >
                    
                  {LABELCONSTANT.CLASS_CREATION.CREATED}

                </Button>

              </View>

           
        
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
Container: {
    flex:1,
    backgroundColor:'#fff'
},
inputStyle: {
  marginTop: 10,
  backgroundColor:"#fff"
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
    marginTop: 5,
},
FlatListStyle: {
  backgroundColor:'#fff',
  borderColor: "#000",
  fontSize: 20,
  alignContent:"center",
},
backpresstext:{
    color : "#696969",
    fontSize : 18
},
toolbarstyle:{
    backgroundColor :"#ffd700",
},
buttonstyle:{
    color : "#696969",
    borderRadius: 10,
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