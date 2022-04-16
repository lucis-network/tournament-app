import { useLayoutEffect, useState } from "react";
import { isClient } from "../utils/Env";

function getWindowSize() {
  return isClient
    ? [window.innerWidth, window.innerHeight]
    : [1920, 1080]
}

export function useWindowSize() {
  const [size, setSize] = useState(getWindowSize());
  useLayoutEffect(() => {
    function updateSize() {
      setSize(getWindowSize());
    }

    window?.addEventListener("resize", updateSize);

    return () => window?.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
