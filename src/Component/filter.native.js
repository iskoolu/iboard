import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Rating } from 'react-native-ratings';
import ListFind from './ListSearch.native'
import RadioGroup from 'react-native-radio-buttons-group';

export default class Example extends Component {
  state = {
    firstQuery: '',
    backgroundColor: 'white',
    backgroundColor1: 'white',
    backgroundColor2: 'white',
    backgroundColor3: 'white',
    backgroundColor4: 'white',
    backgroundColor5: 'white',
    backgroundColor6: 'white',
    pressed: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      showComponmentCategory: false,
      showComponmentPrice: false,
      showComponmentRating: false,
      showComponmentTimeSlot: false,
      showComponmentAssign: false,
      showComponmentTest: false,
      showComponmentList: false,
      starCount: 1,
      ratingvalue: "", assignvalue: "", testvalue: "", Pricevalue: "", TimeSlotValue: "", Categoryvalue: "", Languagevalue: "",
    }



    this.filterList = [];
    this.assigndata = [
      {
        label: 'Yes',
        value: 'yes',
        checked: true,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23,

      },

      {
        label: 'No',
        value: 'no',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      }
    ];
    this.testData = [
      {
        label: 'Yes',
        value: 'yes',
        checked: true,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23,

      },

      {
        label: 'No',
        value: 'no',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      }
    ];
    this.Pricedata = [{
      label: 'Low to High',
      value: 'low to high',
      checked: true,
      color: 'black',
      disabled: false,
      flexDirection: 'row',
      size: 23,

    },

    {
      label: 'High to Low',
      value: 'High to Low',
      checked: false,
      color: 'black',
      disabled: false,
      flexDirection: 'row',
      size: 23

    },


    ];
    this.TimeSlotdata = [
      {
        label: '6.00am-10.00am',
        value: '6.00 am',
        checked: true,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 20,

      },

      {
        label: '4.00pm-10.00pm',
        value: '4.00 pm',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 20

      },


    ];
    this.Categorydata = [
      {
        label: 'Teacher',
        value: 'teacher',
        checked: true,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },

      {
        label: 'Lecturer',
        value: 'lecturer',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },

      {
        label: 'Professor',
        value: 'professor',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'Professional',
        value: 'professional',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'Students',
        value: 'students',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'House maker',
        value: 'house maker',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      }
    ];
    this.LanguageData = [
      {
        label: 'Tamil',
        value: 'tamil',
        checked: true,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },

      {
        label: 'English',
        value: 'english',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },

      {
        label: 'Hindi',
        value: 'hindi',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'Telugu',
        value: 'telugu',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'Bengali',
        value: 'bengali',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      },
      {
        label: 'Gujarati',
        value: 'gujarati',
        checked: false,
        color: 'black',
        disabled: false,
        flexDirection: 'row',
        size: 23

      }


    ];

  }



  _CategoryShow = () => {
    this.state.showComponmentPrice = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentAssign = false,
      this.state.showComponmentTest = false,
      this.state.showComponmentLanguage = false;
    this.selectedButton = this.Categorydata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.Categorydata[0].value;
    this.setState({ showComponmentCategory: this.state.showComponmentCategory = true, Categoryvalue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor4: '#FFA500',
      backgroundColor1: 'white', backgroundColor: 'white',
      backgroundColor3: 'white', backgroundColor2: 'white',
      backgroundColor5: 'white', backgroundColor6: 'white'
    });
  }
  _PriceShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentAssign = false,
      this.state.showComponmentTest = false,
      this.state.showComponmentLanguage = false;
    this.setState({ starCount: this.state.ratingvalue });
    this.selectedButton = this.Pricedata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.Pricedata[0].value;
    this.setState({ showComponmentPrice: this.state.showComponmentPrice = true, Pricevalue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor1: '#FFA500',
      backgroundColor2: 'white', backgroundColor: 'white',
      backgroundColor3: 'white', backgroundColor4: 'white',
      backgroundColor5: 'white', backgroundColor6: 'white'
    });

  }
  _RatingeShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentPrice = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentAssign = false,
      this.state.showComponmentTest = false,
      this.state.showComponmentLanguage = false;
    this.setState({ showComponmentRating: this.state.showComponmentRating = true })
    this.setState({
      pressed: true, backgroundColor: '#FFA500',
      backgroundColor1: 'white', backgroundColor2: 'white',
      backgroundColor3: 'white', backgroundColor4: 'white',
      backgroundColor5: 'white', backgroundColor6: 'white'
    });


  }
  _TimeSlotShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentPrice = false;
    this.state.showComponmentAssign = false,
      this.state.showComponmentTest = false,
      this.state.showComponmentLanguage = false;
    this.selectedButton = this.TimeSlotdata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.TimeSlotdata[0].value;
    this.setState({ showComponmentTimeSlot: this.state.showComponmentTimeSlot = true, TimeSlotValue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor2: '#FFA500',
      backgroundColor1: 'white', backgroundColor: 'white',
      backgroundColor3: 'white', backgroundColor4: 'white',
      backgroundColor5: 'white', backgroundColor6: 'white'
    });

  }
  _AssignShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentPrice = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentLanguage = false;
    this.state.showComponmentTest = false,
      this.selectedButton = this.assigndata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.assigndata[0].value;
    this.setState({ showComponmentAssign: this.state.showComponmentAssign = true, assignvalue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor3: '#FFA500',
      backgroundColor1: 'white', backgroundColor: 'white',
      backgroundColor2: 'white', backgroundColor4: 'white',
      backgroundColor5: 'white', backgroundColor6: 'white'
    });
  }
  _TestShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentPrice = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentLanguage = false;
    this.state.showComponmentAssign = false,
      this.selectedButton = this.testData.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.testData[0].value;
    this.setState({ showComponmentTest: this.state.showComponmentTest = true, testvalue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor5: '#FFA500',
      backgroundColor1: 'white', backgroundColor: 'white',
      backgroundColor2: 'white', backgroundColor4: 'white',
      backgroundColor3: 'white', backgroundColor6: 'white'
    });
  }
  _LanguageShow = () => {
    this.state.showComponmentCategory = false;
    this.state.showComponmentRating = false;
    this.state.showComponmentPrice = false;
    this.state.showComponmentTimeSlot = false;
    this.state.showComponmentAssign = false,
      this.state.showComponmentTest = false,
      this.selectedButton = this.LanguageData.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.LanguageData[0].value;
    this.setState({ showComponmentLanguage: this.state.showComponmentLanguage = true, Languagevalue: this.selectedButton })
    this.setState({
      pressed: true, backgroundColor6: '#FFA500',
      backgroundColor1: 'white', backgroundColor: 'white',
      backgroundColor3: 'white', backgroundColor4: 'white',
      backgroundColor5: 'white', backgroundColor2: 'white'
    });

  }
  ratingCompleted = rating => {
    this.setState({ ratingvalue: rating });
  }
  onPressAssign = data => {

    this.selectedButton = this.assigndata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.assigndata[0].value;
    this.setState({ assigndata: data, assignvalue: this.selectedButton });

  }
  onPressTest = data => {

    this.selectedButton = this.testData.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.testData[0].value;
    this.setState({ testData: data, assignvalue: this.selectedButton });

  }
  onPressCategory = data => {

    this.selectedButton = this.Categorydata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.Categorydata[0].value;
    this.setState({ Categorydata: data, Categoryvalue: this.selectedButton });

  }
  onPressLannguage = data => {

    this.selectedButton = this.LanguageData.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.LanguageData[0].value;
    this.setState({ LanguageData: data, Languagevalue: this.selectedButton });

  }
  onPressPrice = data => {

    this.selectedButton = this.Pricedata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.Pricedata[0].value;
    this.setState({ starCount: '1', assigndata: this.assigndata, ratingvalue: this.state.starCount, Pricedata: "" });

    console.log(this.Pricedata)

  }
  onPressTimeSlot = data => {

    this.selectedButton = this.TimeSlotdata.find(e => e.selected == true);
    this.selectedButton = this.selectedButton ? this.selectedButton.value : this.TimeSlotdata[0].value;
    this.setState({ TimeSlotdata: data, TimeSlotValue: this.selectedButton });

  }
  RBSheetOpen = () => {
    this.RBSheet.open();
    this.setState({ showComponmentList: this.state.showComponmentList = false })

  }
  RBSheetClose = () => {
    this.setState({ starCount: '1', assigndata: this.assigndata, ratingvalue: this.state.starCount, Pricedata: [] });
    this.setState({
      ratingvalue: "", assignvalue: "", testvalue: "",
      Categoryvalue: "", Languagevalue: ""
    });
    alert("Your Choosing all that item cleared ")
  }
  FilterApply = () => {

    this.RBSheet.close();
    this.filterList;

    var myObj = [];
    var obj = {};
    myObj = ({
      ratings: this.state.ratingvalue, assignment: this.state.assignvalue, test: this.state.testvalue,
      category: this.state.Categoryvalue, language: this.state.Languagevalue
    });
    for (var key in myObj) {
      if (myObj[key] !== '') {
        obj[key] = myObj[key];
      }
    }

    this.filterList = obj;

    this.setState({ filterList: this.filterList, showComponmentList: this.state.showComponmentList = true })

  }
  onRadioGroupChange = (value) => {
    this.setState({ radioValue: value });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10, }}>
        <Text
          style={styles.subtextout}
          onPress={this.RBSheetOpen}
        >Filter</Text>
        {this.state.showComponmentList &&
          <ListFind pricedata={this.state.Pricevalue} timeSlotdata={this.state.TimeSlotValue} valueFromParent={this.filterList}
            {...this.props} />}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={550}
          duration={250}
        >
          <View style={{ flexDirection: "column", marginTop: 10 }}>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.textStyle}>Filter</Text>
              <Text style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => { this.RBSheet.close(); }}>Cancel</Text>
            </View>
            <View style={styles.lineStyle} />

            <View style={styles.ridesFriends}>
              <View style={styles.ridesFriends1}>

                <Text style={{ backgroundColor: this.state.backgroundColor, padding: 15 }} onPress={this._RatingeShow}>Rating</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor1, padding: 15 }} onPress={this._PriceShow}>Price</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor2, padding: 15 }} onPress={this._TimeSlotShow}>Time Slots</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor3, padding: 15 }} onPress={this._AssignShow}>Assignment</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor4, padding: 15 }} onPress={this._CategoryShow}>Category</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor5, padding: 15 }} onPress={this._TestShow}>Test</Text>
                <Text style={{ backgroundColor: this.state.backgroundColor6, padding: 15 }} onPress={this._LanguageShow}>Medium of instruction</Text>


              </View>

              <View style={styles.verticleLine}></View>
              <View style={styles.MainContainer}>
                {this.state.showComponmentRating &&
                  <Rating
                    ratingCount={5}
                    imageSize={30}
                    style={{ marginTop: 20 }}
                    selectedColor='#FFA500'
                    showRating
                    startingValue={this.state.starCount}
                    onFinishRating={this.ratingCompleted} />
                }
                {this.state.showComponmentPrice &&

                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 10 }}
                    radioButtons={this.Pricedata}
                    onPress={this.onPressPrice}
                    style={{ paddingTop: 10 }} />
                }
                {this.state.showComponmentTimeSlot &&
                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 10 }}
                    radioButtons={this.TimeSlotdata}
                    onPress={this.onPressTimeSlot}
                    style={{ paddingTop: 10 }} />
                }
                {this.state.showComponmentAssign &&
                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 12 }}
                    radioButtons={this.assigndata}
                    onPress={this.onPressAssign}
                    style={{ paddingTop: 10 }} />
                }
                {this.state.showComponmentCategory &&
                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 12 }}
                    radioButtons={this.Categorydata}
                    onPress={this.onPressCategory}
                    style={{ paddingTop: 10 }} />
                }
                {this.state.showComponmentTest &&
                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 12 }}
                    radioButtons={this.testData}
                    onPress={this.onPressAssign}
                    style={{ paddingTop: 10 }} />
                }
                {this.state.showComponmentLanguage &&
                  <RadioGroup
                    color='black'
                    labelStyle={{ fontSize: 12 }}
                    radioButtons={this.LanguageData}
                    onPress={this.onPressLannguage}
                    style={{ paddingTop: 10 }} />
                }

              </View>

            </View>

            <View style={styles.lineStyle} />
            <View style={{ flexDirection: "row", marginTop: 10, }}>
              <Text style={{ fontSize: 15, color: 'red', marginLeft: 15, alignItems: "center", marginTop: 10 }}
                onPress={this.RBSheetClose}>Clear All</Text>

              <View
                style={styles.SKIPBUTTON}>
                <Text style={styles.SKIPTEXT}
                  onPress={this.FilterApply.bind(this)}>
                  Apply</Text>
              </View>



            </View>

          </View>
        </RBSheet>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SKIPBUTTON: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    right: 0,
    marginLeft: 10,
    width: 200,
    height: 40,
    marginRight: 10,
    backgroundColor: 'gray'

  },
  SKIPTEXT: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    fontSize: 20
  },

  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedItemView:
  {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    backgroundColor: '#263238',
    justifyContent: 'center',
    alignItems: 'center'
  },

  selectedText:
  {
    fontSize: 17,
    color: '#fff'
  },
  ridesFriends: {
    flexDirection: 'row',
    width: "100%",
    color: 'gray'
  },
  ridesFriends1: {
    flexDirection: "column",
  },
  numbers: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
    padding: 17,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,

  },
  verticleLine: {
    height: 400,
    width: 1,
    backgroundColor: '#909090',
  },
  lineStyle: {
    borderWidth: 0.4,
    borderColor: 'gray',
    margin: 1,
    marginTop: 10
  },
  bottomView: {

    width: '100%',
    height: 550,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0
  },
  textStyle: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18
  },
  container: {
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'black',
  },
  text: {
    color: '#FFA500',
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
  },
  searchBar: {
    flex: 0,
    top: '5%',
    backgroundColor: 'black'
  },
  merchantsList: {
    flex: 6,
    width: '95%',
  },
  footerBtn: {
    flex: 1,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    marginTop: 5,
  },

  SelectedlistItem: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: "grey",
  },

  btnSelect: {
    justifyContent: 'center',
    width: '95%',
    borderRadius: 5,
    borderColor: '#00CED1',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 40,
    marginTop: 5,
    marginLeft: 8,
  },

  btnDsb: {
    justifyContent: 'center',
    width: '95%',
    borderRadius: 5,
    backgroundColor: 'gray',
    height: 40,
    marginTop: 5,
    marginLeft: 8,
  },
  txtBtn: {
    textAlign: 'center',
    color: '#00CED1',
    fontSize: 20,
  },
  subtextout: {
    borderColor: 'white',
    fontSize: 13,
    color: 'white',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 15,
    marginRight: 5,
    padding: 5,
    width: 50,
  },

});
