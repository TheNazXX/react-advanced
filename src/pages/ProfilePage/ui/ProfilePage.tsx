import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  type ReducersList,
} from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  Profile,
  fetchProfileData,
  getProfileFormData,
  getProfileFetchError,
  getProfileUpdateError,
  getProfileIsLoading,
  profileReducer,
  getProfileSuccessUpdate,
  profileActions,
} from "entities/Profile";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Alert, Button, TypeButton, useAlert } from "shared/ui";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import cls from "./ProfilePage.module.scss";
import { useParams } from "react-router-dom";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
  children?: ReactNode;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation();
  const { isAlert, showAlert, hideAlert, alertSuccess, alertText } = useAlert();

  const dispatch = useAppDispatch();

  const data = useSelector(getProfileFormData);
  const isLoading = useSelector(getProfileIsLoading);
  const fetchError = useSelector(getProfileFetchError) || "";
  const updateError = useSelector(getProfileUpdateError) || "";
  const successUpdateProfile = useSelector(getProfileSuccessUpdate);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (successUpdateProfile) {
      showAlert(successUpdateProfile, true);
    }
  }, [successUpdateProfile]);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchProfileData(id!));
    }
  }, [dispatch]);

  useEffect(() => {
    if (fetchError) {
      showAlert(fetchError, false);
    }

    if (updateError) {
      showAlert(updateError, false);
      dispatch(profileActions.setReadonly(true));
    }
  }, [fetchError, updateError]);

  let content;

  if (fetchError.length === 0) {
    content = (
      <Profile data={data} isLoading={isLoading} fetchError={fetchError} />
    );
  } else {
    content = (
      <Button
        typeBtn={TypeButton.PRIMARY}
        onClick={async () => await dispatch(fetchProfileData(id!))}
      >
        {t("tryAgain")}
      </Button>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={cls.inner}>
        <ProfilePageHeader className={cls.header} />
        {content}
        <Alert
          isOpen={isAlert}
          text={alertText}
          isSuccess={alertSuccess}
          onClose={hideAlert}
          autoClose={true}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
