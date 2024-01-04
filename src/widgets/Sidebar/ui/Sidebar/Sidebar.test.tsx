import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
// import { withTranslation } from 'react-i18next'

describe('Sidebar', () => {
  test('Render Sidebar', () => {
    // const SidebarWithTranslation = withTranslation()(Sidebar)
    render(<Sidebar collapsed={false} toggleSidebar={() => {}}/>)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    screen.debug()
  })
})
