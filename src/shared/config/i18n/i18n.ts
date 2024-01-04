import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { type Langs } from 'widgets/LangSwitcher/LangSwitcher'

export const LOCAL_STORAGE_LANG_KEY = 'lang'

const defaultLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as Langs || 'ua'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: defaultLang,
    debug: true,

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
