import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO4Irzn1CHagaCPVDa7J9jHML0eHFEnuY",
  authDomain: "crown-clothing-db-e60a7.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-e60a7.firebaseio.com",
  projectId: "crown-clothing-db-e60a7",
  storageBucket: "crown-clothing-db-e60a7.appspot.com",
  messagingSenderId: "138679669734",
  appId: "1:138679669734:web:b46520055dbceb2cbdbc27",
  measurementId: "G-09F56J65T4",
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
