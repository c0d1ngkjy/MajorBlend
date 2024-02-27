import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { firestore } from "../boot/firebase";

export async function checkOrCreateBoard(major) {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "boards"), where("boardName", "==", major))
    );

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      const boardRef = await addDoc(collection(firestore, "boards"), {
        boardName: major,
      });
      console.log("Board created successfully!");
      return boardRef.id;
    }
  } catch (error) {
    console.error("Error checking or creating board:", error);
    throw error;
  }
}

export async function createNewPost(uid, bid, postData) {
  const post = {
    views: 0,
    uid: uid,
    userName: postData.userName,
    title: postData.title,
    content: postData.content,
  };

  try {
    const boardRef = doc(firestore, "boards", bid);
    const postsRef = collection(boardRef, "posts");

    const docRef = await addDoc(postsRef, post);

    console.log("Post created successfully!");

    return docRef.id;
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
}
