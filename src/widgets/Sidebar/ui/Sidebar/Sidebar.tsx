import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Sidebar.module.scss";
import { type FC, useState, useEffect } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { useTranslation } from "react-i18next";

import { BurgerBtn } from "widgets/BurgerBtn/BurgerBtn";

import { ThemeColorsSwitcher } from "widgets/ThemeColorsSwitcher";
import { SidebarItemLink } from "./SidebarItemLink/SidebarItemLink";
import { useSelector } from "react-redux";
import { getSidebarItems } from "./SidebarItemLink/model/selectors/getSibarsItems";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, toggleCollapsed] = useState<boolean>(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const toggleSidebar = () => {
    toggleCollapsed((state) => !state);
  };

  const { t } = useTranslation();

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={classNames(cls.closeBtnWrap, {}, [])}>
        <BurgerBtn
          onClick={toggleSidebar}
          isOpen={collapsed}
          data-testid="sidebar-toggle"
        />
      </div>

      <div className={classNames(cls.themeSwitch, {}, [])}>
        {!collapsed ? <span>{t("SwitchTheme")}</span> : null}
        <ThemeSwitcher />
      </div>

      <div className={classNames(cls.LangSwitcher, {}, [])}>
        <LangSwitcher isCollapsed={collapsed} />
      </div>

      <div className={classNames(cls.links, {}, [])}>
        {sidebarItemsList.map((item) => {
          return (
            <SidebarItemLink
              key={item.path}
              item={item}
              isCollapsed={collapsed}
            />
          );
        })}
      </div>

      {/* <BugButton className={cls.bugButton}/> */}

      <div className={classNames(cls.themeColorsSwitcher, {}, [])}>
        <ThemeColorsSwitcher isCollapsed={collapsed} />
      </div>
    </div>
  );
};
