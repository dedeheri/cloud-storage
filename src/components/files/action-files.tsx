import React, { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  IconArrowsMove,
  IconDots,
  IconLetterCaseToggle,
  IconLoader2,
  IconRestore,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Card } from "../ui/card";

const formRenameFile = z.object({
  fileName: z.string().min(1, "Folder is required"),
});

interface Props {
  setSuccess: (prop: boolean) => void;
  action: string;
  data: any;
}

const ActionFiles = ({ data, action, setSuccess }: Props) => {
  // folder
  const [fetchFolder, setFetchFolder] = useState<[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  // loading
  const [loadingTrash, setLoadingTrash] = useState<boolean>(false);
  const [loadingStarred, setLoadingStarred] = useState<boolean>(false);
  const [loadingRename, setLoadingRename] = useState<boolean>(false);
  const [loadingRestore, setLoadingRestore] = useState<boolean>(false);
  const [loadingMove, setLoadingMove] = useState<boolean>(false);

  // fetch folder
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("/api/folder");
      setFetchFolder(response?.data?.data);
    };

    fetch();
  }, []);

  const handleTrash = async (id: string) => {
    try {
      setLoadingTrash(true);
      setSuccess(false);

      const response = await axios.put(`/api/files/trash?fileId=${id}`);
    } catch (error) {
      console.log(error);
      setLoadingTrash(false);
      setSuccess(false);
    } finally {
      setLoadingTrash(false);
      setSuccess(true);
    }
  };

  const handleStarred = async (id: string) => {
    try {
      setLoadingStarred(true);
      const response = await axios.put(`/api/files/starred?fileId=${id}`);

      toast({
        description: response?.data?.message,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(true);
      setLoadingStarred(false);
      toast({
        description:
          (error as any)?.response?.data?.message ||
          (error as any)?.response?.data?.error,
      });
    } finally {
      setSuccess(true);
      setLoadingStarred(false);
    }
  };

  const form = useForm<z.infer<typeof formRenameFile>>({
    resolver: zodResolver(formRenameFile),
    defaultValues: {
      fileName: data?.fileName,
    },
  });

  const handleRename = async (values: z.infer<typeof formRenameFile>) => {
    try {
      setSuccess(false);
      setLoadingRename(true);

      const response = await axios.put(`/api/files/rename?fileId=${data?.id}`, {
        fileName: values.fileName,
      });

      toast({
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        description: (response as any)?.data?.message,
      });
    } catch (error) {
      setSuccess(true);
      setLoadingRename(false);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setSuccess(true);
      setLoadingRename(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      setSuccess(false);
      setLoadingRestore(true);
      const response = await axios.put(`/api/trash?trashId=${id}&restore=file`);

      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      setSuccess(true);
      setLoadingRestore(false);
    } finally {
      setSuccess(true);
      setLoadingRestore(false);
    }
  };

  const handleMove = async (fileId: string) => {
    try {
      setSuccess(false);
      setLoadingMove(true);

      const response = await axios.put(
        `/api/files/move?fileId=${fileId}&folderId=${selectedFolder}`
      );

      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      setSuccess(true);
      setLoadingMove(false);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setSuccess(true);
      setLoadingMove(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          className="py-0 px-1 opacity-0 group-hover:opacity-100"
        >
          <IconDots className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1.5 dark:bg-neutral-900 ">
        {action === "trash" ? (
          <div className="space-y-0">
            <Button
              onClick={() => handleRestore(data?.id)}
              variant="ghost"
              className="flex w-full  px-2 items-center space-x-2 !justify-start"
            >
              <IconRestore className="w-4 h-4" />
              <span>Restore</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            <Button
              onClick={() => handleStarred(data?.id)}
              variant="ghost"
              className="flex w-full  px-2 items-center space-x-2 !justify-start"
            >
              <IconStar
                className={`w-4 h-4 ${
                  data?.starred ? "dark:text-yellow-600" : ""
                }`}
              />
              <span>{loadingStarred ? "Updated" : "Starred"} </span>
            </Button>
            {/* rename */}
            <Dialog>
              <DialogTrigger className="w-full">
                <Button
                  variant="ghost"
                  className="flex w-full px-2 items-center space-x-2 !justify-start"
                >
                  <IconLetterCaseToggle className="w-4 h-4" />
                  <span>Rename</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Rename Folder</DialogTitle>
                </DialogHeader>

                {/* form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleRename)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="fileName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Folder"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      {loadingRename ? (
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
                          Save
                        </Button>
                      )}
                    </DialogFooter>
                  </form>
                </Form>

                {/* end form */}
              </DialogContent>
            </Dialog>
            {/* end rename */}

            {/* move */}

            <Dialog>
              <DialogTrigger className="w-full">
                <Button
                  variant="ghost"
                  className="flex w-full px-2 items-center space-x-2 !justify-start"
                >
                  <IconArrowsMove className="w-4 h-4" />
                  <span>Move</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select Folder</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                  {fetchFolder?.map((folder: any) => (
                    <Card
                      className={`p-2 cursor-pointer dark:hover:bg-neutral-800 duration-300 ${
                        selectedFolder === folder?.id ? "dark:border-white" : ""
                      }`}
                      key={folder?.id}
                      onClick={() => setSelectedFolder(folder?.id)}
                    >
                      {folder?.folderName}
                    </Card>
                  ))}
                </div>

                <DialogFooter>
                  {loadingMove ? (
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
                      onClick={() => handleMove(data?.id)}
                      variant="secondary"
                      className="flex items-center space-x-1 w-32"
                    >
                      Move
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* end move */}

            <div className="border-b" />
            {/* trash */}
            <Dialog>
              <DialogTrigger className="w-full">
                <Button
                  variant="ghost"
                  className="flex w-full px-2 items-center space-x-2 !justify-start"
                >
                  <IconTrash className="w-4 h-4" />
                  <span>Trash</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    The folder that has been deleted will move to the trash, you
                    can restore it.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    onClick={() => handleTrash(data?.id)}
                    disabled={loadingTrash}
                    type="submit"
                    variant="default"
                    className="px-5 h-7"
                  >
                    {loadingTrash && (
                      <IconLoader2 className="w-5 h-5 animate-spin" />
                    )}
                    <span>Delete</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* end trash */}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ActionFiles;
