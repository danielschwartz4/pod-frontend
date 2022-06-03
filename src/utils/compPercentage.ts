export default function compPercentage(milestoneProgress: number[]): string {
  const numThrees = milestoneProgress.filter((x) => x == 3).length;
  const numOnes = milestoneProgress.filter((x) => x == 1).length;
  const dec = (numThrees / milestoneProgress.length) * 100;
  return Math.round(dec * 100) / 100 + "%";
}
