export interface FlowNode {
  id: string;
  milestoneDates: string[];
  // data: {
  label: string;
  // };
  date: string;
}

export interface NodeProgress {
  id: string;
  progress: number;
}

export interface NodeProgress {
  id: string;
  progress: number;
}

export interface NodeMilestone {
  id: string;
  text: string;
}

export interface NodeDate {
  id: string;
  date: string;
}

export interface EndOptions {
  date: Date;
  repetitions: number;
  neverEnds: boolean;
}

export type EndOptionsSelectorType = "none" | "date" | "repetitions" | "never";

// Starts from sunday
export type DaysType = {
  0: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  1: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  2: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  3: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  4: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  5: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  6: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
};

export type SingleTaskOptions = {
  userId: number;
  taskId: number;
  podId: number;
  notes: string;
  completed: boolean;
  actionDate: Date;
};
