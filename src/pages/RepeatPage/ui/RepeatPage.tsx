import { useState, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./RepeatPage.module.scss";
import {
  AppLink,
  Button,
  Loader,
  Modal,
  TypeButton,
  WordWrap,
  Alert,
  useAlert,
} from "shared/ui";
import { getWords, type Word } from "entities/Words";
import { RepeatWordByOne } from "widgets/RepeatWordsByOne";
import {
  fetchRepeatWords,
  getIsLoadingGetRepeatWords,
  getRepeatWords,
  getIsErrorRepeatWords,
} from "entities/RepeatWords";
import { useDispatch, useSelector } from "react-redux";
import { type ThunkDispatch } from "@reduxjs/toolkit";

const RepeatPage: FC = () => {
  const isLoading = useSelector(getIsLoadingGetRepeatWords);
  const repeatWords = useSelector(getRepeatWords);
  const words = useSelector(getWords);
  const errorGetRepeatWords = useSelector(getIsErrorRepeatWords);

  const [revisingType, setRevisingType] = useState("");
  const [byOneModal, setByOneModal] = useState(false);

  const { isAlert, showAlert, alertSuccess, alertText, hideAlert } = useAlert();

  const { t } = useTranslation();
  const dispatch = useDispatch<ThunkDispatch<Word[], null, any>>();

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ));
  };

  useEffect(() => {
    // dispatch(fetchRepeatWords());
  }, []);

  useEffect(() => {
    console.log(repeatWords);
  }, [repeatWords]);

  useEffect(() => {
    if (errorGetRepeatWords) {
      showAlert(errorGetRepeatWords, false);
    }
  }, [errorGetRepeatWords]);

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (repeatWords?.length === 0 && !(isLoading || errorGetRepeatWords)) {
    content = (
      <div className={cls.text}>
        {t("EverythingIsRevised")}:{" "}
        <AppLink to={"/words"}>
          <Button typeBtn={TypeButton.PRIMARY}>{t("AddToRevise")}</Button>
        </AppLink>
      </div>
    );
  }

  if (repeatWords!.length > 0 && !(isLoading || errorGetRepeatWords)) {
    content = renderWords(repeatWords!);
  }

  if (!isLoading && errorGetRepeatWords) {
    content = (
      <Button
        onClick={async () => await dispatch(fetchRepeatWords())}
        typeBtn={TypeButton.PRIMARY}
      >
        {t("Try again")}
      </Button>
    );
  }

  return (
    <div className={cls.page}>
      <div className={cls.head}>
        <h2 className={cls.title}>{t("WordsToRevise")}</h2>

        <div className={cls.btns}>
          <span>{t("TypeRevising")}:</span>
          <Button
            className={cls.btn}
            typeBtn={TypeButton.OUTLINE}
            onClick={() => {
              setByOneModal(true);
            }}
            disabled={isLoading || repeatWords!.length === 0}
          >
            {t("OneByOne")}
          </Button>
          <Button className={cls.btn} typeBtn={TypeButton.OUTLINE}>
            {t("List")}
          </Button>
        </div>
      </div>

      <div className={cls.inner}>{content}</div>

      <Modal
        isOpen={byOneModal}
        onClose={() => {
          setByOneModal(false);
        }}
      >
        {renderWords.length !== 0 ? (
          <RepeatWordByOne
            words={repeatWords!}
            onClose={() => {
              setByOneModal(false);
            }}
          />
        ) : (
          <div className={cls.modal_text}>{t("NothingToRevise")}</div>
        )}
      </Modal>

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

export default RepeatPage;
