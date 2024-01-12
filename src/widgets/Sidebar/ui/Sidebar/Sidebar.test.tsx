import { screen, fireEvent } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { componentRender } from 'shared/libs/tests/componentRender/componentRender'

describe('Sidebar', () => {
  test('Render Sidebar', () => {
    componentRender(<Sidebar/>)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('Toggle Sidebar', () => {
    componentRender(<Sidebar/>)
    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
