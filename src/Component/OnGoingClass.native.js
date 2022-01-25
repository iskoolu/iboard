import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, FlatList, BackHandler } from 'react-native';
import { Appbar, Button, Card, Paragraph,IconButton, Title, Colors } from 'react-native-paper';
import axios from 'axios';
import constantvalue from "../shared/label.constants";
import { GET_ENROLL_COURSE, BASE_URL_LOGIN, GET_TEACHING_COURSE, } from '../services/api.constans';
import AsyncStorage from '@react-native-community/async-storage';

class OnGoingClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
      enrolledcourse: [],
      teachingcourse: [],

      isLoading: false,
      authorization: '',
    };
  }


  // {
  //   "courseId": "212", "courseName": "NeetMaths",
  //   "content": { "title": null, "subTitle": null, "tableOfContents": "React, JS, Angular", "description": "Mastering in APP" },
  //   "fromDate": "2021-01-04", "toDate": "2021-02-01",
  //   "slots": [{
  //     "fromTime": "10", "toTime": "12", "frequency": "[0,2,4,6]", "medium": "Tamil", "enrolled": true, "scheduleId": "142",
  //     "scheduleName": null, "participantCount": 1
  //   }, {
  //     "fromTime": "15", "toTime": "17", "frequency": "[2, 4, 6]",
  //     "medium": "English", "enrolled": false, "scheduleId": "143", "scheduleName": null, "participantCount": 1
  //   }],
  //   "seatCount": 5, "ratings": "0", "testAvailable": "Y", "ratePerSession": 500.0, "ratePerCourse": 10000.0,
  //   "noOfParticipant": "20", "courseDuration": "2", "noOfClass": "10", "courseCreatedDate": "2021-01-04",
  //   "courseUpdatedDate": "2021-01-04", "courseCreatedBy": "276", "courseUpdatedBy": "276"
  // }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.authtoken_fun();


  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: value });
      this.getcoursedata();

    } catch (e) {
      // error reading value
    }
  }

  getcoursedata = () => {

    let self = this;

    let payload = {
      'user-token': '499',
    };

    axios.get(BASE_URL_LOGIN + GET_ENROLL_COURSE,
      {
        headers: {
          'Authorization': self.state.authorization,
        }
      })
      .then(function (response) {
        // handle success


        if (response.data.status == "success") {

          const enroll_course = response.data.data;
          self.setState({ enrolledcourse: enroll_course });


        }
        else {


        }


      })
      .catch(function (error) {
        console.log("error", error);
      });


    axios.get(BASE_URL_LOGIN + GET_TEACHING_COURSE, {

      headers: {
        'Authorization': self.state.authorization,
      }
    })
      .then(function (response) {
        // handle success

        if (response.data.status == "Success") {

          console.log("TEACHING", response.data);
          const teaching_course = response.data.data
          self.setState({ teachingcourse: teaching_course });

        }
        else {


        }


      })
      .catch(function (error) {
        console.log("error", error);
      });

  }
  handleBackPress = () => {
    //this.props.navigation.navigate('myClass');

    const { goBack } = this.props.navigation;
    goBack();
    return true;
  };

  selectedvalue = (item) => {

    const passdata = item;
    this.props.navigation.navigate('classDetails', { passdata, key: false });

  };

  selecteddetailsvalue = (item) => {

    const payload = item;

    this.props.navigation.navigate('detail', { payload, key: false })

  };



  render() {

    const checkconditon = this.props.valueFromParent;
    const checkmycourse = this.props.valuemycourse;

    return (

      <View style={styles.Container}>


        {checkconditon == true ? null
          : (
            checkmycourse == true ? null :
              <Appbar.Header style={styles.toolbarstyle}>
                <Appbar.BackAction color='#696969' onPress={() => this.handleBackPress()} />
                <Appbar.Content color='#696969' title="OnGoingClass" />
              </Appbar.Header>

          )}

  
    {this.state.enrolledcourse && this.state.teachingcourse == '' ? (

         checkconditon == false ?  <View style={styles.noDatastyle}>

         <IconButton
           icon="database-search"
           color="#ffd700"
           size={90}/>


         <Text style={styles.nodatatextstyle}>
          No Data Available
         </Text>

         <Text style={styles.smalltextstyle}>
          There is no data to show you right now
         </Text>

         

       </View> :null
          
    ):
      (
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>

          <View style={styles.textviewstyle}>

            {/* {checkconditon == true ? ( <Text style = {styles.bigtextstyle}>
                    {constantvalue.homepage.ongoingclass}
                    </Text>) : null} */}

            {this.state.enrolledcourse == '' ? null : (
            <Text style={styles.textstyle}>
              {constantvalue.homepage.learningcourse}
            </Text>

            )}

            {checkconditon == true ? (<FlatList
              //horizontal
              style={styles.FlatListStyle}
              windowSize
              data={this.state.enrolledcourse.slice(0, 3)}

              renderItem={({ item }) =>

                <Card style={styles.cardstyle}
                  onPress={() => this.selecteddetailsvalue(item)}>
                  <Card.Cover source={{ uri: this.state.imageurl }} />
                  {item.subject.map((itemsubject) => (

                    itemsubject.enroll == true ? (
                      <Card.Content>
                        <Title style={styles.textcolor}>{itemsubject.courseName}</Title>

                        {itemsubject.slots.map((itemslot) => (

                          itemslot.enroll == true ? (

                            <Text style={styles.texttimecolor}>{itemslot.fromTime}</Text>) : null

                        ))}

                      </Card.Content>
                    ) : null

                  ))}

                  <Card.Actions>
                    <Button color="#ffd700" >Join Meet</Button>
                  </Card.Actions>
                </Card>

              }
              keyExtractor={(item => item.id)}>
            </FlatList>

            )

              : (<FlatList
                // horizontal
                style={styles.learningFlatListStyle}
                windowSize
                data={this.state.enrolledcourse}
                renderItem={({ item }) =>

                  <Card style={styles.cardstyle}
                    onPress={() => this.selecteddetailsvalue(item)}>

                       <View style={{ alignItems: "center", flexDirection: 'row', padding: 3 }}>


                    <Image
                     source={{ uri: this.state.imageurl }}o
                      style={styles.buttonImageIconStyle} />

                    <View style={{ flexDirection: "column",flex:1 }}>
                      <Card.Content>

                        <Title style={styles.textcolor}>{item.courseName}</Title>
                        
                        <Paragraph style={styles.textsmallcolor}>{item.content.description}</Paragraph>
                       

                      </Card.Content>

                     

                    </View>
                  </View>
                
                    <Card.Actions>
                      <Button color="#ffd700" >Join Meet</Button>
                    </Card.Actions>
                  </Card>
                }
                keyExtractor={(item => item.tutorId)}>
              </FlatList>
              )}

               {this.state.teachingcourse == '' ? null : (
            <Text style={styles.textstyle}>
              {constantvalue.homepage.Teachingcourse}
            </Text>
               )}

            {checkconditon == true ? (<FlatList
              //horizontal
              style={styles.FlatListStyle}
              windowSize
              data={this.state.teachingcourse.slice(0, 3)}

              renderItem={({ item }) =>

                <Card style={styles.cardstyle}
                  onPress={() => this.selectedvalue(item)}>

                  <View style={{ alignItems: "center", flexDirection: 'row', padding: 3 }}>


                    <Image
                     source={{ uri: this.state.imageurl }}o
                      style={styles.buttonImageIconStyle} />

                    <View style={{ flexDirection: "column",flex:1 }}>
                      <Card.Content>

                        <Title style={styles.textcolor}>{item.courseName}</Title>
                        
                        <Paragraph style={styles.textsmallcolor}>{item.content.description}</Paragraph>
                       

                      </Card.Content>

                     

                    </View>
                  
                  </View>
                 
                </Card>
              }
              keyExtractor={(item => item.courseId)}>
            </FlatList>)

              : (<FlatList
                // horizontal
                style={styles.FlatListStyle}
                windowSize
                data={this.state.teachingcourse}
                renderItem={({ item, index }) =>

                  <Card style={styles.cardstyle}
                    onPress={() => this.selectedvalue(item)}>
                    <View style={{ alignItems: "center", flexDirection: 'row', padding: 3 }}>


                    <Image
                     source={{ uri: this.state.imageurl }}
                      style={styles.buttonImageIconStyle} />

                    <View style={{ flexDirection: "column",flex:1 }}>
                      <Card.Content>

                        <Title style={styles.textcolor}>{item.courseName}</Title>
                        
                        <Paragraph style={styles.textsmallcolor}>{item.content.description}</Paragraph>
                       

                      </Card.Content>

                     

                    </View>
                  </View>
                  </Card>
                }
                keyExtractor={(item, index) => index}>
              </FlatList>
              )}

          </View>

        </ScrollView>

)}
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
  textviewstyle: {
    flex: 1,
    padding: 5,
    marginTop: 5,
  },
  noDatastyle: {
    flex: 1,
    padding: 5,
    marginTop: 5,
    alignSelf:'center',
    alignItems:'center',
  },
  textsmallcolor: {
    color: "#fff",
    fontSize: 13,
    alignSelf:'center',
    alignContent:'center',
    marginBottom: 5,
  },
  nodatatextstyle: {
    fontSize: 18,
    color: "#696969",
    alignSelf:'center',
    fontWeight: "bold"
  },
  smalltextstyle: {
    fontSize: 15,
    margin:5,
    color: "#D3D3D3",
    alignSelf:'center',
    alignItems:'center',
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
  buttonImageIconStyle: {
    height: 70,
    width: 70,
    margin:10,
    alignSelf: 'center',

  },
  learningFlatListStyle: {
    backgroundColor: '#fff',
    borderColor: "#000",
    fontSize: 20,
    alignContent: "center",
  },
  textcolor: {
    color: "#fff",
  },
  texttimecolor: {
    color: "#ffd700",
    justifyContent: 'flex-end',
  },
  cardstyle: {
    margin: 5,
   
    borderRadius: 5,
    backgroundColor: "#696969"
  },
  toolbarstyle: {
    backgroundColor: "#fff",
  },




});

export default OnGoingClass;
