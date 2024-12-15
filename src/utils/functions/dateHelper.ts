import "@/utils/libs/dayjs/setupDayjs";
import dayjs from "dayjs";

export const DateFormat = {
  HourMinute: "HH:mm",
} as const;

export const formatDate = (type: ValueOf<typeof DateFormat>, date: string) => {
  return dayjs(date).tz().format(type);
};
