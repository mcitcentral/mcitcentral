import { useState, Dispatch } from "react";

const useToggle = (
  init?: boolean
): [boolean, () => void, Dispatch<boolean>] => {
  const [active, setActive] = useState(init || false);
  const toggleActive = () => setActive((prev) => !prev);
  return [active, toggleActive, setActive];
};

export default useToggle;
