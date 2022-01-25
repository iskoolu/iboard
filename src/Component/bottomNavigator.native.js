import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import profile from "./profile";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import home from "./home.native";
import Search from "./search.native";
import Mycourse from "./mycourse.native";
import { BlackBoardView } from './blackboard';

const Tab = createBottomTabNavigator();

const bottomNavigator = () => {

  return (

    <Tab.Navigator 

      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: '#fff',
        activeBackgroundColor: '#ffd700'
      }}
      initialRouteName={"feed"}
    >

      <Tab.Screen name="Home" component={home}

        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="#696969" size={size}
            />
          ),

        }} />

      {/* <Tab.Screen name="Search" component={Search} 
       options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name="search"   color="#696969" size={size} />
          ), 
        }}/> */}

      <Tab.Screen name="My courses" component={Mycourse}
        options={{
          tabBarLabel: 'My courses',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color="#696969" size={size}
            />
          ),
        }} />

      <Tab.Screen name="profile" component={profile}

        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="#696969" size={size} />
          ),
        }} />

      <Tab.Screen name="feed" component={BlackBoardView}

        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rss" color="#696969" size={size} />
          ),
        }} />

    </Tab.Navigator>

  );

};



export default bottomNavigator;