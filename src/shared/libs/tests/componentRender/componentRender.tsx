import i18nForTests from 'shared/config/i18n/i18nForTests'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { type DeepPartial } from 'app/providers/StoreProvider/ui/StoreProvider'

export interface renderWithRouterOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export function componentRender (component: ReactNode, options: renderWithRouterOptions = {}) {
  const {
    route = '/',
    initialState
  } = options

  return render(
    <StoreProvider initialState={initialState}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </MemoryRouter>
    </StoreProvider>
  )
}
