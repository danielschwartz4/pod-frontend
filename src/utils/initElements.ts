const nodeProgressMap = {
  1: "#F26D51",
  2: "#6097F8",
  3: "#3EE76D",
};

const edgeProgressMap = {
  1: true,
  2: true,
  3: false,
};
export default function init_elements(
  milestones: string[],
  milestoneDates: string[],
  milestoneProgress: number[],
  isMainProject: boolean
) {
  const elements = [];
  let goingRight = false;

  milestones?.forEach((element, i) => {
    const date = milestoneDates[i].split(" 00")[0];
    if (i % 3 == 0) {
      goingRight = !goingRight;
    }

    elements.push({
      id: "horizontal-" + i,
      sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
      targetPosition: i % 3 == 0 ? "top" : goingRight ? "left" : "right",
      type: i == 0 ? "input" : null,
      data: isMainProject
        ? {
            label: [milestones[i], milestoneDates[i]],
          }
        : { label: date },
      position: goingRight
        ? { x: 275 * (i % 3), y: Math.floor(i / 3) * 100 }
        : { x: 275 * (2 - (i % 3)), y: Math.floor(i / 3) * 100 },
      style: {
        background: nodeProgressMap[milestoneProgress[i]],
        color: "black",
        border: "1px solid #222138",
        // !! Figure this out
        date: milestoneDates[i],
      },
    });

    if (i > 0) {
      elements.push({
        id: "e" + i,
        arrowHeadType: "arrow",
        source: "horizontal-" + (i - 1),
        target: "horizontal-" + i,
        animated: edgeProgressMap[milestoneProgress[i]],
        sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
        targetPosition: i % 3 == 2 ? "top" : goingRight ? "left" : "right",
      });
    }
  });
  return elements;
}
