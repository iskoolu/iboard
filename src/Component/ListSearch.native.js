import React, { Component } from 'react'
import {SafeAreaView,View,StyleSheet,Text,FlatList,TouchableOpacity,BackHandler} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar,Card} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL_LOGIN,POST_SUBJECT_SEARCH,GET_TEACHING_COURSE} from '../services/api.constans';
import Toast from 'react-native-simple-toast';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)
const colors = {
  transparent: 'transparent',
  heartColor: '#e92f3c',
  white: '#fff',
  textPrimary: '#515151',
  black: '#000',
}

class ListSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {  
        ontakesubject:[],
      liked: true,
      authorization:'',
      showComponmentRating: false,
      starCount: 2.5,
      }
      this.lastPress = 0
        
    }
  
    authtoken_fun = async () => {
      try {
        const value = await AsyncStorage.getItem('auth_Token');
  
        this.setState({ authorization: value });
  
  
      } catch (e) {
        // error reading value
      }
    }

    componentDidMount() {
     
      this.authtoken_fun();
      const search_value = this.props.searchvalue;
      const authorization = this.props.token;
      
      let self = this;

      const params = {
        "subject":search_value, 
        "offset": 1,
        "size": 1000
      };

      axios.post(BASE_URL_LOGIN + POST_SUBJECT_SEARCH, params,
        {
          headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json'
          }
        }
      )
        .then(function (response) {
          // handle success
  
          if (response.data.status == "Success") {
  
            console.log(response.data.data);
            const datastore = response.data.data;
            self.setState({ ontakesubject: datastore});
  
          }
          else {
  
            Toast.show(response.data, Toast.SHORT);
          }
  
        })
        .catch(function (error) {
          // handle error
         
          console.log("error", error);
        });
     
      
    }
  
    componentWillUnmount() {
     // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

  searchList_fun =() =>{

      
    }

    onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
  
    }
  
    handleLargeAnimatedIconRef = (ref) => {
      this.largeAnimatedIcon = ref
    }
    
    handleSmallAnimatedIconRef = (ref) => {
      this.smallAnimatedIcon = ref
    }
  
    selectedvalue = (item) =>{

     
      const tutor_ID = item.tutorId
      const course_id = item.subject[0].courseId
     
      let self = this;
      const payload = {
        "user-token": tutor_ID,
      };

      axios.get(BASE_URL_LOGIN+GET_TEACHING_COURSE,
        {
          headers: {
            'Authorization': self.state.authorization,
            'Content-Type': 'application/json' 
        },
        params:payload
        })
      .then(function (response) {
        // handle success

        if (response.data.status == "Success") {

       
          const datasend = response.data.data;

          self.props.navigation.navigate('detail',{datasend,key: false,courseID:course_id,item})

        } else {

          console.log("error",response.data);

        }



      })
      .catch(function (error) {
        // handle error
        // alert("error"+error);
        console.log("error", error);
      });

    
      
    };
  
    handleOnPressLike = (item) => {
  
      this.smallAnimatedIcon.bounceIn()
      this.setState(prevState => ({ liked: !prevState.liked }))
    }
  
    render() {
      const { liked } = this.state
     
      // const course_ID = this.props.courseid;
      // console.log("course_ID",course_ID);
      return (
        <SafeAreaView style={{flex: 9,}}>
            
        <FlatList  
            style = {styles.FlatListStyle}
            data ={this.state.ontakesubject} 
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>  

            <Card style = {styles.cardstyle}
            onPress ={() => this.selectedvalue(item)}         >
 
              <View style={{alignItems:"center", flexDirection: 'row',padding:5}}>
               <Text>{item.sub}</Text>           
           <View style={{position: 'absolute', right: 0,marginRight:10 }}>
             <TouchableOpacity
               activeOpacity={1}
               onPress={this.handleOnPressLike.bind(this,item.id)}
             >
               <AnimatedIcon
                 ref={this.handleSmallAnimatedIconRef}
                 name={liked ? 'heart' : 'hearto'}
                 color={liked ? colors.heartColor : colors.textPrimary}
                 size={28}
                 style={styles.icon}
               />
             </TouchableOpacity>
            
           </View>
          
              </View>
              <View style={{alignItems:"center", flexDirection: 'row',padding:3}}>
                 
                 <Avatar.Image style = {styles.logo} size={80} 
             source ={{ uri: item.image}} />
                      
               <View style={{flexDirection:"column",marginLeft:25}}>
                    <Text>Name : <Text>{item.tutorName}</Text></Text>
                    <Text>Experience : <Text> </Text>{item.experience} years</Text>
                    <StarRating
                    disabled={true}
                    starSize={25}
                    maxStars={5}
                    rating={item.ratings}
                    fullStarColor={'#FFA500'}/>
                 
               </View> 
              </View>
             </Card>
           
             }/>  
              </SafeAreaView>
     
           );
    }
  }
  
const styles = StyleSheet.create({  
 logo: {
    margin:5,
    borderWidth: 0
 },
 icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
 },
 cardstyle:{
    marginTop:10,
    borderRadius:5,
    backgroundColor: "white",
    marginLeft:10,
    marginRight:10
 },
 FlatListStyle: {
    backgroundColor:'black',
    borderColor: "#000",
    fontSize: 20,
    marginRight:5,
    alignContent:"center",
    marginLeft:5,
    marginBottom:10
 },
 
});  

export default ListSearch; 