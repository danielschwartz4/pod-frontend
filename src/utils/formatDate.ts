import moment from "moment";

export const convertFromMilitaryTime = (date: string): string => {
  if (!date) {
    return date;
  }
  const [hours, minutes] = date.split(":");
  const [hour, minute] = [hours, minutes].map(Number);
  const isAM = hour < 12;
  const isPM = hour >= 12;
  const hour12 = isAM ? hour : hour - 12;
  const minute12 = isAM ? minute : minute + 12;
  const hour12Str = hour12.toString().padStart(2, "");
  const minute12Str = minute12.toString().padStart(2, "0");
  return `${hour12Str}:${minute12Str} ${isPM ? "PM" : "AM"}`;
};

const formatDate = (date: string, withTime = false): string => {
  return withTime
    ? moment(date).utc().calendar()
    : moment(date).utc().format("MM/DD/YYYY");
  // moment().format('MMMM Do YYYY, h:mm:ss a');
};

export default formatDate;
