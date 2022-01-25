import React, { Component } from 'react'
import { View, Switch, Text, StyleSheet, Image, ScrollView, FlatList, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { Button, Avatar, Card, List, Chip, Title, IconButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import StarRating from 'react-native-star-rating';
import Ionicons from 'react-native-vector-icons/AntDesign';
import LABELCONSTANT from '../shared/label.constants';
import Modal from 'react-native-modal';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { SwipeablePanel } from 'rn-swipeable-panel';
import {BASE_URL_LOGIN,POST_ENROLL_COURSE,POST_CHECKOUT_ENROLL} from '../services/api.constans';

export default class detail extends Component {

  state = {
    backgroundColor: 'black',
    backgroundColor2: 'black',
    pressed: false,
    selectedItem: null,
  };
  constructor(props) {

    super(props);

    const courseID = this.props.route.params.courseID;
    this.state = {
      isLoading: false,
      currentTime: 0,
      duration: 0,
      authorization:'',
      Status: false,
      StatusCheck: false,
      isFullScreen: false,
      isLoading: false,
      paused: false,
      item: null,
      screenType: 'content',
      color: "red",
      isHidden: true,
      showpicker: false,
      course_ID: "0",
      itemcontent: "data.detaildata.courses[0].subcontent",
      itemmediumofteach: "data.detaildata.courses[0].mediumofteach",
      itemduration: "data.detaildata.courses[0].courseDuration",
      numberofclass: "data.detaildata.courses[0].noOfClass",
      timeslotarray: "data.detaildata.courses[0].timeSlot",
      showComponmentCategory: false,
      showexit: false,
      itemId: '',
      ICONNAME: LABELCONSTANT.LBL_SEARCH.ICONDOWN,
      tableHead: ['Time', 'Available', 'Medium', 'Enroll'],
      showHeading_modal: false,
      exapandable: false,
    };


  }

  componentDidMount() {
    this.authtoken_fun();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    //  this.props.navigation.navigate('profile');
    //BackHandler.exitApp();
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  };

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: value });


    } catch (e) {
      // error reading value
    }
  }
  showPickerModel = () => {

    this.setState({ showpicker: this.showpicker = true })

  }


  hidePickerModel = () => {

    this.setState({ showpicker: this.showpicker = false })

  }

  _CategoryShow = () => {
    if (this.state.ICONNAME == LABELCONSTANT.LBL_SEARCH.ICONDOWN) {
      this.setState({
        showComponmentCategory: !this.state.showComponmentCategory,
        ICONNAME: LABELCONSTANT.LBL_SEARCH.ICONUP,
      })
    } else {
      this.setState({
        showComponmentCategory: !this.state.showComponmentCategory,
        ICONNAME: LABELCONSTANT.LBL_SEARCH.ICONDOWN,
      })
    }
  }

  getListViewItem = (item) => {
    Alert.alert(item.sub);
  }

  PressedItem = (itemId) => {

    this.setState({ itemId: itemId });

  }

  SampleFunction = (item) => {

    Alert.alert(item);

  }

  NextcheckoutPayment = () => {

    //this.setState({ showexit: this.showexit = true })
    this.props.navigation.navigate('CheckoutPayment')
  }

  enrollFunction = (itemslot,data) => {

    let self = this;

    const scheduleID = itemslot.scheduleId;
    const count_participant= itemslot.participantCount;
    const ratePercourse = data.ratePerCourse;
    const CourseID = data.courseId;

    if(ratePercourse ===0){

      var payload={
        "courseId":CourseID,
        "scheduleId":scheduleID
      }
     
      axios.post(BASE_URL_LOGIN + POST_ENROLL_COURSE, payload,
        {
          headers: {
            'Authorization': this.state.authorization,
            'Content-Type': 'application/json'
          }
        }
      )
        .then(function (response) {
          // handle success
  
          console.log(response.data);
          // if (response.data.status == "Success") {
  
          //   console.log(response.data.data);
          //   const datastore = response.data.data;
          //   self.setState({ ontakesubject: datastore});
  
          // }
          // else {
  
          //   Toast.show(response.data, Toast.SHORT);
          // }
  
        })
        .catch(function (error) {
          // handle error
         
          console.log("error", error);
        });
      

    }else{

      if(count_participant===20){
        //document.getElementById("enroll_button").innerHTML="Slot Full"
        // swal({
        //   title: "Slot Full",
        //   text: "Are you interested with this tutor?",
        //   dangerMode: true,
        //   button: {
        //     text: "Show Interest",
        //     closeModal: true,
        //   },
        // });
      }else{
      
        var payload={
          amount:ratePercourse,
          currency:"INR",
          courseId:CourseID,
          paymentOptions:"online",
          slot:scheduleID
        }
        axios.post(BASE_URL_LOGIN + POST_CHECKOUT_ENROLL, payload,
          {
            headers: {
              'Authorization': this.state.authorization,
              'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
            // handle success
    
            console.log(response.data);
            if(response.data.status==="Success"){
    
              
            let checkoutID = response.data.data.iskooluCheckoutId
              self.props.navigation.navigate('CheckoutPayment',{itemslot,data,checkout_id:checkoutID});
            //   console.log(response.data.data);
            //   const datastore = response.data.data;
            //   self.setState({ ontakesubject: datastore});
    
             }
              else {
    
            //   Toast.show(response.data, Toast.SHORT);
             }
    
          })
          .catch(function (error) {
            // handle error
           
            console.log("error", error);
          });
        
      
      }
  }

   
  }

  razorpayrefundExit = () => {
    let self = this;
    var amount_var = 100;
    var receipt_var = "check test";
    var login = 'rzp_test_3pkPRZzYcYAIoW';
    var password = 'jZ78XB6zgwuysuifvKlQVKur';

    axios
      .post('https://api.razorpay.com/v1/payments/' + { pay_id } + '/refund', {

        "amount": amount_var,
        "speed": "optimum",
        "receipt": receipt_var,

      },
        {
          headers: {
            'Authorization': 'Basic ' + encode(login + ":" + password),
            'Content-Type': 'application/json'
          }
        })
      .then(function (response) {
        // handle success

        console.log(response);



      })
      .catch(function (error) {
        // handle error
        alert("error" + error);
      });

  };

  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Text style={styles.subtextouthead}> Time</Text>
        <Text style={styles.subtextouthead}>Available</Text>
      </RectButton>
    );
  };

  show_headingModal = () => {

    this.setState({ showHeading_modal: this.showHeading_modal = true })

  }

  hide_headingModal = () => {

    this.setState({ showHeading_modal: this.showHeading_modal = false })

  }
  exapandable_model = () => {

    this.setState({ exapandable: this.exapandable = true })

  }


  render() {


    const data = this.props.route.params.datasend;

    const dataprofile = this.props.route.params.item;
    console.log("details",JSON.stringify(data));
    
    const createpreview = this.props.route.params.key;

    return (
     // source={{ uri: data.image }}

      <View style={styles.container}>

        <ScrollView style={{ marginHorizontal: 0 }} >


          {createpreview == false ? (<View style={{ flexDirection: 'row', margin: 5 }}>

            <Avatar.Image style={styles.logo} size={45}
              color="#fff" />

            <View style={{ flexDirection: 'column', marginLeft: 5 }}>
              <Text style={styles.Textwhiteprofile}>{dataprofile.tutorName} </Text>

              <Text style={styles.Textwhiteprofilesmall}>Experience : {dataprofile.experience} years </Text>
              <Text style={styles.Textwhiteprofilesmall}>Followers :  </Text>
              <View style={{ width: 50 }}>
                <StarRating style={{  margin: 5 }}
                  disabled={true}
                  starSize={15}
                  maxStars={5}
                  starSize={15}
                  rating={dataprofile.ratings}
                  fullStarColor={'#FFA500'}
                />
              </View>

            </View>

          </View>) : null}

          <ScrollView
            horizontal={true}>
          <View style={{ flexDirection: "row", margin: 5 }}>
            {data.map((item,index) => (

              <TouchableOpacity
                onPress={() => { this.PressedItem(item), this.setState({ course_ID: index }) }} >

                <View style={this.state.course_ID == index ? styles.SelectedlistItem : styles.listItem} >
                  <View>
                    <Text style={{
                      padding: 15, alignSelf: 'center',
                      fontSize: 15, color: "white", borderColor: 'white',
                      borderRadius: 6, padding: 5, marginRight: 10
                    }}>

                      {item.courseName}

                    </Text>

                    <Text style={{
                      padding: 15,
                      fontSize: 11, color: "white", borderColor: 'white',
                      borderRadius: 6, marginLeft: 10, marginRight: 20, padding: 5,
                    }} >

                       {item.fromDate} -  {item.toDate} 

                      {/* {Moment(item.courseEndDate).format('D/MM/YYYY')} */}
                    </Text>

                  </View>
                </View>

              </TouchableOpacity>

            ))}

          </View>

          </ScrollView>

          <FlatList

            style={styles.FlatListStyle}
            numColumns={1}
            maxToRenderPerBatch={2}
            windowSize
            data={data}
            renderItem={({ item, index }) => {

              return (

                index == this.state.course_ID ? (

                <View>
                  <Swipeable style={{ flexDirection: 'column', margin: 15 }}
                  >

                    <Card style={{ marginTop: 10, padding: 10, marginLeft: 10, marginRight: 10 }}
                      cardElevation={2}
                      cardMaxElevation={2}
                      cornerRadius={5}
                    >
                      <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                        <Text style={styles.subtext}>{item.content.description}</Text>

                      </View>


                      <View style={{ borderLeftWidth: 1, borderLeftColor: 'red', }} />

                      <View style={{
                        flexDirection: 'row', alignItems: "center",
                        marginTop: 5, justifyContent: 'space-between'
                      }}>

                        <View style={{ flex: 1, alignItems: "center", }}>

                          <Text style={styles.subtextouthead}>Time</Text>

                        </View>

                        <View style={{ flex: 1, alignItems: "center", }}>

                          <Text style={styles.subtextouthead}>Language</Text>

                        </View>

                        <View style={{ flex: 1, alignItems: "center", }}>

                          <Text style={styles.subtextouthead}>Days</Text>

                        </View>
                        {createpreview == false ? (
                          <View style={{ flex: 1, alignItems: "center", }}>


                            <Text style={styles.subtextouthead}>Enroll</Text>

                          </View>
                        ) : null}

                      </View>

                      {item.slots.map((itemslot) => (

                        <View style={{
                          flexDirection: 'row', alignItems: "center",
                          justifyContent: 'space-between'
                        }}>


                          <View style={{ flex: 1, alignItems: "center", }}>

                            <Text style={styles.subtextbody}>

                              {itemslot.fromTime} - {itemslot.toTime}
                            </Text>

                          </View>

                          <View style={{ flex: 1, alignItems: "center", }}>

                            <Text style={styles.subtextbody}>{itemslot.frequency}</Text>

                          </View>

                          <View style={{ flex: 1, alignItems: "center", }}>

                            <Text style={styles.subtextbody}>

                              {itemslot.medium}
                            </Text>

                          </View>
                          {createpreview == false ? (
                            <View style={{ flex: 1, alignItems: "center", }}>

                             {itemslot.enrolled ? (

                               <Text style={{
                                   padding: 10, fontSize: 11, color: "black", borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 18, marginLeft: 10, marginRight: 10, padding: 3, textAlign: 'center', alignItems: 'center'
                                  }}>Enrolled</Text>
                                )
                                : (
                                  itemslot.participantCount === 20 ? (
                                    <Text style={{
                                      padding: 10, fontSize: 10, color: "black", borderColor: 'gray', borderWidth: 1,
                                      borderRadius: 5, marginLeft: 2, marginRight: 12, padding: 3,
                                    }}
                                      onPress={() => this.NextcheckoutPayment()}>Show Interest</Text>
                                  ):(    
                                  
                                    <Text style={{
                                      padding: 10, fontSize: 11, color: "black", borderColor: 'gray', borderWidth: 1,
                                       borderRadius: 5, marginLeft: 10, marginRight: 10, padding: 3, textAlign: 'center', alignItems: 'center'
                                     }}
                                       onPress={() => this.enrollFunction(itemslot,item)}>
                                         Enroll</Text>
                                    
                                   )
                                
                                
                                )}

                            </View>
                          ) : null}

                          {/* {item.available == false ? (
                                <Text style={{
                                  padding: 10, fontSize: 10, color: "black", borderColor: 'gray', borderWidth: 1,
                                  borderRadius: 5, marginLeft: 2, marginRight: 12, padding: 3,
                                }}
                                  onPress={() => this.NextcheckoutPayment()}>Show Interest</Text>)

                                : (
                                
                                  item.available == false ? (
                                <Text style={{
                                  backgroundColor: '', padding: 10, fontSize: 11, color: "black", borderColor: 'gray', borderWidth: 1,
                                  borderRadius: 5, marginLeft: 10, marginRight: 10, padding: 3, textAlign: 'center', alignItems: 'center'
                                }}
                                  onPress={() => this.NextcheckoutPayment()} >Enroll</Text>
                                  ):( <Text style={{
                                    backgroundColor: '', padding: 10, fontSize: 11, color: "black", borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 18, marginLeft: 10, marginRight: 10, padding: 3, textAlign: 'center', alignItems: 'center'
                                  }}
                                    onPress={() => this.NextcheckoutPayment()} >Enrolled</Text>)
                                
                                
                                )} */}
                        </View>

                        // ) : null

                      ))}

                      <View style={{
                        flexDirection: 'row', flex: 1, bottom: 5, justifyContent: 'space-between',
                        alignItems: "center",
                      }}>

                        <Text style={styles.subtext}>Number of classes: {item.noOfClass}</Text>
                        <Text style={styles.subtext1}>Duration: {item.classDuration} </Text>
                        <Text style={styles.subtext1}>No Of Days: {item.courseDuration}days </Text>
                      </View>


                      <View style={{
                        flexDirection: 'row', flex: 1, margin: 5,
                        alignSelf: 'flex-end',
                      }}>

                        <Chip icon="chevron-triple-right"
                          onPress={() => this.show_headingModal()} >
                          More info for Titles and subtitles
                         </Chip>
                      </View>

                      {/* <Text style={styles.subtext}>Test:
                             {item.testAvailable == true ? (<Text style={styles.subtext}> Yes </Text>) :
                            (<Text style={styles.subtext}> No </Text>)}
                        </Text>
                        <Text style={styles.subtext}>Class Recording:
                       {item.recordingAvailable == true ? (<Text style={styles.subtext}> Yes </Text>) :
                            (<Text style={styles.subtext}> No </Text>)}
                        </Text> */}

                    </Card>
                  </Swipeable>
                </View>

                 ) : null

              )

            }
            }

            keyExtractor={(item => item.id)}>
          </FlatList>

          <View style={{ marginTop: 15, margin: 10 }}>
            <Button style={styles.linkstyle}
              mode="contained"
              onPress={() => this.showPickerModel()}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Demo Video(2 mins max)</Text></Button>

            {this.state.showpicker == true ? (
              <Modal isVisible={this.state.showpicker}>
                <View style={{ flex: 0.5, backgroundColor: "#fff" }}>

                  {createpreview ? (<WebView
                    onPress={() => this.razorpayrefundExit()}
                    style={{ width: 340, height: 230 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: data[0].demoUrl }}
                  />) : (<WebView
                    onPress={() => this.razorpayrefundExit()}
                    style={{ width: 340, height: 230 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: data.demoUrl }}
                  />)}
                  <Button style={styles.buttonstyle}
                    onPress={() => this.hidePickerModel()}
                    mode="contained">

                    <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>

                  </Button>

                </View>
              </Modal>
            ) : null}

            {createpreview ? (
              <View>

                <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                  <Text style={styles.radiotextstyle}>Rate per Course - </Text>
                  <Text style={styles.radiotextstyle}>{data[0].ratePerCourse}</Text>

                </View>

                <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                  <Text style={styles.radiotextstyle}>Rate per Session - </Text>

                  <Text style={styles.radiotextstyle}>{data[0].ratePerSession}</Text>

                </View>

              </View>
            ) : null}

            {data.map((item,index) => (

              index == this.state.course_ID ? (
              <View>
                <View style={{
                  flexDirection: 'row', alignItems: "center",
                  marginTop: 5, justifyContent: 'space-between'
                }}>


                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Assignment</Text>

                    {item.assignAvailable == "Y" ? (
                      <Switch
                        trackColor={{ false: 'gray', true: "#ffd700" }}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        value={true} />
                    ) : (

                        <Switch
                          trackColor={{ false: 'gray', true: "#ffd700" }}
                          thumbColor="white"
                          ios_backgroundColor="gray"
                          value={false}
                        />
                      )}


                  </View>

                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Download</Text>

                    {item.downloadAllow == "Y" ? (
                      <Switch
                        trackColor={{ false: 'gray', true: "#ffd700" }}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        value={true} />
                    ) : (

                        <Switch
                          trackColor={{ false: 'gray', true: "#ffd700" }}
                          thumbColor="white"
                          ios_backgroundColor="gray"
                          value={false}
                        />
                      )}

                  </View>

                </View>

                <View style={{
                  flexDirection: 'row', alignItems: "center",
                  marginTop: 5, justifyContent: 'space-between'
                }}>


                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Assesment</Text>


                    {item.testAvailable == "Y" ? (
                      <Switch
                        trackColor={{ false: 'gray', true: "#ffd700" }}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        value={true} />
                    ) : (

                        <Switch
                          trackColor={{ false: 'gray', true: "#ffd700" }}
                          thumbColor="white"
                          ios_backgroundColor="gray"
                          value={false}
                        />
                      )}


                  </View>

                  <View style={{ flexDirection: 'row', flex: 1, margin: 5, bottom: 5, alignItems: "center", }}>

                    <Text style={styles.radiotextstyle}>Recording</Text>

                    <Switch
                      trackColor={{ false: 'gray', true: "#ffd700" }}
                      thumbColor="white"
                      ios_backgroundColor="gray"
                      value={item.recording}
                    />

                  </View>

                </View>

                <View style={{ flexDirection: 'row',marginBottom:10,marginRight:10
                    ,backgroundColor:'gray',borderRadius:10,alignItems: 'center' }}>
                  <Text style={styles.boldtextstyle}>OTHER DETAILS</Text>
                  <View style={{ position: 'absolute', right: 0, marginRight: 10, margin: 10, }}>
                    <Ionicons
                      name={this.state.ICONNAME}
                      color="white" size={20}
                      onPress={this._CategoryShow}
                    />

                  </View>
                </View>

               

                {this.state.showComponmentCategory ?(
                  item.certificateimage || item.certificateimage ?(
                    <View>
                    <Text style={styles.radiotextstyle}>Certficate image</Text>
                    <Image style={styles.logo1} source={{ uri: item.certificationUrl }} />
                    <Text style={styles.radiotextstyle}>Course image</Text>
                    <Image style={styles.logo1} source={{ uri: item.courseUrl }} />
                    </View>
                   ):(<Text style={styles.radiotextstyle}>Course image</Text>)
                  
                 ):null }

              </View>
              
              ):null

              ))} 

               


            {this.state.showexit == true ? (

              <View style={{ flexDirection: "row", margin: 5, justifyContent: 'space-between', }}>

                <Button style={styles.buttonstyle}
                  mode="contained"
                  onPress={() => this.razorpayrefundExit()} >

                  <Text style={{ color: "#fff", fontSize: 16 }}>EXIT</Text>

                </Button>

                <Button style={styles.buttonstyle}
                  mode="contained">

                  <Text style={{ color: "#fff", fontSize: 16 }}>FEEDBACK</Text>

                </Button>

              </View>) : null}

            {this.state.showexit == true ? (

              <View style={{ flexDirection: "row", margin: 5, justifyContent: 'space-between', }}>

                <Button style={styles.buttonstyle}
                  mode="contained"
                  onPress={() => this.creationclasspreview()} >

                  <Text style={{ color: "#fff", fontSize: 16 }}>JOIN NOW</Text>

                </Button>

                <Button style={styles.buttonstyle}
                  mode="contained">

                  <Text style={{ color: "#fff", fontSize: 16 }}>CANCEL</Text>

                </Button>

              </View>) : null}

          </View>

        </ScrollView>

        {this.state.showHeading_modal == true ? (


          <SwipeablePanel isActive={this.state.showHeading_modal}

            fullWidth={true} onClose={() => this.hide_headingModal()} >

            {createpreview ? (

              data[0].heading.map((itemhead) => (
                <View>


                  <List.Accordion
                    theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray' } }}
                    title={itemhead.heading}
                    left={props => <List.Icon {...props} icon="chevron-right-circle" />}>

                    {itemhead.subheading.map((itemsub) => (
                      <View>
                        <List.Item title={itemsub.text}
                          left={props => <List.Icon {...props} icon="menu-right" />}
                        />

                      </View>
                    ))}
                  </List.Accordion>

                </View>))

            ) : null}


          </SwipeablePanel>)
          : null}
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'black',
  },
  layoutstyle: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  radiotextstyle: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10

  },
  boldtextstyle: {
    color: "#fff",
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
  },
  iconviewstyle: {
    flexDirection: 'row',
    alignItems: "center",
  },
  buttonstyle: {
    backgroundColor: "#ffd700",
    borderRadius: 10,
    margin: 10,
  },
  linkstyle: {
    backgroundColor: 'gray',
    borderRadius: 10,
    margin: 10,
  },

  enrollstyle: {
    backgroundColor: 'gray',
    borderRadius: 10,
    margin: 10,
  },
  icon: {
    fontSize: 25,
    flex: 1
  },
  item: {
    fontSize: 15,
    color: "white",
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    marginTop: 10,
    backgroundColor: "#FFA500"
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  subtext: {
    color: 'black',
    fontSize: 13,
  },
  subtext1: {

    color: 'black',
    fontSize: 11,
  },
  subtextout: {

    color: 'black',
    fontSize: 10,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius:6,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
  subtextbody: {
    color: 'black',
    fontSize: 10,
    padding: 5,
    width: 75,
    textAlign: 'center',
    padding: 10,
    marginRight: 4,
  },
  subtextouthead: {

    color: 'white',
    fontSize: 10,
    borderColor: 'gray',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    width: 73,
    marginRight: 6,
    textAlign: 'center'
  },

  text: {
    color: '#FFA500',
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
  },
  logo: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#fff"

  },
  logo1: {
    width: 300,
    height: 260,
    marginBottom: 10,
    alignItems: "center",
    padding: 10,
    marginLeft: 20

  },
  Textwhite: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  Textwhiteprofile: {
    color: 'white',
    fontSize: 13,
    
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  Textwhiteprofilesmall: {
    color: 'white',
    fontSize: 11,
    
    fontWeight: 'bold',
    fontStyle: 'italic',

  },
  Textleft: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,


  },
  texttimecolor: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
  },

  SelectedlistItem: {
    flexDirection: 'row',
    backgroundColor: "grey",
    borderRadius: 186,
    alignItems: "center"
  },
  animatedIcon: {
    borderRadius: 16,

    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    // zIndex: 2,
    // borderRadius: 160,
    // opacity: 0
  },

});  