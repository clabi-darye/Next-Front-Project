import { RefObject, useEffect, useState } from "react";

export const useScrollCheck = (ref: RefObject<HTMLDivElement | null>) => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkScroll = () => {
      setIsScrollable(el.scrollHeight > el.clientHeight);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return isScrollable;
};
