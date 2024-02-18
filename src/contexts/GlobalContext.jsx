import { createContext, useContext, useEffect, useState } from "react";
import {
  addNewWord,
  allFromCollection,
  featureNewWord,
  getWordsCollection,
} from "../firebase/api.js";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [words, setWords] = useState();
  const [api, setApi] = useState();

  const newWord = async (word) => {
    const newWords = [...words, word];
    setWords(newWords);
    // addNewWord(await word);
  };

  const featureWord = () => {
    const index = api.selectedScrollSnap();
    const newWords = [...words];
    newWords[index].featured = !newWords[index]?.featured;
    setWords(newWords);
    featureNewWord(newWords[index].id);
  };

  useEffect(() => {
    const init = async () => {
      setWords(await allFromCollection(getWordsCollection()));
    };
    init();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ words, newWord, api, setApi, featureWord }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
