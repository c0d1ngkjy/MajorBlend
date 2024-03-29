import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { firestore } from "../boot/firebase";

export async function incrementPostViews(bid, pid, uid) {
  try {
    const postRef = doc(firestore, "boards", bid, "posts", pid);

    const postDoc = await getDoc(postRef);
    const currentViews = postDoc.data().views || 0;

    const recentUids = postDoc.data().recentUids || [];
    if (recentUids.includes(uid)) {
      console.log("User has already incremented views for this post.");
      return;
    }

    const updatedViews = currentViews + 1;

    const updatedRecentUids = recentUids.slice(-9).concat(uid);

    await updateDoc(postRef, {
      views: updatedViews,
      recentUids: updatedRecentUids,
    });

    console.log("Post views incremented successfully!");
  } catch (error) {
    console.error("Error incrementing post views:", error);
    throw error;
  }
}

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
      console.log("Board created");
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
    createdDate: new Date(),
  };

  try {
    let docRef;
    let boardId = bid;

    if (postData.isMain) {
      const q = query(
        collection(firestore, "boards"),
        where("boardName", "==", "통합게시판")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const integrationBoardRef = querySnapshot.docs[0].ref;
        const integrationPostsRef = collection(integrationBoardRef, "posts");
        docRef = await addDoc(integrationPostsRef, post);
        boardId = integrationBoardRef.id;
      } else {
        console.log("통합게시판 board does not exist");
      }
    } else {
      const boardRef = doc(firestore, "boards", bid);
      const postsRef = collection(boardRef, "posts");
      docRef = await addDoc(postsRef, post);
    }

    await setDoc(docRef, { pid: docRef.id }, { merge: true });

    console.log("Post created");

    return { postId: docRef.id, boardId };
  } catch (error) {
    console.error("Error creating new post:", error);
    throw error;
  }
}

export async function getAllPosts(bid) {
  try {
    const boardRef = doc(firestore, "boards", bid);
    const postsRef = collection(boardRef, "posts");

    const querySnapshot = await getDocs(postsRef);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All post documents retrieved");

    return posts;
  } catch (error) {
    console.error("Error getting all post documents:", error);
    throw error;
  }
}

export async function getAllPostsFromIntegratedBoard() {
  try {
    const q = query(
      collection(firestore, "boards"),
      where("boardName", "==", "통합게시판")
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const integrationBoardRef = querySnapshot.docs[0].ref;

      const integrationPostsRef = collection(integrationBoardRef, "posts");

      const querySnapshotPosts = await getDocs(integrationPostsRef);

      const posts = querySnapshotPosts.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("All post documents from '통합게시판' retrieved");

      return posts;
    } else {
      console.log("통합게시판 board does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error getting all post documents from '통합게시판':", error);
    throw error;
  }
}

export async function getSinglePost(bid, pid) {
  try {
    const postRef = doc(firestore, "boards", bid, "posts", pid);

    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const postData = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      console.log("post doc retrieved");

      return postData;
    } else {
      console.log("Post document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting post document:", error);
    throw error;
  }
}

export async function getMainBoardId() {
  try {
    const q = query(
      collection(firestore, "boards"),
      where("boardName", "==", "통합게시판")
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      console.log("통합게시판 board does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting main board ID:", error);
    throw error;
  }
}

//comments
export async function addNewComment(bid, pid, commentData) {
  try {
    const commentsRef = collection(
      firestore,
      "boards",
      bid,
      "posts",
      pid,
      "comments"
    );

    const newComment = {
      userName: commentData.userName,
      content: commentData.content,
      createdDate: new Date(),
    };

    const docRef = await addDoc(commentsRef, newComment);

    console.log("New comment added successfully!");

    return docRef.id;
  } catch (error) {
    console.error("Error adding new comment:", error);
    throw error;
  }
}

export async function getAllComments(bid, pid) {
  try {
    const commentsRef = collection(
      firestore,
      "boards",
      bid,
      "posts",
      pid,
      "comments"
    );
    const querySnapshot = await getDocs(commentsRef);

    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("All comments retrieved successfully!");

    return comments;
  } catch (error) {
    console.error("Error getting all comments:", error);
    throw error;
  }
}
