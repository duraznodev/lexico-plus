import { createContext, useContext, useEffect, useState } from "react";
import {
  addNewWord,
  allFromCollection,
  getWordsCollection,
} from "../firebase/api.js";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [words, setWords] = useState();
  const [api, setApi] = useState();

  const newWord = async (word) => {
    const newWords = [...words, word];
    setWords(newWords);
    addNewWord(await word);
  };

  useEffect(() => {
    const init = async () => {
      setWords(await allFromCollection(getWordsCollection()));
    };
    init();
  }, []);

  return (
    <GlobalContext.Provider value={{ words, newWord, api, setApi }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
