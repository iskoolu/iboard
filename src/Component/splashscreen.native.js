import React, { Component } from 'react'
import {StatusBar,Text, View,TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import LABELCONSTANT from '../shared/label.constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SplashScreen extends Component {

  
  constructor(props) {
    super(props);    

    this.state = {showskip:true,showStarted:false
          
    }
  }
  indexChanged = (index) => {
    if (index === 3) {
      {this.setState({showskip : this.state.showskip=false,showStarted: this.state.showStarted=true})}
    } else {
      {this.setState({showskip : this.state.showskip=true,showStarted: this.state.showStarted=false})}

    }
}


render() {
  
 

    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Swiper
          
          onIndexChanged={index => this.indexChanged(index)}
          style={{backgroundColor: 'black'}}
          dot={<View style={styles.dotview}/>}
          activeDot={<View style={styles.activedotview}/>}
          paginationStyle={{ bottom: 15}}loop={false} >
         <View style={styles.slide}>
         <Text style={styles.text}>{LABELCONSTANT.LBL_INTROSCREEN.INTROSLIDER}</Text>
         <Text style={styles.textwhite}>{LABELCONSTANT.LBL_INTROSCREEN.SLIDE}</Text>
        </View>     
         <View style={styles.slide}>
         <Text style={styles.text}>{LABELCONSTANT.LBL_INTROSCREEN.INTROSLIDER}</Text>
         <Text style={styles.textwhite}>{LABELCONSTANT.LBL_INTROSCREEN.SLIDE1}</Text>
         </View>    
         <View style={styles.slide}>
         <Text style={styles.text}>{LABELCONSTANT.LBL_INTROSCREEN.INTROSLIDER}</Text>
         <Text style={styles.textwhite}>{LABELCONSTANT.LBL_INTROSCREEN.SLIDE2}</Text>
         </View>       
         <View style={styles.slide}>
         <Text style={styles.text}>{LABELCONSTANT.LBL_INTROSCREEN.INTROSLIDER}</Text>
         <Text style={styles.textwhite}>{LABELCONSTANT.LBL_INTROSCREEN.SLIDE3}</Text>
         </View>        
        </Swiper>    
        <View  style={styles.behind}> 
{(this.state.showskip) &&
          <TouchableOpacity
         onPress = {() => this.props.navigation.navigate('login')}
             style={styles.SKIPBUTTON}>
              <Text style={styles.SKIPTEXT}>          
             {LABELCONSTANT.LBL_COMMONS.SKIP}</Text> 
  
        </TouchableOpacity>  }
        {(this.state.showStarted) &&
        <TouchableOpacity
          onPress = {() => this.props.navigation.navigate('login')} 
              style={styles.StartedBUTTON}>
        <Text style={styles.SKIPTEXT}>          
             Get started</Text> 
      </TouchableOpacity> }
        </View> 
      
</View>     
    )
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  dotview: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 6,
    height: 6,
    borderRadius: 17,
    marginLeft: 7,
    marginRight: 7,
    marginBottom:45
  },
  activedotview:{
    backgroundColor: '#FFA500',
    width: 8,
    height: 8,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
    marginBottom:45

  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: 'center', 
  },
  text: {
    color: '#FFA500',
    fontSize: 25,
    fontWeight: 'bold',
    alignItems:"center",
  },
  textwhite: {
    marginTop:10,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignItems:"center",
  },
  SKIPBUTTON:{
    marginRight:130,
    marginLeft:130,
    backgroundColor:'gray',
    borderRadius:5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent:'flex-end',
    marginBottom:10,
    height:40,
    alignItems:'center',
    
    
  },
  StartedBUTTON:{
    marginRight:130,
    marginLeft:130,
    backgroundColor:'gray',
    borderRadius:5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent:'flex-end',
    marginBottom:10,
    height:40,
    width:'60%',
    alignItems:'center',
    
    
  },
  SKIPTEXT:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
      justifyContent:"center",
      fontSize:20,
      alignItems:'center',
      marginBottom:5,
      marginLeft:10,
      marginRight:10
      
    },

      Icon: {
         justifyContent:'space-between',
         alignItems:'center',
         marginBottom:5,
         paddingLeft : 10,
         paddingRight : 10,
         marginLeft:20,
         marginRight:20
      
    },
    behind: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
   
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      overflow: "hidden",
      borderWidth: 3,
    },
    
    }


    class Screen extends Component {
      constructor(props) {
        super(props);    
    
        this.state = {iconshow:false,
              
        }
      }
      render() {
        return (
         
            <View>   
          <TouchableOpacity
         onPress = {() => this.props.navigation.navigate('login')}
             style={styles.SKIPBUTTON}>
              <Text style={styles.SKIPTEXT}>          
             {LABELCONSTANT.LBL_COMMONS.SKIP}</Text> 
  
        </TouchableOpacity>  
        </View>  
        )
      }
    }

    class ScreenThree extends Component {
      constructor(props) {
        super(props);    
        this.state = {iconshow:false,
              
        }
      }
      render() {
        return (
          <View style={styles.SKIPBUTTON}>
          
          <TouchableOpacity
          onPress = {() => this.props.navigation.navigate('login')} >
         <Icon 
                 style={styles.Icon}
                  name="long-arrow-right" 
                  size={25} 
                  color= 'white'/>
      </TouchableOpacity>  
      </View>
        )
      }
    }



