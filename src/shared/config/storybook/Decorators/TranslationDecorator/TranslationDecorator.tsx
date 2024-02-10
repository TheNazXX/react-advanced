import { Suspense } from 'react'
import i18n from 'shared/config/i18n/i18n'
import { I18nextProvider } from 'react-i18next'

export const TranslationDecorator = (StoryComponent: any) => {
  return (
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    </Suspense>
  )
}

