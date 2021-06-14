import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

const CreateProfile = () => {
  const [enableShift, setEnableShift] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [collegeName, setCollegeName] = useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={enableShift}
    >
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
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
              <Text style={styles.textLabel}>College Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="College Name"
                name="collegeName"
                onFocus={() => setEnableShift(true)}
                onChangeText={(collegeName) => setCollegeName(collegeName)}
                defaultValue={collegeName}
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
              <Text style={styles.textLabel}>About</Text>
              <TextInput
                style={styles.textInputAbout}
                placeholder="About"
                name="about"
                onChangeText={(about) => setAbout(about)}
                defaultValue={about}
                multiline
                numberOfLines={4}
                maxLength={400}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.buttonSubmit}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    paddingBottom: 80,
  },
  heading: {
    fontSize: 36,
    marginBottom: 20,
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
    paddingVertical: 10,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  textInputAbout: {
    height: 100,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  btnContainer: {
    marginTop: 12,
  },
  buttonSubmit: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#32CD32",
    color: "#FFFFFF",
    borderRadius: 20,
  },
});

export default CreateProfile;
