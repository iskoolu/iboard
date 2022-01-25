import React, { Component } from 'react';
import { View,StyleSheet,Text,FlatList,BackHandler,TouchableOpacity } from 'react-native';
import { Avatar,Appbar } from 'react-native-paper';


export default class paymentHistory extends Component{
    
    constructor(props) {

        super(props);
        this.state = {
          
          paymentList:[

          {id:'3',type:'Paid to',typeTitle:'Course fee',Amount:'₹1,000'},
          {id:'5',type:'Paid to',typeTitle:'Course fee ',Amount:'₹2,000'},
          {id:'6',type:'Paid to',typeTitle:'Course fee ',Amount:'₹10,000'},
          {id:'7',type:'Paid to',typeTitle:'Course fee ',Amount:'₹5,000'},
          {id:'8',type:'Paid to',typeTitle:'Course fee ',Amount:'₹1,000'},
          {id:'9',type:'Paid to',typeTitle:'Course fee ',Amount:'₹1,000'},
          {id:'10',type:'Paid to',typeTitle:'Course fee ',Amount:'₹5,000'},
          {id:'11',type:'Paid to',typeTitle:'Course fee ',Amount:'₹2,000'},
          {id:'12',type:'Paid to',typeTitle:'Course fee ',Amount:'₹10,000'},
          
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
        const{goBack} = this.props.navigation;
        goBack();
        return true;
      };

     
    render(){

        return(
        
        <View style={styles.Container}>

        
           <Appbar.Header style = {styles.toolbarstyle}>
            <Appbar.BackAction color = '#696969' onPress={() => this.handleBackPress()} />
            
           </Appbar.Header>

                <View style = {styles.textviewstyle}>
                    
                  <FlatList
                       //horizontal
                       style = {styles.FlatListStyle}
                        
                        windowSize
                       data ={this.state.paymentList}
                       
                       renderItem={({item})=>
                       <View>

                   
                       <TouchableOpacity  style={{margin:10}}   >

                          <View>

                          <View style={{flexDirection:"row",margin:5,justifyContent: 'space-between',}}>

                           <Avatar.Icon style={{marginRight:5,backgroundColor:'#ffd700',}} 
                           size={40} 
                           icon="arrow-top-right"
                           color="#fff" />

                           <View style={{margin:5,flex:1, position: 'relative', left: 0,}}>
                           <Text style = {styles.bigtextstyle}>{item.type}</Text>
                           <Text style = {styles.textstyle}>Course fee</Text>
                          </View >

                          <Text style = {styles.amounttextstyle}>{item.Amount}</Text>

                          </View>

                            <View>
                            <Text style={{position: 'relative', left: 0,fontSize:12, color: "#696969",}}>
                              30 Sep 2020
                            </Text>
                           </View>

                         </View>

                      </TouchableOpacity>

                      <View style= {styles.divederstyle}  />
                      </View>
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
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:'#fff'
},
textviewstyle:{
    flex: 1,
    padding:5,
    marginTop: 5,
},
amounttextstyle:{
  fontSize: 18,
  color: "#000",
  margin:5,
},
bigtextstyle:{
    fontSize: 18,
    color: "#000", 
},
textstyle:{
  fontSize: 13,
  color: "#696969",
},
FlatListStyle: {
    backgroundColor:'#fff',
    borderColor: "#000",
    fontSize: 20,
    alignContent:"center",
},
divederstyle:{
  borderWidth:2,
  borderColor:"#D3D3D3"
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


