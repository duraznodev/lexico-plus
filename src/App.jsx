import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Toggle } from "@/components/ui/toggle";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
  ShuffleIcon,
  StarIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { NewWordDialog } from "./components/Form";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Badge } from "./components/ui/badge";
import { GlobalProvider, useGlobal } from "./contexts/GlobalContext";

function App() {
  const global = useGlobal();
  const { words, api, setApi, featureWord } = global || {};

  const shuffleWord = () => {
    while (true) {
      const newWordIndex = ~~(Math.random() * words.length);
      if (api.selectedScrollSnap() !== newWordIndex) {
        api.scrollTo(newWordIndex);
        break;
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      api?.scrollTo(words.length - 1);
    });
  }, [words?.length]);

  const nextWord = () => {
    api.scrollNext();
  };

  const prevWord = () => {
    api.scrollPrev();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <span className="text-xl font-extrabold">Léxico+</span>
          <ModeToggle />
        </div>
      </div>

      <div className="flex-1 px-4 flex justify-center items-center">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {words ? (
              words.map((word, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full max-w-[400px]">
                    <CardHeader className="space-y-0">
                      <div className="flex justify-between">
                        <CardTitle className="text-xl tracking-normal font-bold">
                          {word.word}
                        </CardTitle>
                        <div className="h-7 flex items-center">
                          {/* <Badge
                            variant="outline"
                            className="font-bold rounded-full flex justify-center aspect-square"
                          >
                            {word.times}
                          </Badge> */}
                          <Button variant="ghost" onClick={featureWord}>
                            {word?.featured ? (
                              <StarFilledIcon className="h-5 w-5" />
                            ) : (
                              <StarIcon className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
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
                </CarouselItem>
              ))
            ) : (
              <Card className="w-full px-4 max-w-[400px] animate-pulse">
                <CardHeader className="space-y-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl tracking-normal font-bold">
                      <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="font-bold rounded-full p-2"
                    >
                      <div className="aspect-square h-3 bg-gray-200 rounded-full"></div>
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">
                    <div className="h-3 bg-gray-200 rounded-md w-24"></div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-2 pl-3 italic flex flex-col gap-y-2">
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                  </blockquote>
                </CardContent>
              </Card>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center items-center gap-x-4 w-full mb-20">
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
    </div>
  );
}

export default App;
