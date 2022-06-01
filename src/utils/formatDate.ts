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

const formatDate = (date: string): string => {
  if (!date) {
    return date;
  }
  let day = date.split(" ")[0];
  let month = date.split(" ").slice(1, 3).join(" ");
  let year = date.split(" ")[3];

  if (date.includes("00:00:00")) {
    return day + ", " + month;
  }
  let t = convertFromMilitaryTime(date.split(" ")[4]);
  return day + ", " + month + ", " + " " + t;
};

export default formatDate;
