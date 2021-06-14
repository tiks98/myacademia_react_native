import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TabBarIOS,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyProfile from "./components/MyProfile";
import Login from "./components/Login";
// import { Icon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthService from "./Services/AuthService";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
import FriendsList from "./components/FriendsList";
import Profile from "./components/Profile";
import Search from "./components/Search";
import CreateProfile from "./components/CreateProfile";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomeScreen({ navigation }) {
  const authContext = React.useContext(AuthContext);
  const {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    setGoogleLogin,
    googleLogin,
    myprofileId,
  } = React.useContext(AuthContext);
  const onLogoutSuccess = (res) => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(null);
        setIsAuthenticated(false);
        // setGoogleLogin(false);
        // navigation.navigate("Login");
      } else {
        console.log("Logout unsuccessful");
      }
    });
    // alert("Logout Successful");
  };

  const checkAuthenticaiton = () => {
    AuthService.isAuthenticated().then((data) => {
      console.log(data);
    });
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.homeScreenBar}>
          <Text style={styles.heading}>Home Screen</Text>
          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              flex: 1,
              alignItems: "center",
              borderRadius: 50,
              backgroundColor: "#6d2aff",
              marginRight: 20,
              height: 62,
              marginVertical: 10,
            }}
          >
            <Icon
              name="search"
              color="#FFFFFF"
              size={30}
              onPress={() => navigation.navigate("Search")}
            />
          </TouchableOpacity>
        </View>
        <Button
          title="Go To Create Profile Page"
          onPress={() => navigation.navigate("CreateProfile")}
        />
        <Button
          title="Go To My Profile Page"
          onPress={() => navigation.navigate("MyProfile")}
        />
        <Button title="Logout" onPress={onLogoutSuccess} />
        <Button title="check authentication" onPress={checkAuthenticaiton} />
        {/* <Button
        title="Go to My Profile Page"
        onPress={() => navigation.openDrawer()}
      /> */}
        {/* </AuthProvider> */}
      </View>
    </SafeAreaView>
  );
}

// const openDrawer = () => {
//   <
// }

function DetailScreen() {
  return (
    <View>
      <Text style={styles.heading}>Detail Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [myprofileId, setMyProfileId] = useState(null);
  const [googleLogin, setGoogleLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setMyProfileId(data.myprofileId);
      setGoogleLogin(data.googleLogin);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  if (isLoaded === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const goToProfile = () => {
    console.log("profile page");
  };

  const HomeStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateProfile") {
              iconName = focused ? "person-circle-outline" : "person-circle";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CreateProfile" component={CreateProfile} />
      </Tab.Navigator>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        googleLogin,
        setGoogleLogin,
        myprofileId,
        setMyProfileId,
      }}
    >
      <NavigationContainer>
        {/* {isAuthenticated ? ( */}
        {/* <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="FriendsList" component={FriendsList} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} /> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* </Stack.Navigator> */}
        {/* ) : ( */}
        {/* <Login /> */}
        {/* )} */}

        {/* <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyProfile" component={MyProfile} />
        <Tab.Screen name="Login" component={Login} />
      </Tab.Navigator> */}
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="MyProfile" component={MyProfile} />
          <Drawer.Screen name="FriendsList" component={FriendsList} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Search" component={Search} />
          <Drawer.Screen name="CreateProfile" component={CreateProfile} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    padding: 20,
    flex: 3,
  },
  homeScreenBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
