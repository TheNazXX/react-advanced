import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { PageNotFound } from 'pages/NotFoundPage'

import { type RouteProps } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PAGE_NOT_FOUND = 'not_found'
}

export const RoutePathes: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PAGE_NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePathes.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePathes.about,
    element: <AboutPage />
  },
  [AppRoutes.PAGE_NOT_FOUND]: {
    path: RoutePathes.not_found,
    element: <PageNotFound />
  }
}
