import { memo, useState, type FC } from "react";

import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, TypeInput } from "shared/ui/Input/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "shared/libs/classNames/classNames";
import { motion } from "framer-motion";

export interface SearchProps {
  className?: string;
  onChangeValue: (value: string) => void;
  value: string;
}

export const Search: FC<SearchProps> = memo(
  ({ className, value, onChangeValue }) => {
    const { t } = useTranslation();
    const [isFocus, setIsFocus] = useState(false);

    const variants = {
      active: { width: "100%" },
      default: { width: "auto" },
    };

    return (
      <motion.div
        animate={isFocus ? "active" : "default"}
        variants={variants}
        className="flex items-center gap-2 text-[var(--color-200)] max-w-[500px]"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span className="text-xl">{t("Search")}:</span>
        <Input
          onChange={onChangeValue}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={classNames("py-1 px-2")}
          type={TypeInput.PRIMARY}
        />
      </motion.div>
    );
  }
);
