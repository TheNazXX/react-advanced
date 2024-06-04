import { memo, useCallback, useEffect, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./AddCommentForm.module.scss";
import { useTranslation } from "react-i18next";
import { Button, Textarea, TypeButton } from "shared/ui";
import { useSelector } from "react-redux";
import { getAddcommentFormText } from "../../model/selectors/getAddcommentForm";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import {
  DynamicModuleLoader,
  type ReducersList,
} from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slice/addCommentFormSlice";
import { sendComment } from "../../model/services/sendComment";

export interface AddCommentFormProps {
  className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const text = useSelector(getAddcommentFormText);
  const dispatch = useAppDispatch();

  const onCommentOnChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, []);

  const onSendComment = useCallback(() => {
    dispatch(sendComment());
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Textarea
          value={text}
          className={cls.textarea}
          placeholder="Add your comment"
          onChange={onCommentOnChange}
        />
        <Button
          className={cls.btn}
          typeBtn={TypeButton.PRIMARY}
          onClick={onSendComment}
        >
          {t("Send")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
