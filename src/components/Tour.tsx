import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JoyRide, {
  ACTIONS,
  EVENTS,
  STATUS,
  BeaconRenderProps,
  TooltipRenderProps,
} from "react-joyride";

import {
  useMeQuery,
  useUpdateHasCreatedTaskMutation,
} from "../generated/graphql";

// Tour steps
let TOUR_STEPS = [
  {
    target: ".calendar",
    content:
      "This is your calendar so you can check out your task progress and update it as you go!",
  },
  {
    target: ".daily-question",
    content:
      "Each day, we will ask a question that you should respond upon completion or failure of your task.",
  },
  {
    target: ".task-circle",
    content:
      "If it's a task day, click the circle to update your task status!.",
  },
  {
    target: ".pod-updates",
    content: "Each member's answer to the daily question will appear here.",
  },
  {
    target: ".pod-task-completion",
    content:
      "This bar will show your pod's task completion progress every day. Each member contributes!",
  },
  {
    target: ".pod",
    content:
      "You are auto-placed in a pod to start, but feel free to exit and enter new ones as you please!",
  },
  {
    target: ".discord",
    content:
      "You are also auto placed in a discord channel when you join a pod. This feature is in beta.",
  },
];

const defaultOptions = {
  options: {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 64,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#f04",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    width: undefined,
    zIndex: 100,
  },
  tooltipContent: {
    fontSize: 16,
    fontFamily: "ubuntu",
    color: "#67777E",
  },
  buttonNext: {
    fontFamily: "ubuntu",
    fontSize: 16,
    width: "45%",
    height: "2.5rem",
    color: "#fff",
    backgroundColor: "#E42311",
    borderRadius: 4,
  },
};

// Tour component
const Tour = () => {
  const { data: meData } = useMeQuery({});
  const [updateHasCreatedTask] = useUpdateHasCreatedTaskMutation();
  const [run, setRun] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      updateHasCreatedTask({
        variables: {
          hasCreated: true,
        },
      });
      // Need to set our running state to false, so we can restart if we click start again.
      setRun(false);
    }
  };

  return (
    <>
      {!meData?.me?.hasCreatedTask ? (
        <JoyRide
          spotlightClicks={true}
          locale={{ last: "Done" }}
          steps={TOUR_STEPS}
          run={run}
          stepIndex={stepIndex}
          continuous={true}
          scrollOffset={200}
          callback={handleJoyrideCallback}
          styles={defaultOptions}
          // tooltipComponent={Tooltip}
        />
      ) : (
        <></>
      )}
    </>
  );
};

// const Tooltip = ({
//   continuous,
//   index,
//   step,
//   backProps,
//   closeProps,
//   primaryProps,
//   tooltipProps,
// }) => (
//   <Box {...tooltipProps} bgColor="gainsboro">
//     {step.content}
//   </Box>
// );

export default Tour;
