import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity,Alert} from 'react-native';
import LABELCONSTANT from '../shared/label.constants';

export default class Cookie extends Component{

  state = {
      accepted: false
  }

  render(){
    return (
     <View style={styles.container}>
           
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                      accepted: true
                  })
                }
              }}
            >
               <Text style={styles.titlehead}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBHEADING}</Text>
                <Text style={styles.tcP}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBBODY}</Text>
                <Text style={styles.titlehead}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBHEADING1}</Text>
                <Text style={styles.tcP}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBBODY1}</Text>
                <Text style={styles.titlehead}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBHEADING2}</Text>
                <Text style={styles.tcP}>{LABELCONSTANT.LBL_COOKIE.COOKIESUBBODY2}</Text>
                <Text style={styles.titlehead}>{LABELCONSTANT.LBL_COOKIE.COOKIEHEADINGCONTACT}</Text>
                <Text style={styles.tcP}>{LABELCONSTANT.LBL_COOKIE.COOKIECONTACTBODY}</Text>

              
                     </ScrollView>

            <TouchableOpacity disabled={ !this.state.accepted } 
            onPress={ ()=> Alert.alert(LABELCONSTANT.LBL_COOKIE.COOKIEALERT,'Are you accept this Cookie policy?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Yes', onPress: () =>  this.props.navigation.navigate('Register')},
            ],
            { cancelable: false }
          ) }
            style={ this.state.accepted ? styles.button : styles.buttonDisabled }>
              <Text style={styles.buttonLabel}>{LABELCONSTANT.LBL_COMMONS.ACCEPT}</Text></TouchableOpacity>
      </View>
    );
  }

}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'sans-serif',
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  titlehead: {
    fontSize: 18,
    alignSelf: 'flex-start'
},
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}