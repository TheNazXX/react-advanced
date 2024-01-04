import { render, screen } from '@testing-library/react'
import { Button, TypeButton } from './Button'

describe('Button', () => {
  test('Render Button', () => {
    render(<Button>123</Button>)
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  test('Render Button with type', () => {
    render(<Button typeBtn={TypeButton.PRIMARY}>123</Button>)
    expect(screen.getByText('123')).toHaveClass('primary')
  })
})
