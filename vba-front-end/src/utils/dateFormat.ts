import { format } from "date-fns";
export const dateFormat = (date: Date) => {
  return format(new Date(date), "dd MMMM yyyy");
};

export const timeFormat = (date: Date) => {
  return format(new Date(date), " HH:mm:ss");
};
