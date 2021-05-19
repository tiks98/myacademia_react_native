import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

const CreateProfile = () => {
  const [enableShift, setEnableShift] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      enabled={enableShift}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.heading}>Create Profile</Text>

            <Text style={styles.textLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              name="firstName"
              onChangeText={(firstName) => setFirstName(firstName)}
              defaultValue={firstName}
            />
            <Text style={styles.textLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              name="lastName"
              onChangeText={(lastName) => setLastName(lastName)}
              defaultValue={lastName}
            />
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="abc@example.com"
              name="email"
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              defaultValue={email}
            />
            <Text style={styles.textLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Location"
              name="location"
              onFocus={() => setEnableShift(true)}
              onChangeText={(location) => setLocation(location)}
              defaultValue={location}
            />
            <View style={styles.btnContainer}>
              <Button title="Submit" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //   inner: {
  //     flex: 1,
  //   },
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
  textLabel: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 12,
  },
});

export default CreateProfile;
