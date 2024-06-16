import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { type SidebarItemLinkType } from "./model/types/items";

import { AppLink } from "shared/ui";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./SidebarItemLink.module.scss";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";

interface SidebarItemLinkProps {
  item: SidebarItemLinkType;
  isCollapsed?: boolean;
}

export const SidebarItemLink: FC<SidebarItemLinkProps> = memo(
  ({ item, isCollapsed = false }) => {
    const { path, text, icon } = item;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
      return null;
    }

    return (
      <AppLink
        className={classNames(cls.link, { [cls.collapsed]: isCollapsed }, [])}
        to={path}
      >
        {icon}
        {!isCollapsed && t(text)}
      </AppLink>
    );
  }
);
