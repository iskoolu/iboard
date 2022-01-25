import React, { Component } from 'react';
import {
  View,
  StyleSheet,

  Dimensions,
} from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';

//const width = Dimensions.get('window').width;

export default class AddHeading extends Component {

  constructor(props) {
    super(props);

    this.state = {
      textInputArray: [ { head: null, subHead: [{ value: null }] } ],
      inputData: [],
      finalheading: [
        { head: null },
      ],
    
      subheading: {index:null, text:null},
     // heading: headingdata,
      passdata:this.props.heading_data,
      indexvalue:0,
      
    }

    let passdatavalue = this.props.passingdata;
   
 
    if(passdatavalue == ''){


    }
    else{

      let subheadingdata = this.props.passingdata;
    
      this.state.textInputArray = [];
      this.state.textInputArray.push(subheadingdata)
      console.log("headingdata",subheadingdata);
     
    }
 
  }

  addTextInput = (heading, id) => {
    
    var subHeadval = { value: null };

    var temp = heading.subHead;
    
    heading.subHead.push(subHeadval);
    const tempHeading = this.state.textInputArray;
   
    tempHeading[id] = heading;
    
    this.setState({ tempHeading})
    
  }

  removeTextInput = (heading,subindex,index) => {

    let textInput = this.state.textInputArray;

    delete textInput[index].subHead[subindex];

    var filtered = textInput[index].subHead.filter(function (el) {
      return el != null;
    });
    
   
    //  var theArray = textInput[index].subHead.filter((_, subindex) => textInput[index].subHead.hasOwnProperty(subindex)); 
   
    textInput[index].subHead = []
    textInput[index].subHead = filtered;

    this.setState({textInputArray: textInput});
  
  }

 

  removeItem = (textInput, i,index) =>{

    textInput[index].subHead.slice(0, i-1).concat(textInput[index].subHead.slice(i, textInput[index].subHead.length))
    this.setState({ textInput});
  }

   setHeadValues = (headval, subHead, text,index,sindex)=>{

    var dataArray = this.state.textInputArray;

   
  if (subHead != null) {
   
    dataArray[index].subHead[sindex]["value"]= text

  }
  else{

    dataArray[index]["head"] = text
  }
   this.setState({ textInputArray:dataArray});

  }

 
  getValues = () => {


     var headings = [{"head":"Dev","subHead":[{"value":"Val"},{"value":"Twst val"}]},
     {"head":"jai","subHead":[{"value":"Val"},{"value":"Twst val"}]}];
   
     let valueArray = headings.join("#NH#");
     console.log("new",valueArray);

     
  
   // this.props.heading_data(this.state.textInputArray);

  }
  render() {
   
    
    return (
      <View style={styles.Container}>
        <View style={styles.row}>
          <View style={styles.row}>


{this.state.textInputArray.map((head, index) => {
              return  <View  key={index}>
                
            <TextInput style={styles.textInput}
              label="Heading"
              controlled={true}
              mode='outlined'
              underlineColor="#696969"
              value={head.head}
              keyboardType='email-address'
              theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray', } }}
            
            onChangeText={(text) => this.setHeadValues(head, null, text,index,null)}
              />
              
    {head.subHead.map((subhead, sIndex) => (
              <View style={{
                flexDirection: 'row', 
                width:"90%"
              }}   key={sIndex}>

              <TextInput style={styles.textInput}
                label="SubHeading"
                mode='outlined'
                underlineColor="#696969"
                value={subhead.value}
                keyboardType='email-address'
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', borderColor: 'gray', } }}
                onChangeText={(text) => this.setHeadValues(head, subhead, text,index,sIndex)}
                
               />
          
              <IconButton style={{
              alignContent:'center',alignItems:'center',alignSelf:'center'
              }}
                icon="alpha-x-circle-outline"
                onPress={() => this.removeTextInput(head,sIndex,index)}
                color="#696969"
                size={20}/>
          
                </View>

    ))}

         <Button style={styles.buttonstyle}
                  color="#696969"
                  mode="contained"
                  onPress={() => this.addTextInput(head,index)} >
                  Add SubHeading
          </Button>

                </View>

            })}
           

            <View style={{
              flexDirection: 'row', alignItems: "center",
              marginTop: 10, alignSelf: 'center'
            }}>

              

                <Button style={styles.buttonstyle}
                  color="#696969"
                  mode="contained"
                  onPress={() => this.getValues()} >
                  Submit
                 </Button>

             
               

            
            </View>

          </View>





        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 0.7,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  buttonstyle: {
    color: "#696969",
    margin: 5,
    alignSelf: "center",
    padding: 5,
  },
  textInput: {
    height: 40,
    width:"100%",
    borderColor: 'black',
    margin: 5
  },
  row: {
    flex: 1,
    padding: 10,
    //justifyContent: 'center'
  },
});
