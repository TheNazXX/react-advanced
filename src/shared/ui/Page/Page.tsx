import {
  type ReactNode,
  memo,
  type FC,
  useRef,
  type MutableRefObject,
} from "react";
import { classNames } from "shared/libs/classNames/classNames";
import { useInfiniteScroll } from "shared/libs/hooks/useInfiniteScroll/useInfiniteScroll";

export interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });
  return (
    <section
      ref={wrapperRef}
      className={classNames(
        "h-[90vh] overflow-scroll pr-8 pb-8 relative",
        {},
        []
      )}
    >
      {children}
      <div className="" ref={triggerRef} />
    </section>
  );
};
