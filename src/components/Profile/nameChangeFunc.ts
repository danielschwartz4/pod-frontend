import { useEffect } from "react";

// Ref for handling outside click
export default function useOutsideAlerter(
  ref: React.MutableRefObject<HTMLDivElement>,
  isChangingName: boolean,
  setIsChangingName: React.Dispatch<React.SetStateAction<boolean>>,
  newName: string,
  handleUpdateName: () => Promise<void>
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        isChangingName
      ) {
        handleUpdateName();
        setIsChangingName(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isChangingName, newName]);
}
