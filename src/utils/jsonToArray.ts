export const objectToArray = (object, _key) => {
  const arr = [];
  for (const [key, value] of Object.entries(object)) {
    try {
      arr.push(value[_key]);
    } catch {
      console.log("key doesnt exist");
    }
  }
  return arr;
};
