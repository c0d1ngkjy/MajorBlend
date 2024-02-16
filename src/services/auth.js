import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../boot/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function registerUser(email, password, userData) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // Push user data to Firestore
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
export function signIn(email, password) {
  auth
    .signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
