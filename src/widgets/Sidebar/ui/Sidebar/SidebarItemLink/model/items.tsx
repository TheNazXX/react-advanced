import { faHouse, faLayerGroup, faBook, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RoutePathes } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemLinkType {
  path: string
  text: string
  icon: JSX.Element
}

export const SidebarItemLinks: SidebarItemLinkType[] = [
  {
    path: RoutePathes.profile,
    text: 'Profile',
    icon: <FontAwesomeIcon icon={faUser} />
  },
  {
    path: RoutePathes.main,
    text: 'Main',
    icon: <FontAwesomeIcon icon={faHouse} />
  },
  {
    path: RoutePathes.repeat,
    text: 'Repeat',
    icon: <FontAwesomeIcon icon={faLayerGroup} />
  },
  {
    path: RoutePathes.words,
    text: 'Words',
    icon: <FontAwesomeIcon icon={faBook} />
  }
]
