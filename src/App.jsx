import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";
import { Badge } from "./components/ui/badge";
import { useWords } from "./hooks/useWords";
import { NewWordDialog } from "./components/Form";
import { useState } from "react";

function App() {
  const words = useWords();
  const word = words[0] ? words[~~(Math.random() * words.length)] : {};
  const [actualWord, setActualWord] = useState(word);

  const shuffleWord = () => {
    while (true) {
      const newWord = words[~~(Math.random() * words.length)];
      if (newWord !== actualWord) {
        setActualWord(newWord);
        break;
      }
    }
  };

  const nextWord = () => {
    const currentIndex = words.findIndex((el) => el.word === actualWord.word);
    console.log(words[(currentIndex + 1) % words.length]);
    const nextWord = words[(currentIndex + 1) % words.length];
    setActualWord(nextWord);
  };

  const prevWord = () => {
    const currentIndex = words.findIndex((el) => el.word === actualWord.word);
    const prevWord = words[(currentIndex - 1 + words.length) % words.length];
    setActualWord(prevWord);
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <Card className="w-full mx-10 max-w-[400px]">
          <CardHeader className="space-y-0">
            <div className="flex justify-between">
              <CardTitle className="text-xl tracking-normal font-bold">
                {word.word}
              </CardTitle>
              <Badge variant="outline" className="font-bold rounded-full">
                {word.times}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {word?.date?.toDate().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-2 pl-3 italic">
              {word.meaning}
            </blockquote>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-0 mb-20 flex gap-x-4 w-full justify-center items-center">
        <Button variant="secondary" className="rounded-full aspect-square">
          <CheckIcon className="min-w-8" />
        </Button>
        <div className="flex gap-x-3.5 items-center">
          <Button
            onClick={prevWord}
            variant="outline"
            className="p-3 w-[56px] h-[56px] aspect-square border rounded-full"
          >
            <ArrowLeftIcon className="w-full h-full" />
          </Button>
          <Button
            onClick={shuffleWord}
            className="p-4 w-[70px] h-[70px] aspect-square border rounded-full"
          >
            <ShuffleIcon className="w-full h-full" />
          </Button>
          <Button
            onClick={nextWord}
            variant="outline"
            className="p-3 w-[56px] h-[56px] aspect-square border rounded-full"
          >
            <ArrowRightIcon className="w-full h-full" />
          </Button>
        </div>
        <NewWordDialog>
          <Button variant="secondary" className="rounded-full aspect-square ">
            <PlusIcon className="min-w-8" />
          </Button>
        </NewWordDialog>
      </div>
    </>
  );
}

export default App;
