"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IconFolderPlus, IconLoader2 } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "./ui/use-toast";

import axios from "axios";

const formAddFolderSchema = z.object({
  folderName: z.string().min(1, "Folder is required"),
});

export const AddFolders = ({ success }: any) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formAddFolderSchema>>({
    resolver: zodResolver(formAddFolderSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formAddFolderSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/folder", {
        folderName: values.folderName,
      });

      setOpen(false);

      success(true);
      // location.reload();

      toast({
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        description: (response as any)?.data?.message,
      });
    } catch (error) {
      setLoading(false);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="items-center rounded-xl  dark:text-white text-black  h-[4rem] lg:h-[4.5rem] w-full md:w-40 border-dashed border flex justify-start dark:border-neutral-500"
        >
          <div className="space-y-1 lg:space-y-2">
            <IconFolderPlus className="w-5 h-5" />
            <h1 className="text-md">Create Folder</h1>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Folder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              {loading ? (
                <Button
                  disabled
                  variant="secondary"
                  className="flex items-center space-x-1 w-32"
                >
                  <IconLoader2 className="w-5 h-5 animate-spin " />
                  <span>Processing</span>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="flex items-center space-x-1 w-32"
                >
                  Create
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
