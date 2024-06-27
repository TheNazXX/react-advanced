import { memo, useCallback, useEffect, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { CommentList } from "entities/Comment";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import avatar from "shared/assets/tests/images/avatar.jpg";
import {
  DynamicModuleLoader,
  type ReducersList,
} from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticelDetailsCommentsIsLoading } from "pages/ArticleDetailsPage/model/selectors/comments";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByAtricleId";

import cls from "./ArticleDetailsPage.module.scss";
import { postCommentForArticle } from "pages/ArticleDetailsPage/model/services/postCommentForArticle";
import { AddCommentForm } from "features/AuthByUsername/ui/AddCommentForm";
import { Page } from "widgets/Page/ui/Page";
import { AppLink, Button, TypeButton } from "shared/ui";
import { RoutePathes } from "shared/config/routeConfig/routeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  articleRecommendationReducer,
  getArticleRecommendation,
} from "pages/ArticleDetailsPage/model/slice/articleRecommendationSlice";
import { fetchArticlesRecommendations } from "pages/ArticleDetailsPage/model/services/fetchArticlesRecommendations";
import { ArticleList } from "entities/Article/ui/ArticleList/ArticleList";
import { ArticlesListView } from "entities/Article/model/types/article";
import { getArticleRecommendationIsLoading } from "pages/ArticleDetailsPage/model/selectors/recommendations";

interface ArtcleDetailsPageProps {
  className?: string;
  children?: ReactNode;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
  articlesRecommendations: articleRecommendationReducer,
};

const ArtcleDetailsPage: FC<ArtcleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const isLoading = useSelector(getArticelDetailsCommentsIsLoading)!;
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendation.selectAll);
  const recommendationsIsLaodig = useSelector(
    getArticleRecommendationIsLoading
  );

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(postCommentForArticle(text));
    },
    [dispatch]
  );

  if (!id) {
    return <div>{t("Article is undefined")}</div>;
  }

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticlesRecommendations());
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <Page>
        <div className="text-right">
          <AppLink className="inline-block" to={RoutePathes.articles}>
            <Button
              className="flex items-center gap-1 ml-auto"
              typeBtn={TypeButton.PRIMARY}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              <span>{t("Back")}</span>
            </Button>
          </AppLink>
        </div>
        <ArticleDetails _id={id} />

        <div className="mb-10">
          <div className="text-4xl font-semibold mb-4">
            {t("Reccommendations")}
          </div>
          <ArticleList
            className="flex-nowrap"
            isLoading={recommendationsIsLaodig}
            articles={recommendations}
            view={ArticlesListView.TILE}
          />
        </div>

        <div className={cls.title}>{t("Comments")}</div>
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArtcleDetailsPage);
