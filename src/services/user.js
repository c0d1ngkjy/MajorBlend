import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../boot/firebase";

export async function getUserMajor(uid) {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const userMajor = userData.major;
      console.log("User's major:", userMajor);
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
