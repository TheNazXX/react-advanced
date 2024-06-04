import { memo, useEffect, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./CommentCard.module.scss";
import { useTranslation } from "react-i18next";
import { type Comment } from "../../model/types/comment";
import { AppLink, Skeleton } from "shared/ui";
import { RoutePathes } from "shared/config/routeConfig/routeConfig";

const defaultImg =
  "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png";

export interface CommentCardProps {
  className?: string;
  comment?: Comment;
}

export const CommentCard: FC<CommentCardProps> = memo(
  ({ className, comment }) => {
    const { t } = useTranslation();

    return (
      <div className={classNames(cls.CommentCard, {}, [])}>
        <AppLink
          to={`${RoutePathes.profile}${comment?.user.id}`}
          className={cls.header}
        >
          <img
            src={comment!.user?.avatar || defaultImg}
            className={cls.avatar}
          />
          <span className={cls.name}>{comment!.user.login}</span>
        </AppLink>

        <div className={cls.text}>{comment!.text}</div>
      </div>
    );
  }
);
