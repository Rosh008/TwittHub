import React from 'react';
import './App.css';
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { db, provider } from './setupFirebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

function App() {

const auth = getAuth();
const [accountConnected, setAccountConnected] = React.useState(false);
const [tweetText, setTweetText] = React.useState('');
const [tokenData, setTokenData] = React.useState({});
const [currUser, setCurrUser] = React.useState('');

const signIn = () => {
  signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;
    setTokenData({token: token, secret: secret});
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, 
      {oauthToken: token, tokenSec: secret}, { merge: true }
    );
    // IdP data available using getAdditionalUserInfo(result)
    setAccountConnected(true);
    setCurrUser(user.uid);
  }).catch((error) => {
    console.log("Something went wrong");

    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
  });
}

const onTweetSend = async () => {
    try{
      // console.log(tokenData)
      // const response = await getRequest(tokenData.token, tokenData.secret, tweetText);
      // console.log(response)
      await addDoc(collection(db, "tweets"), {
       uid: currUser,
       status: 'pending',
       tweet: tweetText,
       time: new Date()
      });
      
    }catch(e){
      console.log(e);
      // console.log("Something went wrong");
    }
}

  return (
    <div className='container'>
      {accountConnected ? 'Connected' : <button onClick={signIn}>Connect to twitter !!</button>}
      <div>
        <p>Tweet:</p>
        <textarea onChange={(e) => setTweetText(e.target.value)} value={tweetText} name="Comment"/>
        <button onClick={onTweetSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
