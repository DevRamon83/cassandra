import type { RefObject } from "react";

const useHorizontalScroll = (
  direction: string,
  ref: RefObject<HTMLDivElement | null>,
) => {
  const space = direction === "left" ? 300 : -300;

  const scroller = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: space,
        behavior: "smooth",
      });
    }
  };

  return scroller;
};

export default useHorizontalScroll;
