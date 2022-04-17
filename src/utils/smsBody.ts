const boxMapping = {
  1: "🟥",
  2: "🟦",
  3: "🟩",
};

function generateProgress(progress: number[]) {
  let tmp = "";
  for (const i in progress) {
    tmp += boxMapping[progress[i]];
  }
  return tmp;
}

export function generateSms(progress: number[]) {
  const progSquares = generateProgress(progress);
  const message =
    "Hey hey! Your pod member has made progress! Congratulate them in the app :)";
  return message + "\n" + progSquares + " 🚀";
}
