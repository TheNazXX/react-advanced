import { type StateSchema } from "app/providers/StoreProvider";
import { getSaveScrollByPath, saveScrollActions } from "features/SaveScroll";
import {
  type ReactNode,
  memo,
  type FC,
  useRef,
  type MutableRefObject,
  type UIEvent,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { classNames } from "shared/libs/classNames/classNames";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { useInfiniteScroll } from "shared/libs/hooks/useInfiniteScroll/useInfiniteScroll";
import { useThrottle } from "shared/libs/hooks/useThrottle/useThrottle";

export interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getSaveScrollByPath(state, pathname)
  );

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, []);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      saveScrollActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(
        "h-[90vh] overflow-scroll pr-8 pb-8 relative",
        {},
        []
      )}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? <div className="h-[20px] mt-10" ref={triggerRef} /> : null}
    </section>
  );
};
