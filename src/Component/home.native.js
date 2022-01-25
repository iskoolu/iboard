import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, BackHandler,Text } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import OnGoingClass from "./OnGoingClass.native";
import FutureClass from "./FutureClass.native";
import OverAllClass from "./OverAllClass.native";
import Search from "./search.native";
import Topinstitute from './Topinstitute.native';
import Topcoaches from './Topcoaches.native';

export default class home extends Component {

    constructor(props) {

        super(props);
        this.state = {
            token: '',
            userInfo: '',
            appbarcheck: true,
        };

    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        //BackHandler.exitApp();
        return true;
    };
    render() {

        return (

            <View style={styles.Container}>

         
                <View style={styles.autocompleteContainer}>
                    
                    <Search {...this.props} />
                
                </View> 


                <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>

                    <View style={styles.textviewstyle}>
                        
                       
                    <Topinstitute {...this.props} valueFromParent={this.state.appbarcheck} />
                  
                    <Topcoaches {...this.props} valueFromParent={this.state.appbarcheck} />
                    
                        <Chip  style={{alignItems:'center', alignSelf: 'flex-end',height:20,}}  
                          textStyle = {{fontSize:10}}
                          icon="chevron-triple-right" 
                          onPress = {() => this.props.navigation.navigate('Topinstitute')} >
                          View more
                         </Chip>
                     

                        <OnGoingClass {...this.props} valueFromParent={this.state.appbarcheck} />

                        <Chip  style={{alignItems:'center', alignSelf: 'flex-end',height:20,}}  
                          textStyle = {{fontSize:10}}
                          icon="chevron-triple-right" 
                          onPress = {() => this.props.navigation.navigate('OnGoingClass')} >
                          View more
                         </Chip>
                       
                       
                        {/* <FutureClass {...this.props} valueFromParent={this.state.appbarcheck} />

                        <OverAllClass {...this.props} valueFromParent={this.state.appbarcheck} /> */}

                    </View>

                </ScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    Container: {
        //flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        marginHorizontal: 0,
    },
    textviewstyle: {
        flex: 1,

        marginTop: 5,
    },
    toolbarstyle: {
        backgroundColor: "#ffd700",
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    textstyle:{
        fontSize: 18,
        marginTop:10,
        color: "#696969",
        fontWeight: "bold"
    },
});


