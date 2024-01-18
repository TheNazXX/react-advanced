import { type FC, type ReactNode } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { counterActions } from '../model/slice/counterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

interface CounterProps {
  className?: string
  children?: ReactNode
}

export const Counter: FC<CounterProps> = ({ className }) => {
  const dispatch = useDispatch()
  const counterValue = useSelector((state: StateSchema) => state.counter.value)

  const inc = () => {
    dispatch(counterActions.increment())
  }

  const dec = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <h1>{counterValue}</h1>
      <Button typeBtn={TypeButton.PRIMARY} onClick={inc}>inc</Button>
      <Button typeBtn={TypeButton.PRIMARY} onClick={dec}>dec</Button>
    </div>
  )
}
