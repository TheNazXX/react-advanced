import { classNames } from 'shared/libs/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import { type FC } from 'react'
import UaSvg from 'shared/assets/icons/ua-flag.svg'
import { useTranslation } from 'react-i18next'

export const LOCAL_STORAGE_LANG_KEY = 'lang'

export const enum Langs {
  Eu = 'en',
  Ua = 'ua'
}

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation()

  const toggleLang = (lang: Langs): void => {
    i18n.changeLanguage(lang)
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang)
  }

  return (
  <div className={classNames(cls.LangSwitcher, {}, [className])}>
    <button className={classNames('', { [cls.active]: i18n.language === Langs.Eu }, [])} onClick={() => { toggleLang(Langs.Eu) }}>{t('en')}</button>

    <span className={cls.line}></span>

    <button className={classNames('', { [cls.active]: i18n.language === Langs.Ua }, [])} onClick={() => { toggleLang(Langs.Ua) }}>
      <UaSvg />
      {t('ua')}</button>
  </div>
  )
}
