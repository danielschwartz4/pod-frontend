import { ToastPositionWithLogical } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import { RecurringTask, SingleTask } from "../generated/graphql";

export type NotePopup = {
  title: string;
  description: string;
  position: string;
  // date: Date;
  color: string;
};

export const TOAST_POSITIONS = [
  "top-left",
  "top-right",
  "bottom-right",
  "bottom-left",
];

export const randNotesSplurge = (
  podTasks: SingleTask[],
  podSize: number
): NotePopup[] => {
  if (podTasks == undefined || podTasks?.length === 0) {
    return;
  }

  const usersUsed = new Set<number>();
  let popups = [] as NotePopup[];
  for (let i = 0; i < podSize; i++) {
    const randomIndex = Math.floor(Math.random() * podTasks?.length);

    const randTask = podTasks[randomIndex];
    if (usersUsed.has(randTask?.userId)) {
      i--;
      continue;
    }
    usersUsed.add(randTask?.userId);
    popups.push({
      title: randTask.user.username,
      description: randTask.notes,
      position: TOAST_POSITIONS[i],
      // date: randTask.actionDate,
      color: randomColor(),
    });
  }
  return popups;
};

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
