import { componentRender } from 'shared/libs/tests/componentRender/componentRender'
import { Counter } from './Counter'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('CounterComponent', () => {
  test('render', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })

    expect(screen.getByTestId('value-title')).toHaveTextContent('10')
  })

  test('increment', async () => {
    const user = userEvent.setup()
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    await user.click(screen.getByTestId('increment-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('11')
  })

  test('decrement', async () => {
    const user = userEvent.setup()
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    await user.click(screen.getByTestId('decrement-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('9')
  })
})
