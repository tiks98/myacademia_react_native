import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const FriendsList = ({ route, navigation }) => {
  return (
    <View>
      <Text style={styles.heading}>Friend's Usernames</Text>

      {route.params.friendsList.map((friend) => (
        <View key={friend}>
          <ListItem>
            <Avatar
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              containerStyle={{ backgroundColor: "#838383", margin: 10 }}
              size="medium"
            />
            {/* <Text style={styles.text} key={friend}>
            UserName:{friend}
          </Text> */}
            <ListItem.Content>
              <ListItem.Title
                style={styles.text}
                onPress={() =>
                  navigation.navigate("Profile", { username: friend })
                }
              >
                {friend}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      ))}
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
});

export default FriendsList;
