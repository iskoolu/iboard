
import React, { Component } from 'react';
import {StyleSheet,View,Text,Image,} from 'react-native';
import constantvalue from "../Constant/constantvalue";
import { Appbar,List } from 'react-native-paper';
import imagesconstant from "../Constant/imagesconstant";


export default class payment extends Component{

  constructor(props) {
    super(props);
    
  }
  
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  render(){

    return(

      <View style={styles.layoutstyle}>
        
            <Appbar.Header
                   style = {styles.toolbarstyle}>
                    <Appbar.BackAction color = '#000' onPress={() => {}} />
                    <Text >{constantvalue.paymentmethod.toolbartext}</Text>
           </Appbar.Header>
           
           <Image
              style={styles.tinyLogo}
              source={imagesconstant.paytm}
           />
           
           <List.Item style={styles.listtextstyle}
              title={constantvalue.paymentmethod.paytmtext}
              description={constantvalue.paymentmethod.descriptionPaytm}
              onPress = {() => this.props.navigation.navigate('classcreation')} 
              left={() => <List.Icon   icon={imagesconstant.paytm}/>}
              right={() => <List.Icon   icon="chevron-right"/>} />
        
        <View style= {styles.divederstyle}  />

        <List.Item style={styles.listtextstyle}
              title={constantvalue.paymentmethod.onlinepay}
              description={constantvalue.paymentmethod.onlinedescription}/>
              
              <List.Item style={styles.listtextstyle}
              title={constantvalue.paymentmethod.cardtext}
              onPress = {() => this.props.navigation.navigate('classcreation')} 
              left={() => <List.Icon   icon="card-text-outline"/>}
              right={() => <List.Icon   icon="chevron-right"/>} />
              
              <List.Item style={styles.listtextstyle}
              title={constantvalue.paymentmethod.netbank}
              onPress = {() => this.props.navigation.navigate('checkoutPayment')} 
              left={() => <List.Icon   icon="bank-plus"/>}
              right={() => <List.Icon   icon="chevron-right"/>} />
              
        <View style= {styles.divederstyle}  />
        
        <List.Item style={styles.textshowstyle}
              title={constantvalue.paymentmethod.upi}/>
              
              <List.Item style={styles.listtextstyle}
              title={constantvalue.paymentmethod.payupi}
              description={constantvalue.paymentmethod.upiregister}
              left={() => <List.Icon   icon={imagesconstant.upi}/>}
              right={() => <List.Icon   icon="chevron-right"/>} />
  
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
    height:"13%",
    margin:-3,
   
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
    flexDirection:"row",
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

toolbarstyle:{
    backgroundColor :"#fff",
   
},
tinyLogo: {
    margin:10,
    width:"20%",
    height:"3%"
  
},
textshowstyle:{
  fontSize:18,
  height:"5%",
  margin:-1,
 
},

});