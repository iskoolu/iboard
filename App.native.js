
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from "./src/Component/login.native";
import forgotPassword from "./src/Component/forgotPassword.native";
import VerifyAccount from "./src/Component/VerifyAccount.native";
import resetPassword from "./src/Component/resetPassword.native";
import bottomNavigator from "./src/Component/bottomNavigator.native";
import bottm from "./src/Component/bottm.native";
import classcreation from "./src/Component/classcreation.native";
import OnGoingClass from "./src/Component/OnGoingClass.native";
import FutureClass from "./src/Component/FutureClass.native";
import OverAllClass from "./src/Component/OverAllClass.native";
import notifications from "./src/Component/Notifications.native";
import payment from "./src/Component/payment.native";
import CheckoutPayment from "./src/Component/checkoutPayment.native";
import SplashScreen from './src/Component/splashscreen.native';
import Register from './src/Component/register.native';
import Policy from './src/Component/policy.native';
import OTP from './src/Component/otp.native';
import Indivdualinfo from './src/Component/indivdualinfo.native';
import Institutioninfo from './src/Component/institutioninfo.native';
import Cookies from './src/Component/cookies.native';
import Terms from './src/Component/terms.native';
import detail from './src/Component/detail.native';
import classDetails from './src/Component/classDetails.native';
import profileDetails from './src/Component/profileDetails.native';
import editProfile from './src/Component/editProfile.native';
import myClass from './src/Component/myClass.native';
import timeSlot from './src/Component/TimeSlot.native';
import settingdetail from './src/Component/settingdetail.native';
import paymentHistory from './src/Component/paymentHistory.native';
import reschedule from './src/Component/reschedule.native';
import ListSearch from './src/Component/ListSearch.native';
import Search from './src/Component/search.native';
import addheading from './src/Component/Addheading.native';
import profileDetails_institute from './src/Component/profileDetails_institute.native';
import emailupdate from './src/Component/Emailupdate.native';
import changePassword from './src/Component/changePassword.native';
import Mobileupdate from './src/Component/Mobileupdate.native';
import Topinstitute from './src/Component/Topinstitute.native';
import mycourse from './src/Component/mycourse.native';
import becomeCoach from './src/Component/BecomeCoach.native';
import Topcoaches from './src/Component/Topcoaches.native';
import PostComment from './src/Component/blackboard/components/postComments';
import { BlackBoardImageListView } from './src/Component/blackboard';
import PostInput from './src/Component/blackboard/components/postInput';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import PostImageViewer from './src/Component/blackboard/components/ImageViewer';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName={"bottomNavigator"}
      screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={login}
      />
      <Stack.Screen
        name="forgotPassword"
        component={forgotPassword}
      />

      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccount}
      />
      <Stack.Screen
        name="resetPassword"
        component={resetPassword}
      />
      <Stack.Screen
        name="bottomNavigator"
        component={bottomNavigator}
      />
      <Stack.Screen
        name="classcreation"
        component={classcreation}
      />

      <Stack.Screen
        name="bottm"
        component={bottm}
      />

      <Stack.Screen
        name="OnGoingClass"
        component={OnGoingClass}
      />

      <Stack.Screen
        name="classDetails"
        component={classDetails}
      />

      <Stack.Screen
        name="FutureClass"
        component={FutureClass}
      />
      <Stack.Screen
        name="OverAllClass"
        component={OverAllClass}
      />

      <Stack.Screen
        name="becomeCoach"
        component={becomeCoach}
      />

      <Stack.Screen
        name="Topcoaches"
        component={Topcoaches}
      />


      <Stack.Screen
        name="payment"
        component={payment}
      />
      <Stack.Screen
        name="notifications"
        component={notifications}
      />
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPayment}
      />

      <Stack.Screen
        name="profileDetails"
        component={profileDetails}
      />

      <Stack.Screen
        name="profileDetails_institute"
        component={profileDetails_institute}
      />

      <Stack.Screen
        name="Mobileupdate"
        component={Mobileupdate}
      />

      <Stack.Screen
        name="Topinstitute"
        component={Topinstitute}
      />

      <Stack.Screen
        name="mycourse"
        component={mycourse}
      />


      <Stack.Screen
        name="editProfile"
        component={editProfile}
      />
      <Stack.Screen
        name="addheading"
        component={addheading}
      />
      <Stack.Screen
        name="emailupdate"
        component={emailupdate}
      />

      <Stack.Screen
        name="changePassword"
        component={changePassword}
      />


      <Stack.Screen
        name="myClass"
        component={myClass}
      />
      <Stack.Screen
        name="ListSearch"
        component={ListSearch}
      />
      <Stack.Screen
        name="Search"
        component={Search}
      />


      <Stack.Screen
        name="timeSlot"
        component={timeSlot}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
      />

      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Institutioninfo"
        component={Institutioninfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Indivdualinfo"
        component={Indivdualinfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cookies"
        component={Cookies}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
      />
      <Stack.Screen
        name="detail"
        component={detail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="settingdetail"
        component={settingdetail}
      />

      <Stack.Screen
        name="paymentHistory"
        component={paymentHistory}
      />

      <Stack.Screen
        name="reschedule"
        component={reschedule}
      />

      <Stack.Screen
        name="BBImageList"
        component={BlackBoardImageListView}
        options={{ headerShown: true, title: "Images" }}
      />
      <Stack.Screen
        name="PostInput"
        component={PostInput}
        options={{ headerShown: true, title: "New Post" }}
      />

    </Stack.Navigator>
  );
};


function RootStackScreen() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={App}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="PostComment"
            component={PostComment}
            options={{ headerShown: false, title: "Comments" }}
          />
          <RootStack.Screen
            name="ImageViewer"
            component={PostImageViewer}
            options={{ headerShown: false, title: "Images" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default RootStackScreen;


