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
