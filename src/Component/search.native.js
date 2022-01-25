import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native';
import Filter from './filter.native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import ListSearch from './ListSearch.native';
import {POST_SUGGESTBOX_SEARCH,BASE_URL_LOGIN,GET_USER_DETAILS} from '../services/api.constans';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class Search extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
    return true;
  }

  constructor() {
    super();
    this.state = {
      search: '',
      search_value: '',
      hidedata: false,
      selectedItems: [],
      searchcourse: [],
      authorization:'',
    }

    this.authtoken_fun();
  }

  authtoken_fun = async () => {
    try {
      const value = await AsyncStorage.getItem('auth_Token');

      this.setState({ authorization: value });


    } catch (e) {
      // error reading value
    }
  }
  SearchFilterFunction = (text) => {
    console.log(text);
  }

  _RatingeShow = () => {

    this.setState({ showComponmentRating: this.state.showComponmentRating = true })

  }

  findclass = (query) => {

    if (query) {

      this.setState({ hidedata: false });
      this.setState({ showComponmentRating: false })
    //  this.setState({ search_value: query });
      let self = this;
      const params = query;
     
      axios.get(BASE_URL_LOGIN + POST_SUGGESTBOX_SEARCH+params, {
        headers: {
          'Authorization': self.state.authorization
        }
      })
        .then(function (response) {
          // handle success
  
          if (response.data.status == "Success") {
  
            console.log(response.data.data);
            const datastore = response.data.data;
            self.setState({ searchcourse: datastore });
  
          }
          else {
  
            Toast.show(response.data, Toast.SHORT);
          }
  
        })
        .catch(function (error) {
          // handle error
         
          console.log("error", error);
        });
  
    } else {

      this.setState({ hidedata: true })

    }

  };

  selectedvalue = (item) => {

    const passdata = item;

    this.setState({ search: passdata.value });
    this.setState({ hidedata: true });

  };

  renderItem = ({ item }) => (

      <View style={styles.container1}>

      <TouchableOpacity
        onPress={() => this.selectedvalue(item)}>

        <Text style={styles.itemText}>
          {item.value}
        </Text>

      </TouchableOpacity>

      </View>

  );

  render() {

    return (
      <View style={styles.container}>

        <Autocomplete style={{   padding: 10,
              marginTop: 2,
              backgroundColor: '#fff',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 5,
         }}
          placeholder="Search for courses"
          defaultValue={this.state.search}
          hideResults={this.state.hidedata}
          data={this.state.searchcourse}
          onChangeText={text => this.findclass(text)}
          renderItem={this.renderItem} />
        
        <View style={{ position: 'absolute', right: 0, marginRight: 10, alignItems: 'center', marginTop: 15 }}>

          <Icon1
            name="search"
            backgroundColor="gray"
            size={25}
            onPress={this._RatingeShow}>
          </Icon1>
       
        </View>
        

        {this.state.showComponmentRating &&
          <View style={styles.container1}>

            <Filter {...this.props} />

            <ListSearch {...this.props} searchvalue={this.state.search} token ={this.state.authorization} />

          </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: 'black',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  container1: {
    flex: 2,
    backgroundColor: 'black',
  },
  scrollView: {
    marginHorizontal: 0,
  },
  itemText: {
    fontSize: 18,
    margin: 2,
    color: "#fff"
  },
  searchstyle: {
   // margin: 5,
   flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  logo: {
    margin: 5,
    borderWidth: 0
  },

  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardstyle: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10
  },
  FlatListStyle: {
    backgroundColor: 'black',
    borderColor: "#000",
    fontSize: 20,
    marginRight: 5,
    alignContent: "center",
    marginLeft: 5,
    marginBottom: 10
  },

});


export default Search;