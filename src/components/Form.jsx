import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGlobal } from "@/contexts/GlobalContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function NewWordDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const closeRef = React.useRef(null);

  const closeDrawer = () => {
    closeRef.current.click();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva palabra</DialogTitle>
          </DialogHeader>
          <ProfileForm className="pt-2" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Nueva palabra</DrawerTitle>
        </DrawerHeader>
        <ProfileForm closeDrawer={closeDrawer} className="px-4 pt-2" />
        <DrawerFooter className="pt-2">
          <DrawerClose ref={closeRef} asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, closeDrawer }) {
  const { newWord } = useGlobal();

  const formSchema = z.object({
    word: z.string().min(1, "Este campo es requerido."),
    meaning: z.string().min(1, "Este campo es requerido."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      meaning: "",
    },
  });

  function onSubmit(values) {
    const wordValues = {
      ...values,
      date: Timestamp.now(),
      times: 0,
    };
    newWord(wordValues);
    closeDrawer && closeDrawer();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="flex flex-col gap-y-4 mb-1.5">
          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Palabra</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu palabra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Significado</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingresa su significado"
                    className="resize-none h-16"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
