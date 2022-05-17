import { FlowNode, NodeDate, NodeMilestone, NodeProgress } from "../../types";
import init_elements from "../../utils/initElements";
import { generateSms } from "../../utils/smsBody";
import { sendMessage } from "../Sms/sendMessage";

export function onNewProgress(
  _milestoneProgress: number[],
  currNode: FlowNode,
  newProgress: NodeProgress,
  setMilestoneProgress: React.Dispatch<React.SetStateAction<number[]>>,
  setKeepMounted: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (_milestoneProgress && currNode.id != null) {
    let tmp = [];
    _milestoneProgress.forEach((ele, i) => {
      if (typeof currNode.id === "string") {
        if (i == parseInt(currNode.id.split("-")[1])) {
          tmp.push(newProgress["progress"]);
        } else {
          tmp.push(ele);
        }
      }
    });
    setMilestoneProgress(tmp);
    setKeepMounted(false);
  }
}

export function onMilestoneProgress(
  _milestoneProgress: number[],
  _milestones: string[],
  projectId: number,
  updateProjectProgress,
  showAlert: boolean,
  _milestoneDates: string[],
  setElements: React.Dispatch<React.SetStateAction<any[]>>
) {
  setElements(
    init_elements(_milestones, _milestoneDates, _milestoneProgress, true)
  );
  if (projectId && _milestoneProgress) {
    updateProjectProgress({
      variables: {
        updateProjectProgressId: projectId,
        milestoneProgress: _milestoneProgress,
      },
      // !! Do I actually need this
    });
    // !! Only if person is in pod
    if (showAlert) {
      const body = generateSms(_milestoneProgress);
      sendMessage({ to: "+12173817277", body: body });
    }
  }
}

export function onNewMilestone(
  _milestoneProgress: number[],
  _milestones: string[],
  currNode: FlowNode,
  newMilestone: NodeMilestone,
  setKeepMounted: React.Dispatch<React.SetStateAction<boolean>>,
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (_milestones && currNode.id != null) {
    let tmp = [];
    _milestones.forEach((ele, i) => {
      if (typeof currNode.id === "string") {
        if (i == parseInt(currNode.id.split("-")[1])) {
          tmp.push(newMilestone["text"]);
        } else {
          tmp.push(ele);
        }
      }
    });
    setKeepMounted(false);
    setMilestones(tmp);
  }
}

export function onNewMilestones(
  _milestoneProgress: number[],
  _milestones: string[],
  projectId: number,
  updateProjectMilestones,
  _milestoneDates: string[],
  setElements: React.Dispatch<React.SetStateAction<any[]>>
) {
  setElements(
    init_elements(_milestones, _milestoneDates, _milestoneProgress, true)
  );
  if (projectId && _milestones) {
    updateProjectMilestones({
      variables: {
        updateProjectMilestonesId: projectId,
        milestones: _milestones,
      },
    });
  }
}

export function onMilestones(
  _milestoneProgress: number[],
  _milestones: string[],
  projectId: number,
  updateProjectMilestones,
  _milestoneDates: string[],
  setElements: React.Dispatch<React.SetStateAction<any[]>>
) {
  setElements(
    init_elements(_milestones, _milestoneDates, _milestoneProgress, true)
  );
  if (projectId && _milestones) {
    updateProjectMilestones({
      variables: {
        updateProjectMilestonesId: projectId,
        milestones: _milestones,
      },
    });
  }
}

export function onNewMilestoneDate(
  _milestoneProgress: number[],
  _milestones: string[],
  currNode: FlowNode,
  newMilestoneDate: NodeDate,
  setMilestoneDates: React.Dispatch<React.SetStateAction<string[]>>,
  setKeepMounted: React.Dispatch<React.SetStateAction<boolean>>,
  _milestoneDates: string[]
) {
  if (_milestoneDates && currNode.id != null) {
    let tmp = [];
    _milestoneDates.forEach((ele, i) => {
      if (typeof currNode.id === "string") {
        if (i == parseInt(currNode.id.split("-")[1])) {
          tmp.push(newMilestoneDate["date"]);
        } else {
          tmp.push(ele);
        }
      }
    });
    setKeepMounted(false);
    setMilestoneDates(tmp);
  }
}

export function onMilestoneDates(
  _milestoneProgress: number[],
  _milestones: string[],
  projectId: number,
  updateProjectMilestoneDates,
  _milestoneDates: string[],
  setElements: React.Dispatch<React.SetStateAction<any[]>>
) {
  setElements(
    init_elements(_milestones, _milestoneDates, _milestoneProgress, true)
  );
  if (projectId && _milestoneDates) {
    updateProjectMilestoneDates({
      variables: {
        updateProjectMilestoneDatesId: projectId,
        milestoneDates: _milestoneDates,
      },
    });
  }
}
