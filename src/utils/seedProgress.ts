export default function seedProgress(milestones: string[]) {
  const progress = [];
  for (let i = 0; i < milestones?.length; i++) {
    progress.push(1);
  }
  return progress;
}
