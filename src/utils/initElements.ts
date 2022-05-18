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

const milestoneSnippetSize = 94;

export const sortMilestones = (
  milestones: string[],
  dates: string[],
  progress: number[]
) => {
  if (
    typeof milestones === "undefined" ||
    typeof dates === "undefined" ||
    typeof progress === "undefined"
  ) {
    return;
  }

  var milestones = [...milestones];
  var dates = [...dates];
  var progress = [...progress];

  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < dates.length; j++)
    list.push({
      milestone: milestones[j],
      date: dates[j],
      progress: progress[j],
    });

  list.sort(function (a, b) {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() < bDate.getTime()
      ? -1
      : aDate.getTime() == bDate.getTime()
      ? 0
      : 1;
  });

  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
    milestones[k] = list[k].milestone;
    dates[k] = list[k].date;
    progress[k] = list[k].progress;
  }

  return {
    milestones: milestones,
    dates: dates,
    progress: progress,
  };
};

export default function init_elements(
  milestones: string[],
  milestoneDates: string[],
  milestoneProgress: number[],
  allowVertical: boolean
) {
  const elements = [];
  let goingRight = false;

  if (typeof window === "undefined") {
    return;
  }

  if (window.innerWidth > window.innerHeight || !allowVertical) {
    milestones?.forEach((_, i) => {
      if (i % 3 == 0) {
        goingRight = !goingRight;
      }

      elements.push({
        id: "horizontal-" + i,
        sourcePosition: i % 3 == 2 ? "bottom" : goingRight ? "right" : "left",
        targetPosition: i % 3 == 0 ? "top" : goingRight ? "left" : "right",
        type: i == 0 ? "input" : null,
        data:
          milestones[i].length > milestoneSnippetSize
            ? {
                label: milestones[i].slice(0, 94) + "...",
              }
            : { label: milestones[i] },
        position: goingRight
          ? { x: 275 * (i % 3), y: Math.floor(i / 3) * 100 }
          : { x: 275 * (2 - (i % 3)), y: Math.floor(i / 3) * 100 },
        style: {
          background: nodeProgressMap[milestoneProgress[i]],
          color: "black",
          border: "1px solid #222138",
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
  } else {
    milestones?.forEach((_, i) => {
      elements.push({
        id: "vertical-" + i,
        sourcePosition: "bottom",
        targetPosition: "top",
        type: i == 0 ? "input" : null,
        data:
          milestones[i].length > milestoneSnippetSize
            ? {
                label: milestones[i].slice(0, 94) + "...",
              }
            : { label: milestones[i] },
        position: { x: 100, y: i * 100 },
        style: {
          background: nodeProgressMap[milestoneProgress[i]],
          color: "black",
          border: "1px solid #222138",
        },
      });

      if (i > 0) {
        elements.push({
          id: "e" + i,
          arrowHeadType: "arrow",
          source: "vertical-" + (i - 1),
          target: "vertical-" + i,
          animated: edgeProgressMap[milestoneProgress[i]],
          sourcePosition: "bottom",
          targetPosition: "top",
        });
      }
    });
  }
  return elements;
}
