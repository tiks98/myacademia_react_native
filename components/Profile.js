import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { Avatar } from "react-native-elements";
import { AuthContext } from "../Context/AuthContext";

const Profile = ({ route }) => {
  const { isAuthenticated, user, googleLogin, myprofileId } =
    React.useContext(AuthContext);
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
  const [friends, setFriends] = useState([]);
  const [isFriends, setIsFriends] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [message, setMessage] = useState(null);
  const [friendship, setFriendship] = useState({
    requester: "",
    recipient: "",
    status: 0,
  });
  const [myProfileID, setMyProfileId] = useState({
    mypid: "",
    firstName: "",
    lastName: "",
  });
  const [gotStatus, setGotStatus] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      params: {
        username: route.params.username,
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
      }
    });
    Axios({
      method: "GET",
      url: "https://myacademiabe.herokuapp.com/profile",
      params: {
        username: user.username,
      },
    }).then((data) => {
      if (data.data === null) {
        console.log("No Profile data found");
      } else {
        setMyProfileId({
          ...myProfileID,
          mypid: data.data._id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        });
      }
    });
  }, []);

  const getFriendshipStatus = () => {
    Axios({
      method: "GET",
      url: "https://myacademiabe.herokuapp.com/getfriends/status",
      params: {
        requester: user.username,
        recipient: profile.username,
      },
    }).then((data) => {
      if (data.data.length === 0) {
        console.log("No Friendship Found");
      } else {
        const item = data.data[0];
        console.log(item);
        if (item.status === 2) {
          setIsFriends(true);
        }
        setFriends(item);
        setGotStatus(true);
      }
    });
    if (friends.requester !== user.username) {
      Axios({
        method: "GET",
        url: "https://myacademiabe.herokuapp.com/getfriends/status",
        params: {
          requester: profile.username,
          recipient: user.username,
        },
      }).then((data) => {
        if (data.data.length === 0) {
          console.log("No Friendship Found");
        } else {
          const item = data.data[0];
          console.log(item);
          if (item.status === 2) {
            setIsFriends(true);
          }
          setFriends(item);
          setGotStatus(true);
        }
      });
      console.log("My Profile Id: " + myprofileId);
    }
  };

  const sendRequest = () => {
    Axios({
      method: "post",
      data: {
        requester: user.username,
        recipient: profile.username,
        status: 1,
      },
      url: "https://myacademiabe.herokuapp.com/sendfriendrequest",
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      setRequestSent(true);
    });
    Axios({
      method: "put",
      data: {
        notification: `${myProfileID.firstName} ${myProfileID.lastName} has sent you friend request`,
        link: `${user.username}`,
      },
      url: `https://myacademiabe.herokuapp.com/addnotification/${profile.id}`,
    }).then((data) => {
      console.log(data.data);
      //   setNotificationPopUp({
      //     ...notificationPopUp,
      //     title: "Friend Request Sent",
      //     message: `You have sent a friend request to ${profile.firstName} ${profile.lastName}`,
      //     type: "info",
      //   });
      console.log("Friend Request sent");
      // setTimeout(() => {
      //   reloadPage();
      // }, 2000);
    });
  };

  const acceptRequest = () => {
    const friendshipId = friends._id;
    const url = "https://myacademiabe.herokuapp.com/updaterequest/";
    const dynamicUrl = url + friendshipId;
    Axios({
      method: "put",
      data: {
        status: 2,
      },
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      setIsFriends(true);
      // setTimeout(() => {
      //   reloadPage();
      // }, 2000);
    });
    // if(friends.requester === user.username)
    const profileId = profile.id;
    const url2 = "https://myacademiabe.herokuapp.com/addfprofile/";
    const requesterUrl = url2 + profileId;
    console.log(profileId);
    console.log(requesterUrl);
    Axios({
      method: "put",
      params: {
        friend: friends.recipient,
      },
      url: requesterUrl,
    }).then((data) => {
      console.log(data.data);
    });
    const recipientId = myProfileID.mypid;
    console.log(recipientId);
    const recipientUrl = url2 + recipientId;
    console.log(recipientUrl);
    Axios({
      method: "put",
      params: {
        friend: friends.requester,
      },
      url: recipientUrl,
    }).then((data) => {
      console.log(data.data);
    });
    Axios({
      method: "put",
      data: {
        notification: `${myProfileID.firstName} ${myProfileID.lastName} has accepted your friend request`,
        link: `${friends.recipient}`,
      },
      url: `https://myacademiabe.herokuapp.com/addnotification/${profile.id}`,
    }).then((data) => {
      console.log(data.data);
      //   setNotificationPopUp({
      //     ...notificationPopUp,
      //     title: "Friend Request Accepted",
      //     message: `You have accepted a friend request from ${profile.firstName} ${profile.lastName}`,
      //     type: "success",
      //   });
      console.log("Friend Request Accepted");
    });
  };

  const cancelRequest = () => {
    if (friends === null) {
      console.log("No friend data found");
    } else {
      const friendshipId = friends._id;
      const url = "https://myacademiabe.herokuapp.com/deleterequest/";
      const dynamicUrl = url + friendshipId;
      Axios({
        method: "delete",
        url: dynamicUrl,
      }).then((data) => {
        const { message } = data.data;
        setMessage(message);
        console.log(message);
        // reloadPage();
      });
      const profileId = profile.id;
      const staticurl = "https://myacademiabe.herokuapp.com/rffprofile/";
      const requesterUrl = staticurl + profileId;
      console.log(profileId);
      console.log(requesterUrl);
      Axios({
        method: "put",
        params: {
          friend: friends.recipient,
        },
        url: requesterUrl,
      }).then((data) => {
        console.log(data.data);
      });
      const recipientId = myProfileID.mypid;
      console.log(recipientId);
      const recipientUrl = staticurl + recipientId;
      console.log(recipientUrl);
      Axios({
        method: "put",
        params: {
          friend: friends.requester,
        },
        url: recipientUrl,
      }).then((data) => {
        console.log(data.data);
      });
      if (friends.status === 2) {
        // setNotificationPopUp({
        //   ...notificationPopUp,
        //   title: "Connection Removed",
        //   message: `You have removed your connection with ${profile.firstName} ${profile.lastName}`,
        //   type: "danger",
        // });
        console.log("Connection Removed");
        // setTimeout(() => {
        //   reloadPage();
        // }, 1000);
      } else {
        // setNotificationPopUp({
        //   ...notificationPopUp,
        //   title: "Friend Request Canceled",
        //   message: `You have canceled a friend request from ${profile.firstName} ${profile.lastName}`,
        //   type: "danger",
        // });
        console.log("Friend Request Canceled");
        // setTimeout(() => {
        //   reloadPage();
        // }, 1000);
      }
    }
  };

  return (
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
      {!gotStatus ? getFriendshipStatus() : null}
      {isFriends ? (
        <Button title="Remove Connection" />
      ) : (
        <View>
          {friends.status === 1 ? (
            <View>
              {friends.requester === user.username ? (
                <Button title="Cancel Request" onPress={cancelRequest} />
              ) : (
                <View>
                  <Button title="Accept Request" onPress={acceptRequest} />
                  <Button title="Delete Request" onPress={cancelRequest} />
                </View>
              )}
            </View>
          ) : (
            <View>
              <Button title="Send Request" onPress={sendRequest} />
            </View>
          )}
        </View>
      )}
      {message === null ? null : <Text>{message.msgBody}</Text>}
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

export default Profile;
