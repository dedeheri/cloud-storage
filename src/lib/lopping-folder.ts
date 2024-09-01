interface FoldersProps {
  id: string;
  folderName?: string | null;
  starred: boolean | false;
  createdAt: Date | null;
}

const loppingFolder = (array: any) => {
  const data: any = [];
  array?.map((folder: FoldersProps) => {
    data.push({
      id: folder?.id,
      name: folder?.folderName,
      type: "folders",
      size: 0,
      url: null,
      starred: folder?.starred,
      modified: folder?.createdAt,
    });
  });

  return data;
};

export default loppingFolder;
