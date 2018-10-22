import { setLayoutGifSize } from "../utils";

const renderDate = timeStamp => {
  const newDate = new Date(timeStamp);

  const day = newDate.getDate();

  const month = newDate.getMonth();

  const year = newDate.getFullYear();

  return `${month + 1}-${day}-${year}`;
};

export { setLayoutGifSize, renderDate };
