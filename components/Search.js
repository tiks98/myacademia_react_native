import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { ScrollView } from "react-native";

const Search = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [gotResults, setGotResults] = useState(false);

  const getSearchResults = () => {
    Axios({
      method: "GET",
      params: {
        firstName: firstname,
      },
      url: "http://192.168.126.1:4000/search/firstName",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No data found");
      } else {
        const item = [data.data];
        setProfiles(item[0]);
        console.log(profiles);
        setGotResults(true);
      }
    });
  };

  return (
    <View>
      <Text style={styles.text}>Firstname</Text>
      <TextInput
        style={{ height: 40, marginHorizontal: 15 }}
        placeholder="firstname"
        onChangeText={(firstname) => setFirstname(firstname)}
        defaultValue={firstname}
      />
      {gotResults ? null : getSearchResults()}
      <Button title="Search" onPress={getSearchResults} />
      <ScrollView>
        {profiles.map((profile) => (
          <View key={profile._id}>
            <ListItem
              onPress={() =>
                navigation.navigate("Profile", { username: profile.username })
              }
            >
              {profile.photoUrl === "" ? (
                <Avatar
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#838383", margin: 10 }}
                  size="medium"
                />
              ) : (
                <Avatar
                  containerStyle={styles.avatarPhoto}
                  rounded
                  size="medium"
                  source={{ uri: `${profile.photoUrl}` }}
                />
              )}
              <ListItem.Content>
                <ListItem.Title>
                  {profile.firstName} {profile.lastName}
                </ListItem.Title>
                <ListItem.Subtitle>{profile.location}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
        ))}
      </ScrollView>
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

export default Search;
