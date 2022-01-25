
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import constantvalue from "../shared/label.constants";
import { List , Appbar ,} from 'react-native-paper';



export default class myClass extends Component{

  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('profile');
    return true;
  };


 

  render(){

    return(

      <View style={styles.layoutstyle}>
        
        <Appbar.Header style = {styles.toolbarstyle}>
                    <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()}  />
      
        </Appbar.Header>
         
          <View style={styles.layoutstyle}>
            
            <List.Section style={styles.liststyle} >

              <List.Item style={styles.titlestyle}
              title={constantvalue.profile.classestitle}  />

              <List.Item style={styles.listtextstyle}
              title={constantvalue.profile.createclass}
              onPress = {() => this.props.navigation.navigate('classcreation',{key:"create"})} 
              left={() => <List.Icon color="#000" icon="plus" />} />

              <List.Item style={styles.listtextstyle}
              title={constantvalue.homepage.ongoingclass}
              onPress = {() => this.props.navigation.navigate('OnGoingClass')} 
              left={() => <List.Icon color="#000" icon="sync" />}
              />
              <List.Item style={styles.listtextstyle}
              title={constantvalue.homepage.futureClass}
              onPress = {() => this.props.navigation.navigate('FutureClass')} 
              left={() => <List.Icon color="#000" icon="calendar-clock" />}
              />
              <List.Item style={styles.listtextstyle}
              title={constantvalue.homepage.overallclass}
              onPress = {() => this.props.navigation.navigate('OverAllClass')} 
              left={() => <List.Icon color="#000" icon="feature-search-outline" />}
              />
              
            </List.Section>
            
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
  textstyle:{
    color: "#696969",
    fontSize:18,
  },
  listtextstyle:{
    color: "#696969",
    fontSize:18,
    height:"20%",
    margin:-3,
   
  },
  divederstyle:{
    borderWidth:0.4,
    borderColor:"#D3D3D3"
  },
  titlestyle:{
    color:"#696969",
    fontSize:15,
    height:"15%",
    
  },
  liststyle:{
    color:"#696969",
    height:"50%"
  },
  toolbarstyle:{
    backgroundColor :"#fff",
  },

});


