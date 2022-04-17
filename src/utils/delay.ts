const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const delayAlert = async (
  ms,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await delay(ms);
  setShowAlert(false);
};
