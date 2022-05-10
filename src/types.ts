export interface FlowNode {
  id: string;
  milestoneDates: string[];
  data: {
    label: string;
  };
  date: string;
}
