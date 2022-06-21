import { SingleTask } from "../generated/graphql";

const circleMapping = {
  completed: "🟢 ",
  missed: "🔴 ",
  overdue: "🟡 ",
  tbd: "🔵 ",
  none: "⚫️ ",
};

export function generateProgress(singleTasks: SingleTask[], inText = false) {
  let tmp = "";
  for (const i in singleTasks) {
    if (parseInt(i) % 7 == 0 && parseInt(i) != 0 && inText) {
      tmp += "\n";
    }
    tmp += circleMapping[singleTasks[i]?.status];
  }
  return tmp;
}

export function generateSms(singleTasks: SingleTask[]) {
  const visCircles = generateProgress(singleTasks);
  const message =
    "Hey hey! Your pod member has made progress! Congratulate them in the app :)";
  const footer = "Check out the progress with this link: https://poddds.com";
  return message + "\n" + visCircles + " 🚀" + "\n" + footer;
}
