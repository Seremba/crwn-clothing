import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCRod7y0vZhD2uRwDh4pH9hu0YSm8xuOF8",
    authDomain: "crwn-db-71c85.firebaseapp.com",
    databaseURL: "https://crwn-db-71c85.firebaseio.com",
    projectId: "crwn-db-71c85",
    storageBucket: "crwn-db-71c85.appspot.com",
    messagingSenderId: "25651775324",
    appId: "1:25651775324:web:07e959278fc7eda90e2399",
    measurementId: "G-B6E4HC9000"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();
    
   if(!snapShot.exists){
     const {displayName, email} = userAuth;
     const createdAt = new Date();
     try{
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     } catch(error){
        console.log('error creating user', error.message);
     }
   }
   return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;