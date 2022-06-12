export const dayIdxMapper = (idx: number) => {
  const map = {
    0: { abr: "s", day: "sunday" },
    1: { abr: "m", day: "monday" },
    2: { abr: "t", day: "tuesday" },
    3: { abr: "w", day: "wednesday" },
    4: { abr: "t", day: "thursday" },
    5: { abr: "f", day: "friday" },
    6: { abr: "s", day: "saturday" },
  };
  return map[idx];
};
