export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const delayAlert = async (
  ms: number,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
  res: boolean
) => {
  await delay(ms);
  setShowAlert(res);
};
