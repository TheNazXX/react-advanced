import { createSelector } from "@reduxjs/toolkit";
import { type StateSchema } from "app/providers/StoreProvider";
import { getUserAuthData } from "entities/User";
import {
  faHouse,
  faLayerGroup,
  faBook,
  faUser,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RoutePathes } from "shared/config/routeConfig/routeConfig";
import { type SidebarItemLinkType } from "../types/items";

const selectAuthData = getUserAuthData;

export const getSidebarItems = createSelector([selectAuthData], (authData) => {
  const SidebarItemLinks: SidebarItemLinkType[] = [
    {
      path: RoutePathes.main,
      text: "Main",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      path: RoutePathes.repeat,
      text: "Repeat",
      icon: <FontAwesomeIcon icon={faLayerGroup} />,
    },
    {
      path: RoutePathes.words,
      text: "Words",
      icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
      path: RoutePathes.articles,
      text: "Articles",
      icon: <FontAwesomeIcon icon={faNewspaper} />,
    },
  ];

  if (authData) {
    SidebarItemLinks.push({
      path: RoutePathes.profile + authData?.id,
      text: "Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      authOnly: true,
    });
  }

  return SidebarItemLinks;
});
