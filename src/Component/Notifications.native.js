import React, { Component } from 'react';
import { View,StyleSheet,Text,FlatList } from 'react-native';
import { Card, Title, Paragraph,Avatar, } from 'react-native-paper';
import constantvalue from "../Constant/constantvalue";

class notifications extends Component{
    
    constructor(props) {

        super(props);
        this.state = { onGoingClassList:[

            {id:'1',title:'Introduction of android',subTitle:'android version list',time:'6:30 pm'},
            {id:'2',title:'Introduction of ajax',subTitle:'android version list',time:'6:30 pm'},
            {id:'3',title:'Introduction of react',subTitle:'native and react meaning',time:'6:30 pm'},
            {id:'4',title:'Introduction of flutter',subTitle:'android version list',time:'6:30 pm'},

        ]
        };
    
      }
 
    render(){

        return(
        
        <View style={styles.Container}>
                            
                <View style = {styles.textviewstyle}>
                    
                    <Text style = {styles.textstyle}>
                        {constantvalue.homepage.futureClass}

                    <Avatar.Icon
                        style = {styles.arrowstyle}
                        size={24} 
                        icon="arrow-right" />
                    </Text>

                    <FlatList
                      // horizontal
                       style = {styles.FlatListStyle}
                       data ={this.state.onGoingClassList}
                       renderItem={({item})=>

                       <Card style = {styles.cardstyle}>
                       <Card.Content>
                       <Title style = {styles.texttimecolor}>{item.subjectName}</Title>
                         <Title style = {styles.textcolor}>{item.title}</Title>
                         <Paragraph style = {styles.textcolor}>{item.subTitle}</Paragraph>
                         <Text style = {styles.texttimecolor}>{item.time}</Text>
                       </Card.Content>
                      </Card>
                       } 
                       keyExtractor={(item =>item.id)}>
                    </FlatList>

                </View>                           
            
        
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
Container: {
    flex:1,
    backgroundColor:'#fff'
},
textviewstyle:{
    flex: 1,
    padding: 5,
    marginTop: 5,
},
textstyle:{
    padding: 3,
    fontSize: 18,
    color: "#696969",
    fontWeight: "bold"
},
arrowstyle:{
    color: "#696969",
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'flex-end'
},
FlatListStyle: {
    borderColor: "#000",
    width: '100%',
    fontSize: 20,
},
cardstyle:{
    margin:4,
    borderRadius:5,
    backgroundColor: "#696969"
},
textcolor:{
    color: "#fff",
},
texttimecolor:{
    color: "#ffd700",
   
},



});

export default  notifications;
