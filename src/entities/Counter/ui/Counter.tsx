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
      <h1>{counterValue}</h1>
      <Button typeBtn={TypeButton.PRIMARY} onClick={inc}>+</Button>
      <Button typeBtn={TypeButton.PRIMARY} onClick={dec}>-</Button>
    </div>
  )
}
