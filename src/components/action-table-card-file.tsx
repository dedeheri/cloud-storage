import React, { useEffect, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  IconArrowsMove,
  IconDots,
  IconLetterCaseToggle,
  IconLoader2,
  IconRestore,
  IconStar,
  IconTrash,
  IconTrashX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Skeleton } from "./ui/skeleton";

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
  const [loadingFetchFolder, setLoadingFetchFolder] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  // loading
  const [loadingTrash, setLoadingTrash] = useState<boolean>(false);
  const [loadingStarred, setLoadingStarred] = useState<boolean>(false);
  const [loadingRename, setLoadingRename] = useState<boolean>(false);
  const [loadingRestore, setLoadingRestore] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingMove, setLoadingMove] = useState<boolean>(false);

  // open folder
  const [openMove, setOpenMove] = useState<boolean>(false);

  // fetch folder
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingFetchFolder(true);
        const response = await axios.get("/api/folder");
        setFetchFolder(response?.data?.data);
      } catch (error) {
        setLoadingFetchFolder(false);
        console.log(error);
      } finally {
        setLoadingFetchFolder(false);
      }
    };

    openMove && fetch();
  }, [openMove]);

  const handleTrash = async (id: string, type: string) => {
    try {
      setLoadingTrash(true);
      setSuccess(false);

      const response = await axios.put(
        `/api/files/trash?fileId=${id}&type=${type}`
      );
      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      toast({
        description:
          (error as any)?.response?.data?.message ||
          (error as any)?.response?.data?.error,
      });
      setLoadingTrash(false);
      setSuccess(false);
    } finally {
      setLoadingTrash(false);
      setSuccess(true);
    }
  };

  const handleStarred = async (id: string, type: string) => {
    try {
      setLoadingStarred(true);
      const response = await axios.put(
        `/api/files/starred?fileId=${id}&type=${type}`
      );

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

      const response = await axios.put(
        `/api/files/rename?fileId=${data?.id}&type=${data?.type}`,
        {
          fileName: values.fileName,
        }
      );

      toast({
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

  const handleRestore = async (id: string, type: string) => {
    try {
      setSuccess(false);
      setLoadingRestore(true);
      const response = await axios.put(
        `/api/trash/restore?trashId=${id}&type=${type}`
      );

      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      toast({
        description: (error as any)?.response?.data?.message,
      });
      setSuccess(false);
      setLoadingRestore(false);
    } finally {
      setSuccess(true);
      setLoadingRestore(false);
    }
  };

  const handeDelete = async (id: string, type: string) => {
    try {
      setSuccess(false);
      setLoadingDelete(true);
      const response = await axios.get(
        `/api/trash/delete?trashId=${id}&type=${type}`
      );

      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      toast({
        description: (error as any)?.response?.data?.message,
      });
      setSuccess(false);
      setLoadingDelete(false);
    } finally {
      setSuccess(true);
      setLoadingDelete(false);
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
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button className="px-2 p-0 opacity-0 group-hover:opacity-100 duration-300">
              <IconDots className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Action</p>
          </TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1.5 dark:bg-neutral-900 mr-4">
        {action === "trash" ? (
          <div className="space-y-0">
            <Button
              disabled={loadingRestore}
              onClick={() => handleRestore(data?.id, data?.type)}
              variant="ghost"
              className="flex w-full  px-2 items-center space-x-2 !justify-start"
            >
              <IconRestore className="w-4 h-4" />
              {loadingRestore ? (
                <span className="animate-pulse">Updated...</span>
              ) : (
                <span>Restore</span>
              )}
            </Button>

            <Button
              disabled={loadingDelete}
              onClick={() => handeDelete(data?.id, data?.type)}
              variant="ghost"
              className="flex w-full  px-2 items-center space-x-2 !justify-start"
            >
              <IconTrashX className="w-4 h-4" />
              {loadingDelete ? (
                <span className="animate-pulse">Updated...</span>
              ) : (
                <span>Delete</span>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-0">
            {/* starred */}
            <Button
              onClick={() => handleStarred(data?.id, data?.type)}
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
                              defaultValue={data?.name}
                              placeholder="Name"
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

            {/* move */}
            {data?.type !== "folders" && (
              <Dialog open={openMove} onOpenChange={setOpenMove}>
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
                    {loadingFetchFolder
                      ? [...Array(5)].map((_, i) => (
                          <Skeleton key={i} className="h-10 w-full" />
                        ))
                      : fetchFolder?.map((folder: any) => (
                          <Card
                            className={`p-2 cursor-pointer dark:hover:bg-neutral-800 duration-300 ${
                              selectedFolder === folder?.id
                                ? "dark:border-white"
                                : ""
                            }`}
                            key={folder?.id}
                            onClick={() => setSelectedFolder(folder?.id)}
                          >
                            {folder?.name}
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
            )}

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
                    onClick={() => handleTrash(data?.id, data?.type)}
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
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ActionFiles;
