// tour.js

import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
  {
    target: ".calendar",
    content: "This is your calendar so you can check out your task progress.",
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
    content: "Each members answer to the daily question will appear here.",
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
  // {
  //   target: ".tour-external-links",
  //   content: "This is where you can find the external links.",
  // },
  // {
  //   target: ".tour-footer",
  //   content: "This is where you can see the footer links.",
  // },
];

// Tour component
const Tour = () => {
  return (
    <>
      <JoyRide steps={TOUR_STEPS} continuous={true} />
    </>
  );
};

export default Tour;
