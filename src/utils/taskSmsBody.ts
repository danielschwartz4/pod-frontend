import { SingleTask } from "../generated/graphql";

const circleMapping = {
  completed: "🟢",
  missed: "🔴",
  overdue: "🟡",
  tbd: "🔵",
  none: "⚫️",
};

export function generateProgress(singleTasks: SingleTask[]) {
  let tmp = "";
  for (const i in progress) {
    if (i != "0") {
      tmp += "→";
    }
    tmp += boxMapping[progress[i]];
  }
  return tmp;
}

export function generateSms(progress: number[]) {
  const progSquares = generateProgress(progress);
  const message =
    "Hey hey! Your pod member has made progress! Congratulate them in the app :)";
  const footer = "Check out the progress with this link: https://poddds.com";
  return message + "\n" + progSquares + " 🚀" + "\n" + footer;
}
