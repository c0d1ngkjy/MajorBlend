import { ref, reactive } from "vue";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function registerUser(email, password, userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      userData.uid = user.uid;

      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, userData);
      console.log("User data added to Firestore successfully");
    }

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error registering user:", errorMessage);
    throw error;
  }
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

export function checkAuthState() {
  const userData = reactive({ user: null });

  auth.onAuthStateChanged((user) => {
    userData.user = user;
  });

  return userData;
}

export function logoutUser() {
  return auth.signOut();
}
