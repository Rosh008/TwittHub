import { Box, Button } from "@mui/material";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { db, provider } from "../setupFirebase";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { AuthContext } from "../App";
import FlowLayout from "../components/FlowLayout";

export default function Home() {
  const auth = getAuth();
  const { authDetails, setAuth } = React.useContext(AuthContext);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        // The signed-in user info.
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          { oauthToken: token, tokenSec: secret },
          { merge: true }
        );
        setAuth({ user: user.uid, isConnected: true });
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        console.log("Something went wrong", error);

        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box
      height="90vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {!authDetails.isConnected ? (
        <Button onClick={signIn} variant="contained">
          Connect your twitter
        </Button>
      ) : (
        <FlowLayout />
      )}
    </Box>
  );
}
