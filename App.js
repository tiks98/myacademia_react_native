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
// import { createDrawerNavigator } from "@react-navigation/drawer";
import MyProfile from "./components/MyProfile";
import Login from "./components/Login";
// import { Icon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthService from "./Services/AuthService";
import AuthProvider, { AuthContext } from "./Context/AuthContext";

function HomeScreen({ navigation }) {
  const onLogoutSuccess = (res) => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        setGoogleLogin(false);
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
    <View>
      {/* <AuthProvider> */}
      <Text style={styles.heading}>Home Screen</Text>
      {/* <TextInput
        style={{ height: 40 }}
        placeholder="username"
        onChangeText={(username) => setText(username)}
        defaultValue={username}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="password"
        onChangeText={(password) => setText(password)}
        defaultValue={password}
      /> */}
      {/* <Icon
        raised
        name="heartbeat"
        type="font-awesome"
        color="#f50"
        onPress={() => console.log("hello")}
      /> */}
      <Icon
        name="facebook"
        backgroundColor="#3b5998"
        size={50}
        style={{ paddingLeft: 20 }}
        onPress={() => navigation.navigate("Detail")}
      />

      <Button
        title="Go To Details Page"
        onPress={() => navigation.navigate("Detail")}
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
// const Drawer = createDrawerNavigator();

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
        {isAuthenticated ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            {/* <Stack.Screen name="Login" component={Login} /> */}
          </Stack.Navigator>
        ) : (
          <Login />
        )}

        {/* <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MyProfile" component={MyProfile} />
        <Tab.Screen name="Login" component={Login} />
      </Tab.Navigator> */}
        {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="MyProfile" component={MyProfile} />
      </Drawer.Navigator> */}
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
    fontSize: 42,
    padding: 20,
  },
});
