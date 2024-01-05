import { screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { withTranslation } from 'react-i18next'
import { renderWithTranslation } from 'shared/libs/tests/renderWithTranslation/renderWithTranslation'

describe('Sidebar', () => {
  test('Render Sidebar', () => {
    const SidebarWithTranslation = withTranslation()(Sidebar)
    renderWithTranslation(<SidebarWithTranslation collapsed={true} toggleSidebar={() => {}}/>)
    screen.debug()
  })
})
