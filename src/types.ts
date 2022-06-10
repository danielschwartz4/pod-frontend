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

export type DaysType = {
  sunday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  monday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  tuesday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  wednesday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  thursday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  friday: {
    abr?: string;
    isSelected: boolean;
    duration: number;
  };
  saturday: {
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
