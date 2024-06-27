import { ReactNode, memo, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import { useTranslation } from "react-i18next";

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onChangeTab: (tab: TabItem) => void;
}

export const Tabs: FC<TabsProps> = memo(
  ({ className, tabs, onChangeTab, value }) => {
    const { t } = useTranslation();

    const onHandleTab = (tab: TabItem) => {
      return () => {
        onChangeTab(tab);
      };
    };

    return (
      <div className={classNames("flex items-center gap-2", {}, [className])}>
        {tabs.map((tab) => (
          <div
            onClick={onHandleTab(tab)}
            className={classNames(
              "py-2 px-3 border-2 border-[var(--color-200)] rounded hover:border-[transparent] transition-all cursor-pointer",
              {
                "bg-[var(--color-200)] pointer-events-none":
                  value === tab.value,
              },
              []
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    );
  }
);
