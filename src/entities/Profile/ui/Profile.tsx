import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Profile.module.scss";
import { useCallback, type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  type ProfileInterface,
  type ProfileSchema,
  type requiredValidationFields,
} from "../model/types/profile";
import { Loader } from "shared/ui";
import { upperFirstLetter } from "shared/libs/actionsWithFirstLetter/actionsWithFirstLetter";
import { Input, TypeInput } from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { getProfileReadonly } from "../model/selectors/getProfileReadonly/getProfileReadonly";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import {
  initialFormRequiredFields,
  profileActions,
} from "../model/slice/ProfileSlice";
import { getFormValidationErrors } from "../model/selectors/getFormValidationErrors/getFormValidationErrors";
import { getProfileIsLoadingUpdate } from "../model/selectors/getProfileIsLoading/getProfileIsLoading";

const defaultImg =
  "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png";

interface ProfileProps extends ProfileSchema {
  className?: string;
}

export const Profile: FC<ProfileProps> = ({ className, data, isLoading }) => {
  const { t } = useTranslation("profile");
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const validationErrors: requiredValidationFields =
    useSelector(getFormValidationErrors) || initialFormRequiredFields;
  const isLoadingProfileUpdate = useSelector(getProfileIsLoadingUpdate);

  const updateField = useCallback(
    (
      field: keyof ProfileInterface,
      value: string | number,
      typeInput: string | number
    ) => {
      if (typeInput === "number") {
        if (isNaN(Number(value))) {
          return;
        }
        value = Number(value);
      }

      const updatedField: Partial<ProfileInterface> = { [field]: value };
      dispatch(profileActions.updateProfile(updatedField as ProfileInterface));
    },
    [dispatch]
  );

  const onChangeField = useCallback(
    (
      field: keyof ProfileInterface,
      value: string | number,
      typeInput: string | number
    ) => {
      updateField(field, value, typeInput);
    },
    [dispatch, validationErrors]
  );

  const generateDescription = useCallback(
    (profileData: ProfileInterface | undefined) => {
      if (!profileData) {
        return null;
      }

      const { avatar, role, ...renderData } = profileData;

      return (
        <>
          {Object.entries(renderData).map(([key, initialValue]) => {
            if (key === "id") return;

            return (
              <div key={key} className={cls.item}>
                <span>{t(upperFirstLetter(t(key)))}:</span>
                {readonly ? (
                  <i className="animate__animated animate__headShake">
                    {initialValue}
                  </i>
                ) : (
                  <Input
                    className={classNames(
                      cls.input,
                      {
                        [cls.error]:
                          validationErrors[key] &&
                          validationErrors[key].length !== 0,
                      },
                      ["animate__animated animate__headShake"]
                    )}
                    value={initialValue}
                    typeInput={TypeInput.RESET}
                    onChange={(changedValue) => {
                      onChangeField(
                        key as keyof Partial<ProfileInterface>,
                        changedValue,
                        typeof initialValue
                      );
                    }}
                  />
                )}
              </div>
            );
          })}
        </>
      );
    },
    [data, readonly, validationErrors]
  );

  if (isLoading) {
    return (
      <div className={classNames(cls.Profile, {}, [className])}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classNames(cls.Profile, {}, [className])}>
      <div className={cls.inner}>
        <div className={cls.role}>
          <i>{data?.role}</i>
        </div>
        <img
          className={cls.img}
          src={data?.avatar || defaultImg}
          alt="avatar"
        />
        <div className={cls.descr}>
          {isLoadingProfileUpdate ? <Loader /> : generateDescription(data)}
        </div>
      </div>
    </div>
  );
};
