import React, { useState } from "react";

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
import { Input } from "../ui/input";
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

const formRenameFolder = z.object({
  folderName: z.string().min(1, "Folder is required"),
});

interface Props {
  id: string;
  starred: boolean;
  folderName: string;
  action: string;
  setSuccess: (value: boolean) => void;
}

const ActionFolder = ({
  id,
  starred,
  setSuccess,
  action,
  folderName,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRename, setRoadingRename] = useState<boolean>(false);
  const [loadingStarred, setLoadingStarred] = useState<boolean>(false);
  const [loadingRestore, setLoadingRestore] = useState<boolean>(false);

  const handleMoveTrash = async (id: string) => {
    try {
      setLoading(true);

      const response = await axios.put(`/api/folder?folderId=${id}`);

      toast({
        description: response?.data?.message,
      });
      setSuccess(true);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStarred = async (id: string) => {
    try {
      setLoadingStarred(true);
      const response = await axios.put(`/api/folder/starred?folderId=${id}`);

      toast({
        description: response?.data?.message,
      });
      setSuccess(true);
    } catch (error) {
      setLoadingStarred(false);
    } finally {
      setLoadingStarred(false);
    }
  };

  const form = useForm<z.infer<typeof formRenameFolder>>({
    resolver: zodResolver(formRenameFolder),
    defaultValues: {
      folderName: folderName,
    },
  });

  const handleRenameFolder = async (
    values: z.infer<typeof formRenameFolder>
  ) => {
    try {
      setSuccess(false);
      setRoadingRename(true);

      const response = await axios.put(`/api/folder/rename?folderId=${id}`, {
        folderName: values.folderName,
      });

      toast({
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        description: (response as any)?.data?.message,
      });
    } catch (error) {
      setSuccess(true);
      setRoadingRename(false);
      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setSuccess(true);
      setRoadingRename(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      setSuccess(false);
      setLoadingRestore(true);
      const response = await axios.put(
        `/api/trash?trashId=${id}&restore=folder`
      );

      toast({
        description: response?.data?.message,
      });
    } catch (error) {
      setSuccess(true);
      setLoadingRestore(false);

      toast({
        description: (error as any)?.response?.data?.message,
      });
    } finally {
      setSuccess(true);
      setLoadingRestore(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="secondary"
          className="py-1 px-2  opacity-0 group-hover:opacity-100"
        >
          <IconDots className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1.5 dark:bg-neutral-900 ">
        {action === "trash" ? (
          <div className="space-y-0">
            <Button
              onClick={() => handleRestore(id)}
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
              onClick={() => handleStarred(id)}
              variant="ghost"
              className="flex w-full  px-2 items-center space-x-2 !justify-start"
            >
              <IconStar
                className={`w-4 h-4 ${starred ? "dark:text-yellow-600" : ""}`}
              />
              <span>
                {loadingStarred
                  ? "Updated..."
                  : starred
                  ? "Unstarred"
                  : "Starred"}
              </span>
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
                    onSubmit={form.handleSubmit(handleRenameFolder)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="folderName"
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
                    onClick={() => handleMoveTrash(id)}
                    disabled={loading}
                    type="submit"
                    variant="default"
                    className="px-5 h-7"
                  >
                    {loading && (
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

export default ActionFolder;
