interface FilesProps {
  id: string;
  fileName?: string | null;
  fileType: string | null;
  fileSize: number | null;
  fileUrl: string | null;
  starred: boolean | false;
  createdAt: Date | null;
}

const loppingFile = (array: any) => {
  const data: any = [];
  array?.map((file: FilesProps) => {
    data.push({
      id: file?.id,
      name: file?.fileName,
      type: file?.fileType,
      size: file?.fileSize,
      modified: file?.createdAt,
      url: file?.fileUrl,
      starred: file?.starred,
    });
  });

  return data;
};

export default loppingFile;
