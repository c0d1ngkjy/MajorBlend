import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function registerUser(email, password, userData) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        setDoc(userRef, userData)
          .then(() => {
            console.log("User data added to Firestore successfully");
          })
          .catch((error) => {
            console.error("Error adding user data to Firestore: ", error);
          });
      }
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle error
    });
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}
