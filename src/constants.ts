import { addDays } from "./utils/singleTaskUtils";

export const ADD_TASKS_LIMIT = 28;
export const SKELETON_UNIT_SIZE = 7;
// export const TODAY = new Date();
export const RANGE_DAYS = {
  week: 7,
  month: 30,
  year: 365,
};

export const TODAY = addDays(27, new Date());
