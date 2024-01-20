import { type FC, type ReactNode } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { counterActions } from '../model/slice/counterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

interface CounterProps {
  className?: string
  children?: ReactNode
}

export const Counter: FC<CounterProps> = ({ className }) => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)

  const inc = () => {
    dispatch(counterActions.increment())
  }

  const dec = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button data-testid='increment-btn' typeBtn={TypeButton.PRIMARY} onClick={inc}>+</Button>
      <Button data-testid='decrement-btn' typeBtn={TypeButton.PRIMARY} onClick={dec}>-</Button>
    </div>
  )
}
