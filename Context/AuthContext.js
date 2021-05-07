import React, { createContext, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import AuthService from "../Services/AuthService";

export const AuthContext = React.createContext();

// export default ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [myprofileId, setMyProfileId] = useState(null);
//   const [googleLogin, setGoogleLogin] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     AuthService.isAuthenticated().then((data) => {
//       setUser(data.user);
//       setMyProfileId(data.myprofileId);
//       setGoogleLogin(data.googleLogin);
//       setIsAuthenticated(data.isAuthenticated);
//       setIsLoaded(true);
//     });
//   }, []);

//   return (
//     <View>
//       {!isLoaded ? (
//         <Text>Loading</Text>
//       ) : (
//         <AuthContext.Provider
//           value={{
//             user,
//             setUser,
//             isAuthenticated,
//             setIsAuthenticated,
//             googleLogin,
//             setGoogleLogin,
//             myprofileId,
//             setMyProfileId,
//           }}
//         >
//           {children}
//         </AuthContext.Provider>
//       )}
//     </View>
//   );
// };
