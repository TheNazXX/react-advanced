import { type FC, memo, type CSSProperties } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = memo(
  ({ width, height, borderRadius, className }) => {
    const styles: CSSProperties = {
      width,
      height,
      borderRadius,
    };

    return (
      <div
        className={classNames(cls.Skeleton, {}, [className])}
        style={styles}
      ></div>
    );
  }
);
