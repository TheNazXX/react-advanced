import { classNames } from "shared/libs/classNames/classNames";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { CommentList } from "entities/Comment";

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
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByAtricleId/fetchCommentsByAtricleId";

import cls from "./ArticleDetailsPage.module.scss";
import { addCommentForArticle } from "pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import { AddCommentForm } from "features/AuthByUsername/ui/AddCommentForm";

interface ArtcleDetailsPageProps {
  className?: string;
  children?: ReactNode;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArtcleDetailsPage: FC<ArtcleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const isLoading = useSelector(getArticelDetailsCommentsIsLoading)!;
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);

  const onSendComment = useCallback(() => {
    dispatch(addCommentForArticle());
  }, [dispatch]);

  if (!id) {
    return <div>{t("Article is undefined")}</div>;
  }

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <ArticleDetails _id={id} />
      <div className={cls.title}>{t("Comments")}</div>
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={isLoading} />
    </DynamicModuleLoader>
  );
};

export default memo(ArtcleDetailsPage);
