
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,BackHandler,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Appbar ,TextInput, Button ,} from 'react-native-paper';


export default class editProfile extends Component{

  constructor(props) {
    
    super(props);

    this.state = {
      name : '',namevalidate: true,
      email :'',emailvalidate: true,
      year:'',yearvalidate: true,
      description : '',descriptionvalidate: true,};

  }

  onnameText = (name) =>{

    if(name.trim().length >= 3){

      this.setState({name: name , namevalidate: true}) ;
   
     }else{
    
        this.setState({name: '', namevalidate: false}) ;
     }

  } 

  onemailText = (email) =>{

    if(email.trim().length >= 3){

      this.setState({email : email, emailvalidate : true}) ;
   
     }else{
    
        this.setState({email : '', emailvalidate : false}) ;
     }

  } 

  onyearText = (year) =>{

    if(year.trim().length >= 3){

      this.setState({year : year, yearvalidate : true}) ;
   
     }else{
    
        this.setState({year : '', yearvalidate : false}) ;
     }

  } 

  ondescriptionText = (description) =>{

    if(description.trim().length >= 3){

      this.setState({description : description, descriptionvalidate : true}) ;
   
     }else{
    
        this.setState({description : '', descriptionvalidate : false}) ;
     }

  } 

  submitAllDetails =  () =>{

    if(this.state.name == '')
    {
 
     Toast.show(constantvalue.enterMailorNumber, Toast.SHORT);
    
    }
    else if(sthis.tate.email == ''){
 
      Toast.show(constantvalue.enterPassword, Toast.SHORT);
 
    }
    else if(this.state.year == ''){
 
      Toast.show(constantvalue.enterPassword, Toast.SHORT);
 
    }
    else if(this.state.description == ''){
 
      Toast.show(constantvalue.enterPassword, Toast.SHORT);
 
    }
    else {
 
     var phone =  this.state.text_number;
     var password = this.state.text_password;
    
    }

  };

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

      <View style={styles.layoutstyle}>
        
        <Appbar.Header style = {styles.toolbarstyle}>
                    <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()}  />
      
        </Appbar.Header>

       
        <View style = {styles.iconviewstyle}>
        <Text style={styles.textsmallstyle}>Profile Photo</Text>

        </View>
          <TouchableOpacity>
          <View style = {styles.imageviewstyle}>
            
            <Avatar.Image style = {styles.imagestyle} size={80}  />
                     
            <Button  style = {styles.editstyle} icon="camera" mode="Text" color = "#ffd700" >
                
                  <Text style={styles.buttontextstyle}>Add Photo</Text>

            </Button>
         

          </View>
          </TouchableOpacity>
          <View style= {styles.divederstyle}/>
          <View style = {styles.iconviewstyle}>
        
          <TextInput label = "Name" 
                 underlineColor = "#696969"
                 theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}  
                 style = {styles.inputStyle} />
          
          <TextInput label = "Email" 
                 underlineColor = "#696969"
                 theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}  
                 style = {styles.inputStyle} />
          
          <TextInput label = "Experience" 
                 underlineColor = "#696969"
                 theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}  
                 style = {styles.inputStyle} />
          
          <TextInput label = "Description" 
                 underlineColor = "#696969"
                 theme={{ colors: { primary:'gray',underlineColor:'transparent',}}}  
                 style = {styles.inputStyle} />
          
          </View>

          <Button style = {styles.buttonstyle}  
                color = "#696969"
                mode = "contained" >
                    
              <Text style={{color:"#ffd700"}}>Save Changes</Text>

          </Button>
           
      </View>
      
      );
  }

}

const styles = StyleSheet.create({

  layoutstyle :{
    flex: 1,
    backgroundColor: "#fff"
  },
  btntext:{
    fontSize: 25,
    color: "#ffd700",
    textAlign: "center",
    fontWeight: "bold"
  },
  imageviewstyle:{
    flexDirection:"row",
    alignItems:"center",
    padding: 5,
  },
  nameviewstyle:{
    flex: 1,
    marginTop: 5,
  },
  imagestyle:{
    margin:10,
  },
  textstyle:{
    color: "#696969",
    fontSize:18,
  },
  editstyle: {
    width:"45%",
  },
  textsmallstyle:{
    color: "#696969",
    fontSize:15,
  },
  divederstyle:{
    borderWidth:0.4,
    borderColor:"#D3D3D3"
  },
  texticonstyle:{
    color: "#000",
    fontSize:13,
  },
  iconviewstyle:{
    padding:10
  },
  icontextviewstyle:{
    flex: 1,
    margin:5,
    bottom:5,
    alignItems:"center",
  },
  titlestyle:{
    color:"#696969",
    fontSize:15,
    height:"26%",
    
  },
  inputStyle: {
    backgroundColor:"#fff",
    padding:5
  },
  toolbarstyle:{
    backgroundColor :"#fff",
  },
  buttonstyle:{
    color : "#696969",
    borderRadius: 10,
    margin:20,
    padding:5,
},


});


