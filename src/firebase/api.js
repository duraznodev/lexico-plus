import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebase_db } from "./config";

export const getWordsCollection = () => collection(firebase_db, "words");

export const addNewWord = (data) => addDoc(getWordsCollection(), data);

export const allFromCollection = async (collection) => {
  return (await getDocs(collection)).docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    .sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });
};

export const updateInCollection = async (
  collection_name,
  id,
  updatedFields,
  farm_id
) => {
  const animalRef = doc(firebase_db, `farms/${farm_id}/${collection_name}`, id);
  try {
    await updateDoc(animalRef, updatedFields);
    return { success: true };
  } catch (error) {
    // console.error('Error updating document:', error);
    return { success: false, error };
  }
};
