import { setLayoutGifSize } from "../utils";

const renderDate = timeStamp => {
  const newDate = new Date(timeStamp);

  const day = newDate.getDay();

  const month = newDate.getMonth();

  const year = newDate.getFullYear();

  return `${month + 1}-${day}-${year}`;
};

export { setLayoutGifSize, renderDate };
