const sortByDate = (array: any) => {
  return array.sort((a: any, b: any) => {
    return new Date(b.modified).getTime() - new Date(a.modified).getTime();
  });
};

export default sortByDate;
