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

export type OAuthType = "register" | "login";

export interface GsiButtonConfiguration {
  type: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signup_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: string;
  local?: string;
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

export type TaskTypeSelectorType = "exercise" | "study" | "other";

export type TaskStatus = "completed" | "missed" | "overdue" | "tbd";

export type SingleTaskOptions = {
  userId: number;
  taskId: number;
  notes: string;
  status: TaskStatus;
  actionDate: Date;
  actionDay: number;
};

export type SessionType = "project" | "task";

export type CompletedCount = {
  allTime?: number;
  week?: number;
};

export type MessagingSettings = {
  email: {
    podMilestonCompletion: boolean;
    milestoneApproaching: boolean;
    websiteUpdates: boolean;
  };
  phone: {
    podMilestonCompletion: boolean;
    milestoneApproaching: boolean;
    websiteUpdates: boolean;
  };
};
