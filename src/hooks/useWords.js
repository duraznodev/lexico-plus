import { useState } from "react";
import { allFromCollection, getWordsCollection } from "../firebase/api.js";
import { useEffect } from "react";

export function useWords() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const init = async () => {
      const words = await allFromCollection(getWordsCollection());
      setWords(words);
    };
    init();
  }, []);

  return words;
}
