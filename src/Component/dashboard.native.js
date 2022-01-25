
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';


export default class dashboard extends Component {

  constructor(props) {
    super(props);

  }


  render() {


    return (

      <View style={styles.layoutstyle} >

        <StatusBar style="light-content" hidden={false} backgroundColor="#000" translucent={true} />


        <Text style={styles.sociallogintext}> Dashboard Screen</Text>




      </View>




    );
  }

}

const styles = StyleSheet.create({

  layoutstyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },

  sociallogintext: {
    fontSize: 20,
    color: "#696969"
  },


});