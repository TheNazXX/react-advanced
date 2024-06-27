import {
  type FC,
  type ChangeEvent,
  type SelectHTMLAttributes,
  memo,
  useEffect,
  useRef,
} from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Select.module.scss";

type HtmlSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
>;

export enum TypeSelect {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RESET = "reset",
}

interface SelectProps<T extends string> extends HtmlSelectProps {
  className?: string;
  value?: T | number;
  onChange?: (value: T) => void;
  typeSelect?: TypeSelect;
  options: Array<{ value: string | number; label: string }>;
}

export const Select = <T extends string>({
  className,
  value,
  onChange,
  typeSelect = TypeSelect.PRIMARY,
  options,
  ...props
}: SelectProps<T>) => {
  const ref = useRef<HTMLSelectElement>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <div className={classNames(cls.Select, {}, [className, cls.secondary])}>
      <select ref={ref} {...props} value={value} onChange={onChangeHandler}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={cls.arrow}></div>
    </div>
  );
};
