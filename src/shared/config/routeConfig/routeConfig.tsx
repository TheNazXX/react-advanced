import { RepeatPage } from "pages/RepeatPage";
import { MainPage } from "pages/MainPage";
import { PageNotFound } from "pages/NotFoundPage";
import { WordSinglePage } from "pages/WordSinglePage";
import { WordsPage } from "pages/WordsPage";

import { type RouteProps } from "react-router-dom";
import { ProfilePage } from "pages/ProfilePage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  PROFILE = "profile",
  MAIN = "main",
  REPEAT = "repeat",
  WORDS = "words",
  WORD = "word",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  PAGE_NOT_FOUND = "not_found",
}

export const RoutePathes: Record<AppRoutes, string> = {
  [AppRoutes.PROFILE]: "/profile/",
  [AppRoutes.MAIN]: "/",
  [AppRoutes.REPEAT]: "/repeat",
  [AppRoutes.WORDS]: "/words",
  [AppRoutes.ARTICLES]: "/articles/", // + :id
  [AppRoutes.ARTICLE_DETAILS]: "/article-details/",
  [AppRoutes.WORD]: "/words/:word",
  [AppRoutes.PAGE_NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.PROFILE]: {
    path: `${RoutePathes.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.MAIN]: {
    path: RoutePathes.main,
    element: <MainPage />,
  },
  [AppRoutes.REPEAT]: {
    path: RoutePathes.repeat,
    element: <RepeatPage />,
  },
  [AppRoutes.WORDS]: {
    path: RoutePathes.words,
    element: <WordsPage />,
  },
  [AppRoutes.WORD]: {
    path: RoutePathes.word,
    element: <WordSinglePage />,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePathes.articles,
    element: <ArticlesPage />,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: RoutePathes.article_details + ":id",
    element: <ArticleDetailsPage />,
  },
  [AppRoutes.PAGE_NOT_FOUND]: {
    path: RoutePathes.not_found,
    element: <PageNotFound />,
  },
};
