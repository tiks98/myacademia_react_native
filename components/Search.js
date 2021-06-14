import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";

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
      url: "https://myacademiabe.herokuapp.com/search/firstName",
    }).then((data) => {
      // console.log(data);
      if (data.data === null) {
        console.log("No data found");
      } else {
        const item = [data.data];
        setProfiles(item[0]);
        // console.log(profiles);
        setGotResults(true);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.text}>Search</Text>
        <View style={styles.searchbar}>
          <TextInput
            style={{
              height: 40,
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderColor: "#000000",
              marginBottom: 10,
              justifyContent: "flex-start",
              flex: 4,
            }}
            placeholder="firstname"
            onChangeText={(firstname) => {
              setFirstname(firstname);
              setGotResults(false);
            }}
            defaultValue={firstname}
          />
          {gotResults ? null : getSearchResults()}
          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              flex: 1,
              alignItems: "center",
              borderRadius: 64,
              backgroundColor: "#6d2aff",
              marginRight: 10,
              height: 68,
            }}
          >
            <Icon
              raised
              name="search"
              color="#FFFFFF"
              size={40}
              onPress={getSearchResults}
            />
          </TouchableOpacity>
          {/* <Button
            title="Search"
            onPress={getSearchResults}
            style={{ justifyContent: "flex-end", flex: 1 }}
          /> */}
        </View>
        <ScrollView>
          <View style={{ backgroundColor: "#FFFFFF", marginBottom: 120 }}>
            {profiles.map((profile) => (
              <View key={profile._id} style={styles.listContent}>
                <ListItem
                  onPress={() =>
                    navigation.navigate("Profile", {
                      username: profile.username,
                    })
                  }
                >
                  {profile.photoUrl === "" ? (
                    <Avatar
                      rounded
                      icon={{ name: "user", type: "font-awesome" }}
                      containerStyle={{
                        backgroundColor: "#838383",
                        margin: 10,
                      }}
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
                    <ListItem.Title style={{ paddingVertical: 5 }}>
                      {profile.firstName} {profile.lastName}
                    </ListItem.Title>
                    <ListItem.Subtitle>{profile.location}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    margin: 10,
  },
  listContent: {
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
  },
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});

export default Search;
