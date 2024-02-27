import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../boot/firebase";

export async function getUserMajor(uid) {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const userMajor = userData.major;
      //console.log("User's major:", userMajor);
      return userMajor;
    } else {
      console.log("User document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting user major:", error);
    throw error;
  }
}

export async function getUserData(uid) {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      //console.log("User's data:", userData);
      return userData;
    } else {
      console.log("User document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

export async function addMajorBoardIdToUserData(uid, majorBoardId) {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, {
      majorBoardId: majorBoardId,
    });

    console.log("Major board ID added to user data");
  } catch (error) {
    console.error("Error adding major board ID to user data:", error);
    throw error;
  }
}
