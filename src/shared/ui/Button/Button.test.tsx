import { render, screen } from '@testing-library/react'
import { Button, TypeButton } from './Button'

describe('Button', () => {
  test('Render Button', () => {
    render(<Button>test</Button>)
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('Render Button with type', () => {
    render(<Button typeBtn={TypeButton.PRIMARY}>123</Button>)
    expect(screen.getByText('test')).toHaveClass('primary')
  })
})
