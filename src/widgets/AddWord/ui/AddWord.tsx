import { classNames } from "shared/libs/classNames/classNames";
import cls from "./AddWord.module.scss";
import { useState, type FC, type ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Input, TypeInput } from "shared/ui/Input/Input";
import { format } from "date-fns";
import { Alert, Button, Loader, Select, Textarea, useAlert } from "shared/ui";
import { TypeButton } from "shared/ui/Button/Button";
import {
  type RulesProps,
  validation,
  EnWordRules,
  UaWordRules,
} from "shared/libs/validation/validation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import "animate.css";
import {
  type RequiredFieldsAddWordErrors,
  type ResponseAddWord,
} from "../model/types/types";
import { TypeTextarea } from "shared/ui/Textarea/Textarea";
import { Rules } from "shared/libs/validation/validation";
import { getWords, type Word } from "entities/Words";
import {
  type Sentence,
  partOfSpeech,
} from "entities/Words/model/types/wordsSchema";
import { postWord } from "entities/Words/model/services/PostWord";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { wordsActions } from "entities/Words/model/slice/wordsSlice";
import { useSelector } from "react-redux";
import { repeatWordsActions } from "entities/RepeatWords/model/slice/repeatWordsSlice";

interface AddWordProps {
  className?: string;
  children?: ReactNode;
}

interface PartOfSpeechOptionInterface {
  value: partOfSpeech;
  label: string;
}

export const partOfSpeechOptions: PartOfSpeechOptionInterface[] = [
  { value: partOfSpeech.DEFAULT, label: "-" },
  { value: partOfSpeech.NOUN, label: "noun" },
  { value: partOfSpeech.VERB, label: "verb" },
  { value: partOfSpeech.ADJECTIVE, label: "adjective" },
  { value: partOfSpeech.ADVERB, label: "adverb" },
  { value: partOfSpeech.CONJUNCTION, label: "conjunction" },
];

export const unitsOptions = [
  { value: "", label: "-" },
  { value: "unit1", label: "unit-1" },
  { value: "unit2", label: "unit-2" },
];

const initialFieldsErrors: RequiredFieldsAddWordErrors = {
  enWordValue: [],
  transtaltionWordValue: [],
};

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation();

  const {
    isAlert,
    showAlert,
    alertSuccess,
    alertText,
    hideAlert,
    alertChildren,
  } = useAlert();

  const [enWordValue, setEnWordValue] = useState("");
  const [transtaltionWordValue, setTranslationWordValue] = useState("");
  const [synonymsWordValue, setSynonymsWordValue] = useState<string>("");
  const [partOfSpeechValue, setPartOfSpeechValue] = useState<string>(
    partOfSpeechOptions[0].value
  );
  const [unitsValue, setUnitsValue] = useState<string>(unitsOptions[0].value);
  const [isDifficultValue, setIsDifficultValue] = useState<boolean>(false);

  const [sentenceValue, setSentenceValue] = useState<string>("");
  const [sentenceTranslationValue, setSentenceTranslationValue] =
    useState<string>("");

  const [sentenceError, setSentenceError] = useState<string[]>([]);
  const [sentenceTranslationError, setSentenceTranslationError] = useState<
    string[]
  >([]);
  const [sentencesArray, setSentencesArray] = useState<Sentence[]>([]);

  const [validationErrors, setValidationErrors] =
    useState<RequiredFieldsAddWordErrors>(initialFieldsErrors);

  const dispatch = useAppDispatch();

  const checkValidation = () => {
    let isErrors = false;
    const errors: RequiredFieldsAddWordErrors = {
      enWordValue: [
        ...validation(enWordValue, {
          [Rules.REQUIRED]: true,
          [Rules.IS_EN]: true,
        }),
      ],
      transtaltionWordValue: [
        ...validation(transtaltionWordValue, {
          [Rules.REQUIRED]: true,
          [Rules.IS_UA]: true,
        }),
      ],
    };

    Object.values(errors).forEach((elem) => {
      if (elem.length) {
        isErrors = true;
      }
    });

    return { isErrors, errors };
  };

  const resetForm = () => {
    setEnWordValue("");
    setTranslationWordValue("");
    setSynonymsWordValue("");
    setPartOfSpeechValue(partOfSpeechOptions[0].value);
    setUnitsValue(unitsOptions[0].value);
    setSentenceValue("");
    setSentenceTranslationValue("");
    setSentenceError([]);
    setSentenceTranslationError([]);
    setSentencesArray([]);
  };

  const onAddWord = () => {
    setValidationErrors(initialFieldsErrors);

    const { isErrors, errors } = checkValidation();

    if (isErrors) {
      setValidationErrors(errors);
      return;
    }

    if (isSentences() && !checkValidationSentence()) {
      return;
    }

    postWord(prepareWord())
      .then(({ word, message }) => {
        showAlert(message, true);
        resetForm();

        dispatch(wordsActions.addWord(word));
        dispatch(repeatWordsActions.addWord(word));
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const prepareWord = (): Word => {
    return {
      en: enWordValue.toLowerCase().trim(),
      translate: prepareArrayFromString(transtaltionWordValue),
      partOfSpeech: partOfSpeechValue as partOfSpeech,
      synonyms: prepareArrayFromString(synonymsWordValue),
      unit: unitsValue,
      sentences: prepareSentence(),
      difficult: isDifficultValue,
      datestamp: new Date(),
    };
  };

  const prepareArrayFromString = (value: string): string[] => {
    return value
      .split(",")
      .map((elem) => elem.toLowerCase().trim())
      .filter((elem) => elem);
  };

  const isSentences = () => {
    setSentenceTranslationError([]);
    setSentenceError([]);

    return sentenceValue !== "" || sentenceTranslationValue !== "";
  };

  const checkValidationSentence = () => {
    let isCheck = true;

    const errorsSentence = validation(sentenceValue, {
      [Rules.REQUIRED]: true,
      [Rules.IS_EN]: true,
      [Rules.MIN]: 10,
    });
    const errorsTranslateSentence = validation(sentenceTranslationValue, {
      [Rules.REQUIRED]: true,
      [Rules.IS_UA]: true,
      [Rules.MIN]: 10,
    });

    if (errorsSentence.length !== 0) {
      setSentenceError(errorsSentence);
      isCheck = false;
    } else {
      setSentenceError([]);
    }
    if (errorsTranslateSentence.length !== 0) {
      setSentenceTranslationError(errorsTranslateSentence);
      isCheck = false;
    } else {
      setSentenceTranslationError([]);
    }

    return isCheck;
  };

  const prepareSentence = (): Sentence[] => {
    if (!isSentences()) {
      return sentencesArray;
    }

    const sentence = {
      en: sentenceValue,
      translate: sentenceTranslationValue,
    };

    setSentencesArray((prev) => [...prev, sentence]);

    return [...sentencesArray, sentence];
  };

  const onAddSentance = () => {
    if (checkValidationSentence()) {
      setSentencesArray((prev) => [
        ...prev,
        {
          en: sentenceValue,
          translate: sentenceTranslationValue,
        },
      ]);

      resetSentancesValues();

      showAlert("Sentence was added successfuly", true);
    }
  };

  const resetSentancesValues = () => {
    setSentenceValue("");
    setSentenceTranslationValue("");
  };

  return (
    <div
      className={classNames(cls.AddWord, {}, [
        className,
        "animate__animated animate__fadeIn",
      ])}
    >
      <div className={cls.head}>
        <FontAwesomeIcon className={cls.icon} icon={faPenToSquare} />
        <span className={cls.title}>{t("AddNewWord")}</span>
        <Button
          className={cls.btn}
          typeBtn={TypeButton.PRIMARY}
          onClick={onAddWord}
          disabled={false}
        >
          {t("AddWord")}
        </Button>
      </div>

      <form className={cls.form} action="">
        <div className={cls.row}>
          <div className={cls.column}>
            <div className={cls.row}>
              <div className={cls.group}>
                <div className={cls.group_head}>
                  <label htmlFor="en_word">{t("Word")}</label>
                  {validationErrors.enWordValue.length ? (
                    <small className="animate__animated animate__fadeIn animate__faster">
                      {validationErrors.enWordValue[0]}
                    </small>
                  ) : null}
                </div>
                <Input
                  onChange={setEnWordValue}
                  value={enWordValue}
                  placeholder="Type word..."
                  typeInput={TypeInput.SECONDARY}
                  isRequired={true}
                  isError={validationErrors.enWordValue.length !== 0}
                />
              </div>

              <div className={cls.group}>
                <label htmlFor="en_word">{t("Synonyms")}</label>
                <Input
                  onChange={setSynonymsWordValue}
                  value={synonymsWordValue}
                  placeholder="Type synonyms"
                  typeInput={TypeInput.SECONDARY}
                />
              </div>
            </div>

            <div className={cls.row}>
              <div className={cls.group}>
                <label htmlFor="en_word">{t("Part of speech")}</label>

                <Select
                  onChange={setPartOfSpeechValue}
                  value={partOfSpeechValue}
                  options={partOfSpeechOptions}
                />
              </div>

              <div className={cls.group}>
                <label htmlFor="en_word">{t("Units")}</label>

                <Select
                  onChange={setUnitsValue}
                  value={unitsValue}
                  options={unitsOptions}
                />
              </div>
            </div>

            <div className={cls.group}>
              <div className={cls.group_head}>
                <label htmlFor="en_word">{t("Translation")}</label>
                {validationErrors.transtaltionWordValue.length ? (
                  <small className="animate__animated animate__fadeIn animate__faster">
                    {validationErrors.transtaltionWordValue[0]}
                  </small>
                ) : null}
              </div>
              <Input
                onChange={setTranslationWordValue}
                value={transtaltionWordValue}
                className={classNames(
                  cls.input,
                  { [cls.error]: validationErrors.enWordValue.length !== 0 },
                  []
                )}
                placeholder="Type translation word..."
                typeInput={TypeInput.SECONDARY}
                isRequired={true}
                isError={validationErrors.transtaltionWordValue.length !== 0}
              />
            </div>
          </div>

          <div className={cls.column}>
            <div className={cls.group}>
              <div className={cls.group_head}>
                <label>{t("Sentence")}</label>
                {sentenceError.length ? (
                  <small className="animate__animated animate__fadeIn animate__faster">
                    {sentenceError[0]}
                  </small>
                ) : null}
              </div>

              <div className={cls.textarea_wrapper}>
                <Button className={cls.textarea_btn} onClick={onAddSentance}>
                  <FontAwesomeIcon className={cls.icon} icon={faSquarePlus} />
                </Button>
                <Textarea
                  className={cls.textarea}
                  typeTextarea={TypeTextarea.SECONDARY}
                  placeholder="Type sentence with this word"
                  value={sentenceValue}
                  onChange={setSentenceValue}
                  isError={sentenceError.length !== 0}
                />
              </div>
            </div>
            <div className={cls.group}>
              <div className={cls.group_head}>
                <label>{t("Translation sentence above")}</label>
                {sentenceTranslationError.length ? (
                  <small className="animate__animated animate__fadeIn animate__faster">
                    {sentenceTranslationError[0]}
                  </small>
                ) : null}
              </div>

              <div className={cls.textarea_wrapper}>
                <Button className={cls.textarea_btn} onClick={onAddSentance}>
                  <FontAwesomeIcon className={cls.icon} icon={faSquarePlus} />
                </Button>
                <Textarea
                  className={cls.textarea}
                  typeTextarea={TypeTextarea.SECONDARY}
                  placeholder="Type translation to sentence above"
                  value={sentenceTranslationValue}
                  onChange={setSentenceTranslationValue}
                  isError={sentenceTranslationError.length !== 0}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <Alert
        isOpen={isAlert}
        onClose={hideAlert}
        isSuccess={alertSuccess}
        autoClose={true}
        text={alertText}
      />
    </div>
  );
};
