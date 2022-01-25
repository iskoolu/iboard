import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList, BackHandler } from 'react-native';
import { Appbar, Avatar, Chip, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import constantvalue from "../shared/label.constants";
import { POST_TOP_INSTI, BASE_URL_LOGIN, } from '../services/api.constans';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-anchor-carousel';

class Topinstitute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      //  instituteTop:[],
      instituteTop_ind: [

        { id: '1', reqName: 'dev', followers: '100' },
        { id: '2', reqName: 'dev rd ', followers: '50' },
      ],
      isLoading: false,
      authorization: '', userType: '',

    };
    this.authtoken_fun();
  }

  // { id: '1', reqName: 'dev', followers: '100' },
  // { id: '2', reqName: 'dev rd ', followers: '50' },

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');
      const type = await AsyncStorage.getItem('userType');

      //INDIVIDUAL
      this.setState({ authorization: value });
      this.setState({ userType: type });

      this.getcoursedata();

    } catch (e) {
      // error reading value
    }
  }

  getcoursedata = () => {

    let self = this;

    if (this.state.userType == "INDIVIDUAL") {

      const params = {
        "ratings": 5,
        "reputedStatus": "Y",
        "topRatings": 10,
        "userType": "INDIVIDUAL"
      };
      axios.post(BASE_URL_LOGIN + POST_TOP_INSTI, params,
        {
          headers: {
            'Authorization': self.state.authorization,
          }
        })
        .then(function (response) {
          // handle success

          console.log("INDIVIDUAL", response.data);
          if (response.data.status == "success") {

            const enroll_course = response.data.data;
            self.setState({ instituteTop: enroll_course });

          }
          else {

          }

        })
        .catch(function (error) {
          console.log("error", error);
        });

    } else {

      const params = {
        "ratings": 5,
        "reputedStatus": "Y",
        "topRatings": 10,
        "userType": "INSTITUTION"
      };
      axios.post(BASE_URL_LOGIN + POST_TOP_INSTI, params,
        {
          headers: {
            'Authorization': self.state.authorization,
          }
        })
        .then(function (response) {
          // handle success
          console.log(response.data);

          if (response.data.status == "success") {

            const enroll_course = response.data.data;
            self.setState({ instituteTop: enroll_course });

          }
          else {

          }

        })
        .catch(function (error) {
          console.log("error", error);
        });


    }



  }

  handleBackPress = () => {
    // this.props.navigation.navigate('myClass');
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  };

  selectedvalue = (item) => {


    const passdata = item;
    this.props.navigation.navigate('classDetails', { passdata });
    console.log('selectvalue', passdata);
  };

  selecteddetailsvalue = (item) => {

    const payload = item;
    console.log('selectvalue', payload);
    this.props.navigation.navigate('detail', { payload, key: false })

  };



  render() {

    const checkconditon = this.props.valueFromParent;
    return (

      <View style={styles.Container}>

        {checkconditon == true ? (<Appbar.Header style={styles.toolbarminstyle}>

        </Appbar.Header>)
          : (<Appbar.Header style={styles.toolbarstyle}>
            <Appbar.BackAction color='#696969' onPress={() => this.handleBackPress()} />
            <Appbar.Content color='#696969' title="Top Institutions" />
          </Appbar.Header>)}

        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>

          <View style={styles.textviewstyle}>

            {checkconditon == true ? (<Text style={styles.bigtextstyle}>
              {constantvalue.homepage.topinstitute}
            </Text>) : null}

            {/* <Carousel  style={styles.carousel}
                data={data}
                renderItem={this.renderItem}
                itemWidth={200}
                containerWidth={width - 20} 
                separatorWidth={0}
                ref={carouselRef}
                //pagingEnable={false}
                //minScrollDistance={20}
            /> */}

            <FlatList
              // horizontal
              style={styles.FlatListStyle}
              numColumns={2}
              windowSize
              data={this.state.instituteTop_ind}
              // renderItem={this.renderItem}   
              renderItem={({ item, index }) =>

                <Card style={styles.cardstyle}
                  onPress={() => this.selectedvalue(item)}>
                  <Card.Cover source={{ uri: this.state.imageurl }} />
                  <Card.Content>
                    <Title style={styles.textcolor}>{item.reqName}</Title>
                    <Paragraph style={styles.textsmallcolor}>Followers: {item.followers}</Paragraph>


                  </Card.Content>
                 
                </Card>
              }
              keyExtractor={(item, index) => index}>
            </FlatList>


          </View>

        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",

  },
  carousel: {
    flex:1
  } ,
  textviewstyle: {
    flex: 1,
    padding: 5,
    marginTop: 5,
  },
  logo: {
    backgroundColor: "#fff",
    borderWidth: 0
  },
  textstyle: {
    fontSize: 18,
    color: "#696969",
    fontWeight: "bold"
  },
  bigtextstyle: {
    fontSize: 23,
    color: "#696969",
    fontWeight: "bold"
  },
  FlatListStyle: {
    backgroundColor: '#fff',
    borderColor: "#000",
    fontSize: 20,
    alignContent: "center",
  },
  learningFlatListStyle: {
    backgroundColor: '#fff',
    borderColor: "#000",
    fontSize: 20,
    alignContent: "center",
  },
  textcolor: {
    color: "#fff",
    marginBottom: 5,
  },
  textsmallcolor: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,

  },
  texttimecolor: {
    color: "#ffd700",
    justifyContent: 'flex-end',
  },
  cardstyle: {
    margin: 5,
    padding:5,
    width: "45%",
    backgroundColor: "#696969"
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },
  toolbarminstyle: {
    backgroundColor: "#fff",
    height: 50,
  },




});

export default Topinstitute;
