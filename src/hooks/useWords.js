import { useState } from "react";
import { allFromCollection, getWords } from "../firebase/api.js";
import { useEffect } from "react";

export function useWords() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const init = async () => {
      const words = await allFromCollection(getWords());
      setWords(words);
    };
    init();
  }, []);

  return words;
}
