import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import Axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Avatar } from "react-native-elements";

function MyProfile({ navigation }) {
  const { isAuthenticated, user, googleLogin, myprofileId } =
    React.useContext(AuthContext);
  const [text, setText] = useState("");
  const [profile, setProfile] = useState({
    id: "",
    photoUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    collegeName: "",
    location: "",
    IQ: 0,
    about: "",
    isFaculty: false,
    friends: [],
  });
  const [username, setUsername] = useState("");
  const [haveprofile, setHaveProfile] = useState(false);

  useEffect(() => {
    const username = user.username;
    Axios({
      method: "GET",
      params: {
        username: username,
      },
      url: "https://myacademiabe.herokuapp.com/profile",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Profile data found");
      } else {
        setProfile({
          ...profile,
          id: data.data._id,
          photoUrl: data.data.photoUrl,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          username: data.data.username,
          email: data.data.email,
          collegeName: data.data.collegeName,
          location: data.data.location,
          IQ: data.data.IQ,
          about: data.data.about,
          isFaculty: data.data.isFaculty,
          friends: data.data.friends,
        });
        setHaveProfile(true);
        console.log("profile of " + username);
      }
    });
  }, []);

  return (
    <View>
      {isAuthenticated ? null : <Redirect to="Login" />}
      <Text style={styles.heading}>My Profile</Text>
      {!haveprofile ? (
        <View>
          <Text style={styles.text}>Please Create your profile</Text>
          <Button
            title="Create Profile"
            onPress={() => navigation.navigate("CreateProfile")}
          />
        </View>
      ) : (
        <View>
          {profile.photoUrl === "" ? (
            <Avatar
              rounded
              size="xlarge"
              icon={{ name: "user", type: "font-awesome" }}
              containerStyle={{ backgroundColor: "#838383", margin: 10 }}
            />
          ) : (
            <Avatar
              containerStyle={styles.avatarPhoto}
              rounded
              size="xlarge"
              source={{ uri: `${profile.photoUrl}` }}
            />
          )}
          <Text style={styles.text}>
            Name: {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.textwopadding}>{profile.collegeName}</Text>
          <Text style={styles.textwopadding}>{profile.location}</Text>
          <Text style={styles.textwopadding}>IQ: {profile.IQ}</Text>
          {profile.isFaculty ? (
            <Text style={styles.textwopadding}>Education Faculty</Text>
          ) : (
            <Text style={styles.textwopadding}>Student</Text>
          )}
          <Button
            title="see friend's list"
            onPress={() =>
              navigation.navigate("FriendsList", {
                friendsList: profile.friends,
              })
            }
          />
        </View>
      )}
    </View>
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
  text: {
    fontSize: 32,
    padding: 10,
  },
  textwopadding: {
    fontSize: 26,
    paddingLeft: 10,
  },
  avatarPhoto: {
    marginLeft: 15,
  },
});

export default MyProfile;
