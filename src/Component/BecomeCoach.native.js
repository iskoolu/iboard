
import React, { Component } from 'react';
import {ScrollView,StyleSheet,View,Text,BackHandler,TouchableOpacity} from 'react-native';
import constantvalue from "../shared/label.constants";
import { Appbar, List ,Button,IconButton, Colors ,} from 'react-native-paper';


export default class becomeCoach extends Component{

  constructor(props) {
    super(props);
    this.state = {token : '',
        userInfo: '',
        gmail:'',
        name:'',
        image:'',
        appbarcheck: true,
    };   

  
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

 

  gotoProfileDetails() {


    const userdata = this.state.userInfo;

    if(this.state.userInfo.userType == "INDIVIDUAL"){

      this.props.navigation.navigate('profileDetails',{userdata})

    }else{

      this.props.navigation.navigate('profileDetails_institute',{userdata,keyvalue:false})

    }

    

 
  }
  
  render(){
  
    return(

      <View style={styles.layoutstyle}>
        
        <View style = {styles.iconviewstyle}>
         
        

         <IconButton
           icon="file-document-outline"
           color="#ffd700"
           size={30}/>


         <Text style={styles.nodatatextstyle}>
          Terms and Conditions
         </Text>

         <Text style={styles.smallstyle}>
         Particularly useful if you offer software as a service (SaaS) applications, this section protects you from abusive users by giving 
         you the right to suspend user accounts and delete any content they post.
         </Text>


         <Button
            color = "#696969"
            mode="contained"
            style={(styles.buttonstyle)}
            onPress = {() => this.props.navigation.navigate('classcreation',{key:"create"})} 
          >

            Create Course

         </Button>

        

         

       
        </View>
    
          
      
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
  nodatatextstyle: {
    fontSize: 18,
    color: "#696969",
    alignSelf:'center',
    fontWeight: "bold"
  },
  smallstyle: {
    fontSize: 15,
    color: "#696969",
    alignSelf:'center',
    margin:10
    
  },
  buttonstyle: {
    backgroundColor: "#696969",
    margin: 5,
    padding: 5,
    marginRight:10,
    alignSelf: 'flex-end',
  },
  imageviewstyle:{
    flexDirection:"row",
    padding: 5,
    alignItems:"center",
    marginTop: 5,
  },
  nameviewstyle:{
    flex: 1,
    padding: 10,
    marginTop: 5,
  },
  imagestyle:{
    margin:10,
  },
  textstyle:{
    color: "#696969",
    fontSize:18,
  },
  listtextstyle:{
    color: "#696969",
    fontSize:18,
    height:"30%",
    margin:-3,
   
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },
  textsmallstyle:{
    color: "#696969",
    fontSize:13,
  },
  divederstyle:{
    borderWidth:0.5,
    borderColor:"#D3D3D3"
  },
  texticonstyle:{
    color: "#000",
    fontSize:13,
  },
  iconviewstyle:{
    marginTop:10,
   
    alignItems:"center",
   
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
  liststyle:{
    color:"#696969",
    height:"50%"
  },


});


