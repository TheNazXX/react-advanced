import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { PageNotFound } from 'pages/NotFoundPage'
import { WordSinglePage } from 'pages/WordSinglePage'
import { WordsPage } from 'pages/WordsPage'

import { type RouteProps } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  WORDS = 'words',
  WORD = 'word',
  PAGE_NOT_FOUND = 'not_found'
}

export const RoutePathes: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.WORDS]: '/words',
  [AppRoutes.WORD]: '/words/:word',
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
  [AppRoutes.WORDS]: {
    path: RoutePathes.words,
    element: <WordsPage />
  },
  [AppRoutes.WORD]: {
    path: RoutePathes.word,
    element: <WordSinglePage />
  },
  [AppRoutes.PAGE_NOT_FOUND]: {
    path: RoutePathes.not_found,
    element: <PageNotFound />
  }
}
