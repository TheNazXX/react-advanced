import { classNames } from "shared/libs/classNames/classNames";
import cls from "./RepeatWordByOne.module.scss";
import { type FC, type ReactNode, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { type Word } from "entities/Words";
import { Button, TypeButton, AppLink, WordWrap, Loader } from "shared/ui";
import {
  lowerFirstLetter,
  upperFirstLetter,
} from "shared/libs/actionsWithFirstLetter/actionsWithFirstLetter";
import { Input } from "shared/ui/Input/Input";
import { UaWordRules, validation } from "shared/libs/validation/validation";
import { correctTranslate } from "../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { type ThunkDispatch } from "redux-thunk";
import {
  postRepeatWords,
  getIsLoadingPost,
  getIsErrorPost,
  getIsSuccessPost,
} from "entities/RepeatWords";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { repeatWordsActions } from "entities/RepeatWords/model/slice/repeatWordsSlice";

interface RepeatWordByOneProps {
  className?: string;
  children?: ReactNode;
  words: Word[];
  onClose: () => void;
}

export const RepeatWordByOne: FC<RepeatWordByOneProps> = ({
  className,
  words,
  onClose,
}) => {
  const [revisingWords, setRevisingWords] = useState<Word[]>(words);
  const [failedWords, setFailedWords] = useState<Word[]>([]);

  const [isMistake, setIsMistake] = useState(false);
  const [isHint, setIsHint] = useState(false);

  const [currentIdxWord, setCurrentIdxWord] = useState<number>(0);
  const [randomWord, setRandomWord] = useState<Word>({
    en: "",
    translate: [],
    datestamp: new Date(),
  });

  const [translationValue, setTranslationValue] = useState("");
  const [translationErrorsValidation, setTranslationErrorsValidation] =
    useState<string[]>([]);

  const isLoadingPost = useSelector(getIsLoadingPost);
  const errorMessagePost = useSelector(getIsErrorPost);
  const isSuccessPost = useSelector(getIsSuccessPost);

  const { t } = useTranslation();
  const delayHideLoading = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useDispatch<ThunkDispatch<any, Word[], any>>();

  const replaceWord = () => {
    const currentArr = [...revisingWords];
    currentArr.splice(currentIdxWord, 1);
    setRevisingWords(currentArr);
  };

  const onChangeTransltationValue = (value: string) => {
    setTranslationValue(value);
  };

  const changeWord = () => {
    setIsHint(false);

    if (!checkValidation()) {
      return;
    }

    if (checkByCorrectWord()) {
      reset();
      replaceWord();
      return;
    }

    setIsMistake(true);
  };

  const checkValidation = () => {
    const errors = validation(translationValue, UaWordRules);
    setTranslationErrorsValidation(errors);
    return errors.length === 0;
  };

  const skip = () => {
    failedWords.push(randomWord);
    setIsHint(false);
    setIsMistake(false);
    reset();
    replaceWord();
  };

  const reset = () => {
    setTranslationValue("");
    setTranslationErrorsValidation([]);
  };

  const showHint = () => {
    setIsHint(true);
  };

  const checkByCorrectWord = () => {
    const result = translationValue
      .trim()
      .split(",")
      .map((elem) => elem.trim());

    if (result.length !== randomWord.translate?.length) {
      return false;
    }

    return result.every((elem) => randomWord.translate?.includes(elem));
  };

  useEffect(() => {
    setRevisingWords(words);
  }, [words]);

  useEffect(() => {
    const rdm = Math.floor(0 + Math.random() * revisingWords.length);
    setRandomWord(revisingWords[rdm]);
    setCurrentIdxWord(rdm);
  }, [revisingWords]);

  const onSuccess = () => {
    onClose();
    setFailedWords([]);
  };

  const onComplete = () => {
    dispatch(postRepeatWords(failedWords));
  };

  useEffect(() => {
    isSuccessPost && onSuccess();
  }, [isSuccessPost]);

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap className="animate__animated animate__fadeIn">{en}</WordWrap>
      </AppLink>
    ));
  };

  return (
    <div
      key={randomWord?.en}
      className={classNames(cls.RepeatWordByOne, {}, [
        className,
        "animate__animated animate__fadeIn animate__faster",
      ])}
    >
      {revisingWords.length !== 0 ? (
        <>
          <h2 className={cls.title}>{t("WordsToRevise")}</h2>
          <span className={cls.en_word}>
            {upperFirstLetter(randomWord?.en)}
          </span>

          <label className={cls.group}>
            <span>{t("TypeTranslate")}:</span>
            <Input
              className={classNames("", { [cls.error]: isMistake }, [])}
              value={translationValue}
              onChange={onChangeTransltationValue}
            />

            {translationErrorsValidation.length !== 0 ? (
              <small
                key={translationErrorsValidation[0]}
                className="animate__animated animate__fadeIn animate__faster"
              >
                {translationErrorsValidation[0]}
              </small>
            ) : null}

            <span className={cls.hint}>
              {t("Possibly")} {randomWord?.translate?.length}{" "}
              {lowerFirstLetter(
                t(correctTranslate(randomWord?.translate?.length || 0))
              )}
            </span>
          </label>

          {isMistake || isHint ? (
            <div
              className={classNames(cls.correct, {}, [
                "animate__animated animate__fadeIn",
              ])}
            >
              {t("CorrectVersion")}&nbsp;-&nbsp;
              <div className={classNames(cls.correct_elems, {}, [])}>
                {randomWord?.translate?.map((elem) => {
                  return <span key={elem}>{elem}</span>;
                })}
              </div>
            </div>
          ) : null}

          <div className={cls.btns}>
            {isMistake ? (
              <Button typeBtn={TypeButton.OUTLINE} onClick={skip}>
                {t("Ok")}
              </Button>
            ) : (
              <>
                <Button typeBtn={TypeButton.OUTLINE} onClick={changeWord}>
                  {t("Next")}
                </Button>
                <Button typeBtn={TypeButton.PRIMARY} onClick={skip}>
                  {t("Skip")}
                </Button>
              </>
            )}

            <span className={cls.info}>
              {words.length - revisingWords.length + 1}/{words.length}
            </span>
            <Button className={cls.bulb} onClick={showHint}>
              <FontAwesomeIcon icon={faLightbulb} />
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className={cls.title}>{t("NeedInRevising")}</h2>
          <div className={cls.inner}>
            {isLoadingPost ? (
              <Loader className={cls.loader} />
            ) : failedWords.length !== 0 ? (
              renderWords(failedWords)
            ) : (
              <div className={cls.info_text}>
                {t("All the words are learned.")}
              </div>
            )}
          </div>

          {!isLoadingPost && (
            <Button
              className={cls.btn}
              typeBtn={TypeButton.OUTLINE}
              onClick={onComplete}
            >
              {t("Done")}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
