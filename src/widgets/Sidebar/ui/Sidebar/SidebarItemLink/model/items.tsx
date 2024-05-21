import {
  faHouse,
  faLayerGroup,
  faBook,
  faUser,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RoutePathes } from "shared/config/routeConfig/routeConfig";

export interface SidebarItemLinkType {
  path: string;
  text: string;
  icon: JSX.Element;
  authOnly?: boolean;
}

export const SidebarItemLinks: SidebarItemLinkType[] = [
  {
    path: RoutePathes.profile,
    text: "Profile",
    icon: <FontAwesomeIcon icon={faUser} />,
    authOnly: true,
  },
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
