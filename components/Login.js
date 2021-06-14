import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { Image } from "react-native";

const Login = ({ navigation }) => {
  const { isAuthenticated, googleLogin, myprofileId } =
    React.useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const authContext = React.useContext(AuthContext);

  const loginSubmit = () => {
    user.username = username;
    user.password = password;
    // setUser({
    //   ...user,
    //   username: username,
    //   password: password,
    // });
    console.log("username" + user.username);
    console.log("password" + user.password);
    if (Platform.OS === "ios") {
      // navigation.navigate("Home");
      console.log("IOS");
      // authContext.setIsAuthenticated(true);
      AuthService.login(user).then((data) => {
        console.log(data);
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          //   authContext.setGoogleLogin(false);
          authContext.setIsAuthenticated(isAuthenticated);
          console.log("Authenticated");
          // props.history.push("/");
          // navigation.navigate("Home");
        } else {
          setMessage(message);
          Alert.alert("Unauthorized", `${message.msgBody}`, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      });
    } else if (Platform.OS === "android") {
      // console.log("android");
      // authContext.setIsAuthenticated(true);
      AuthService.login(user).then((data) => {
        console.log(data);
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          //   authContext.setGoogleLogin(false);
          authContext.setIsAuthenticated(isAuthenticated);
          console.log("Authenticated");
          // props.history.push("/");
          // navigation.navigate("Home");
        } else {
          setMessage(message);
          Alert.alert("Unauthorized", `${message.msgBody}`, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      });
    } else {
      AuthService.login(user).then((data) => {
        console.log(data);
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          //   authContext.setGoogleLogin(false);
          authContext.setIsAuthenticated(isAuthenticated);
          console.log("Authenticated");
          // props.history.push("/");
          // navigation.navigate("Home");
        } else {
          setMessage(message);
          Alert.alert("Unauthorized", `${message.msgBody}`, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      });
    }
  };

  const registerSubmit = () => {
    user.username = username;
    user.password = password;
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "https://myacademiabe.herokuapp.com/user/register",
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      if (!message.msgError) {
        AuthService.login(user).then((data) => {
          console.log(data);
          const { isAuthenticated, user, message } = data;
          if (isAuthenticated) {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            console.log("Authenticated");
          }
        });
      } else {
        Alert.alert(
          "Unauthorized",
          `${message.msgBody}, Please use a different Username`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
      }
    });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginHeader}>
          <Text style={styles.heading}>Login</Text>
          <View style={{ paddingBottom: 15 }}>
            <Text style={styles.textLabel}>Username</Text>
            <TextInput
              style={styles.inputText}
              placeholder="username"
              name="username"
              onChangeText={(username) => setUsername(username)}
              defaultValue={username}
            />
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              style={styles.inputText}
              placeholder="password"
              name="password"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              defaultValue={password}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={loginSubmit}>
            <Text style={styles.buttonFont}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={registerSubmit}
          >
            <Text style={styles.buttonFont}>Register</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.logoDiv}>
        <Image
          style={styles.logoImage}
          source={require("../assets/LogoMain.jpeg")}
        />
      </View>
    </View>
  );
};

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
    paddingTop: 50,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 32,
    padding: 10,
    color: "#FFFFFF",
  },
  textwopadding: {
    fontSize: 26,
    paddingLeft: 10,
    color: "#FFFFFF",
  },
  textLabel: {
    fontSize: 22,
    padding: 20,
    color: "#FFFFFF",
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    color: "#00FF00",
    borderRadius: 10,
    marginHorizontal: 60,
    alignItems: "center",

    marginVertical: 10,
  },
  buttonFont: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginHeader: {
    backgroundColor: "#41B3A3",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  inputText: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#000000",
    marginHorizontal: 20,
    color: "#FFFFFF",
  },
  logoImage: {
    marginHorizontal: 20,
    marginVertical: 40,
    width: 330,
    height: 110,
    borderRadius: 10,
  },
  logoDiv: {
    shadowColor: "#000000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default Login;
