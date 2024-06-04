import { memo, useEffect, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./CommentList.module.scss";
import { useTranslation } from "react-i18next";
import { type Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "shared/ui";
import { AddCommentForm } from "features/AuthByUsername/ui/AddCommentForm";

export interface CommentListProps {
  className?: string;
  comments: Comment[];
  isLoading: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation();

    let content;

    if (isLoading) {
      content = <Loader />;
    } else if (comments?.length === 0) {
      content = t("Not Fond Comments");
    } else {
      content = (
        <>
          {comments.map((comment, index) => (
            <CommentCard key={uuidv4()} comment={comment} />
          ))}
        </>
      );
    }

    return (
      <div className={classNames(cls.CommentList, {}, [])}>
        <AddCommentForm className={cls.commentForm} />
        {content}
      </div>
    );
  }
);
