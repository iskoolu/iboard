import React, { Component } from 'react';
import { ScrollView , View,StyleSheet,Text,FlatList ,BackHandler} from 'react-native';
import { Card, Title, Paragraph,Appbar, } from 'react-native-paper';
import constantvalue from "../shared/label.constants";

class OverAllClass extends Component{
    
    constructor(props) {

        super(props);
        this.state = { onGoingClassList:[

          {id:'1',type:'learning',typeTitle:'Learning class',subjectName:'Learn Android',title:'Introduction of android',subTitle:'android version list',time:'6:30 pm'},
          {id:'2',type:'learning',typeTitle:'Learning class',subjectName:'LearnAjax',title:'Introduction of ajax',subTitle:'android version list',time:'6:30 pm'},
          
      ],

      teachingList:[
        {id:'3',type:'teaching',typeTitle:'Teaching class',subjectName:'ReactNative',title:'Introduction of react',subTitle:'native and react meaning',time:'6:30 pm'},
          {id:'4',type:'teaching',typeTitle:'Teaching class',subjectName:'Flutter',title:'Introduction of flutter',subTitle:'android version list',time:'6:30 pm'},
          {id:'5',type:'teaching',typeTitle:'Teaching class',subjectName:'Android',title:'Introduction of android',subTitle:'android version list',time:'6:30 pm'},
          {id:'6',type:'teaching',typeTitle:'Teaching class',subjectName:'Ajax',title:'Introduction of ajax',subTitle:'android version list',time:'6:30 pm'},
          {id:'7',type:'teaching',typeTitle:'Teaching class',typeTitle:'Teaching class',subjectName:'ReactNative',title:'Introduction of react',subTitle:'native and react meaning',time:'6:30 pm'},
          {id:'8',type:'teaching',typeTitle:'Teaching class',subjectName:'Flutter',title:'Introduction of flutter',subTitle:'android version list',time:'6:30 pm'},
          {id:'9',type:'teaching',typeTitle:'Teaching class',subjectName:'Android',title:'Introduction of android',subTitle:'android version list',time:'6:30 pm'},
          {id:'10',type:'teaching',typeTitle:'Teaching class',subjectName:'Ajax',title:'Introduction of ajax',subTitle:'android version list',time:'6:30 pm'},
          {id:'11',type:'teaching',typeTitle:'Teaching class',subjectName:'ReactNative',title:'Introduction of react',subTitle:'native and react meaning',time:'6:30 pm'},
          {id:'12',type:'teaching',typeTitle:'Teaching class',subjectName:'Flutter',title:'Introduction of flutter',subTitle:'android version list',time:'6:30 pm'},
          
      ],
        };
    
      }
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      handleBackPress = () => {
        this.props.navigation.navigate('myClass');
        return true;
      };
    render(){

        const checkconditon = this.props.valueFromParent;

        return(

        <View style={styles.Container}>

              {checkconditon == true ? null
           : (<Appbar.Header style = {styles.toolbarstyle}>
            <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()} />
            <Appbar.Content color = '#696969'  title="OverAllClass" />
           </Appbar.Header>) }     
                            
                <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>

                <View style = {styles.textviewstyle}>
                    
                {checkconditon == true ? ( <Text style = {styles.bigtextstyle}>
                    {constantvalue.homepage.overallclass}
                    </Text>) : null}

                    <Text style = {styles.textstyle}>
                    {constantvalue.homepage.learningcourse}
                    </Text>

           {checkconditon == true ?(<FlatList
                       //horizontal
                       style = {styles.FlatListStyle}
                        numColumns={2}
                        windowSize
                       data ={this.state.onGoingClassList.slice(0,3)}
                       
                       renderItem={({item})=>

                       <Card style = {styles.cardstyle} 
                       onPress = {() => this.props.navigation.navigate('detail')}>
                       <Card.Content>
                         <Title style = {styles.textcolor}>{item.subjectName}</Title>
                         <Title style = {styles.textcolor}>{item.title}</Title>
                         <Paragraph style = {styles.textcolor}>{item.subTitle}</Paragraph>
                         <Text style = {styles.texttimecolor}>{item.time}</Text>
                       </Card.Content>
                      
                      </Card>

                       }   
                       keyExtractor={(item =>item.id)}>
                    </FlatList>)
                    
                    :(<FlatList
                      // horizontal
                       style = {styles.learningFlatListStyle}
                       numColumns={2}
                        windowSize
                       data ={this.state.onGoingClassList}
                       renderItem={({item})=>

                       <Card style = {styles.cardstyle} 
                       onPress = {() => this.props.navigation.navigate('detail')}>
                       <Card.Content>
                         <Title style = {styles.textcolor}>{item.subjectName}</Title>
                         <Title style = {styles.textcolor}>{item.title}</Title>
                         <Paragraph style = {styles.textcolor}>{item.subTitle}</Paragraph>
                         <Text style = {styles.texttimecolor}>{item.time}</Text>
                       </Card.Content>
                      
                      </Card>
                       }   
                       keyExtractor={(item =>item.id)}>
                    </FlatList>
                    ) }


        <Text style = {styles.textstyle}>
                    {constantvalue.homepage.Teachingcourse}
                    </Text>

           {checkconditon == true ?(<FlatList
                       horizontal
                       style = {styles.FlatListStyle}
                        //numColumns={2}
                        windowSize
                       data ={this.state.teachingList.slice(0,5)}
                       renderItem={({item})=>

                       <Card style = {styles.cardstyle} 
                       onPress = {() => this.props.navigation.navigate('classDetails')}>
                       <Card.Content>
                         <Title style = {styles.textcolor}>{item.subjectName}</Title>
                         <Title style = {styles.textcolor}>{item.title}</Title>
                         <Paragraph style = {styles.textcolor}>{item.subTitle}</Paragraph>
                         <Text style = {styles.texttimecolor}>{item.time}</Text>
                       </Card.Content>
                      
                      </Card>
                       }   
                       keyExtractor={(item =>item.id)}>
                    </FlatList>)
                    
                    :(<FlatList
                      // horizontal
                       style = {styles.FlatListStyle}
                        numColumns={2}
                        windowSize
                       data ={this.state.teachingList}
                       renderItem={({item})=>

                       <Card style = {styles.cardstyle} 
                       onPress = {() => this.props.navigation.navigate('classDetails')}>
                       <Card.Content>
                         <Title style = {styles.textcolor}>{item.subjectName}</Title>
                         <Title style = {styles.textcolor}>{item.title}</Title>
                         <Paragraph style = {styles.textcolor}>{item.subTitle}</Paragraph>
                         <Text style = {styles.texttimecolor}>{item.time}</Text>
                       </Card.Content>
                       
                      </Card>
                       }   
                       keyExtractor={(item =>item.id)}>
                    </FlatList>
                    ) }

                </View>                           
           
        </ScrollView>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:'#fff'
},
textviewstyle:{
    flex: 1,
    padding:5,
    marginTop: 5,
},
textstyle:{
    fontSize: 18,
    color: "#696969",
    fontWeight: "bold"
},
bigtextstyle:{
  fontSize: 23,
  color: "#696969",
  fontWeight: "bold"
},
FlatListStyle: {
    backgroundColor:'#fff',
    borderColor: "#000",
    fontSize: 20,
    alignContent:"center",
},
learningFlatListStyle: {
  backgroundColor:'#fff',
  borderColor: "#000",
  fontSize: 20,
  alignContent:"center",
},
textcolor:{
    color: "#fff",
},
texttimecolor:{
    color: "#ffd700",
    justifyContent: 'flex-end',
},
cardstyle:{
    margin:5,
    width: '45%',
    borderRadius:5,
    backgroundColor: "#696969"
},
toolbarstyle:{
  backgroundColor :"#fff",
},

});
export default  OverAllClass;
