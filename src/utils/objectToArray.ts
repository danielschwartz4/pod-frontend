import { stringify } from "querystring";

export const objectToArray = (object, _key) => {
  const arr = [];
  for (const [key, value] of Object.entries(object)) {
    try {
      // _key == "completionDate"
      //   ? arr.push(value[_key].toDate())
      //   : arr.push(value[_key]);
      console.log(value[_key].toString());
      arr.push(value[_key].toString());
    } catch {
      console.log("key doesnt exist");
    }
  }
  return arr;
};
