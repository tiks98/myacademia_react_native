import React, { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const Login = ({ navigation }) => {
  const { isAuthenticated, googleLogin, myprofileId } = React.useContext(
    AuthContext
  );
  const [user, setUser] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const authContext = React.useContext(AuthContext);

  //   const onChange = (e) => {
  //     // e.preventDefault();
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

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
          navigation.navigate("Home");
        } else setMessage(message);
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
        } else setMessage(message);
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
        } else setMessage(message);
      });
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.textLabel}>Username</Text>
      <TextInput
        style={{ height: 40, paddingHorizontal: 20 }}
        placeholder="username"
        name="username"
        onChangeText={(username) => setUsername(username)}
        defaultValue={username}
      />
      <Text style={styles.textLabel}>Password</Text>
      <TextInput
        style={{ height: 40, paddingHorizontal: 20 }}
        placeholder="password"
        name="password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        defaultValue={password}
      />
      <Button
        title="submit"
        style={styles.submitButton}
        onPress={loginSubmit}
      />
      {message === null ? (
        <Text></Text>
      ) : (
        // <Text style={styles.textwopadding}>{message.msgBody}</Text>
        <Text>Not allowed</Text>
      )}
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
  },
  text: {
    fontSize: 32,
    padding: 10,
  },
  textwopadding: {
    fontSize: 26,
    paddingLeft: 10,
  },
  textLabel: {
    fontSize: 22,
    padding: 20,
  },
  submitButton: {
    fontSize: 18,
    padding: 20,
    backgroundColor: "#00FF00",
    color: "#00FF00",
  },
});

export default Login;
