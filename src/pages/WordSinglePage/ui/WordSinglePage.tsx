import { useEffect, type FC, type ReactNode, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Word } from "entities/Words";
import { AppLink, Button, Loader, Modal, TypeButton } from "shared/ui";
import { useTranslation } from "react-i18next";
import cls from "./WordSinglePage.module.scss";
import { classNames } from "shared/libs/classNames/classNames";
import { upperFirstLetter } from "shared/libs/actionsWithFirstLetter/actionsWithFirstLetter";
import { requestWord } from "entities/Words";
import { addRepeatWordRequest } from "entities/RepeatWords";
import { Alert, useAlert } from "shared/ui/Alert/Alert";
import { type addRepeatWordResponse } from "entities/RepeatWords/model/types/RepeatWordsSchema";
import { typeLoader } from "shared/ui/Loader/Loader";

import { Translate } from "./Translate/Translate";
import { Type } from "./Type/Type";
import { Synonyms } from "./Synonyms/Synonyms";
import { Sentences } from "./Sentences/Sentences";
import { RoutePathes } from "shared/config/routeConfig/routeConfig";
import { EditModal } from "./EditModal/EditModal";
import { deleteWord } from "entities/Words/model/services/DeleteWord";

interface WordPageProps {
  className?: string;
  children?: ReactNode;
}

export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const {
    isAlert,
    alertText,
    setAlertText,
    alertSuccess,
    showAlert,
    hideAlert,
    setIsAlert,
  } = useAlert();

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [currentWord, setCurentWord] = useState<Word | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<null | string>(null);
  const [isLoadigAddRepeatWord, setIsLoadigAddRepeatWord] =
    useState<boolean>(false);

  const [addRepeatIsLoading, setRepeatIsLoading] = useState(false);
  const [addRepeatError, setRepeatError] = useState("");

  const { t } = useTranslation();
  const { word } = useParams();

  const deleteDelay = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsLoading(true);
    requestWord(word!)
      .then(onLoaded)
      .catch((e: any) => {
        showAlert(e.message, false);
      });

    return () => {
      clearTimeout(deleteDelay.current);
    };
  }, []);

  const onLoaded = (data: Word) => {
    setIsLoading(false);
    setCurentWord(data);
  };

  const onRepeatWordRequest = () => {
    setIsLoadigAddRepeatWord(true);

    if (currentWord) {
      addRepeatWordRequest(currentWord)
        .then(({ message }: addRepeatWordResponse) => {
          showAlert(message, true);
        })
        .catch((e) => {
          const errorText = e?.message || "Something went wrong";
          showAlert(errorText, false);
        })
        .finally(() => {
          setIsLoadigAddRepeatWord(false);
        });
    }
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onDeleteWord = () => {
    setIsLoading(true);

    deleteWord(currentWord!.en)
      .then(() => {
        setIsAlert(true);
        setAlertText("Word was deleted successfully");

        deleteDelay.current = setTimeout(() => {
          navigate("/words");
          setIsLoading(false);
        }, 1000);
      })

      .catch((error) => {
        setIsAlert(true);
        setAlertText(error);
        setIsLoading(false);
      });
  };

  if (!currentWord) {
    return (
      <>
        <Button typeBtn={TypeButton.PRIMARY}>
          <AppLink className={cls.back} to={RoutePathes.words}>
            {t("Back")}
          </AppLink>
        </Button>
        <Alert
          key={alertText}
          isOpen={isAlert}
          onClose={() => {
            hideAlert();
          }}
          text={alertText}
          isSuccess={alertSuccess}
          autoClose={true}
        />
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={cls.wrapper}>
          <div className={cls.head}>
            <i
              className={classNames(cls.word, {}, [
                "animate__animated animate__fadeIn",
              ])}
            >
              {upperFirstLetter(currentWord?.en)}
            </i>

            <div className={cls.btns}>
              {isLoadigAddRepeatWord ? (
                <Loader className={cls.loader} type={typeLoader.DOTS} />
              ) : (
                <Button
                  typeBtn={TypeButton.PRIMARY}
                  onClick={onRepeatWordRequest}
                  disabled={addRepeatIsLoading}
                >
                  {t("AddRepeat")}
                </Button>
              )}

              <Button
                typeBtn={TypeButton.PRIMARY}
                disabled={isLoadigAddRepeatWord}
                onClick={onEdit}
              >
                {t("Edit")}
              </Button>
              <Button
                typeBtn={TypeButton.DANGER}
                disabled={isLoadigAddRepeatWord}
                onClick={onDeleteWord}
              >
                {t("Delete")}
              </Button>
            </div>
          </div>

          <div className={cls.inner}>
            <div className="flex-between">
              <Translate
                className={cls.translate}
                items={currentWord?.translate || []}
              />
              <Type type={currentWord?.partOfSpeech || "unknown"} />
            </div>

            <Synonyms
              className={cls.synonyms}
              items={currentWord?.synonyms || undefined}
              onEdit={() => {
                setIsEdit(true);
              }}
            />
            <Sentences
              items={currentWord?.sentences || undefined}
              currentWord={currentWord.en}
              onEdit={() => {
                setIsEdit(true);
              }}
            />
          </div>
        </div>
      )}

      <EditModal
        isOpen={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
        word={currentWord}
      />
      <Alert
        key={alertText}
        isOpen={isAlert}
        onClose={() => {
          hideAlert();
        }}
        text={alertText}
        isSuccess={alertSuccess}
        autoClose={true}
      />
    </>
  );
};
