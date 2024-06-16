import { type MutableRefObject, useRef, useEffect } from "react";

export interface UseInfiniteScroll {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScroll) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerRef.current);

      return () => {
        if (observer && triggerRef.current) {
          observer.unobserve(triggerRef.current);
        }
      };
    }
  }, [triggerRef, wrapperRef, callback]);
}
