import { type FC, type ReactNode, useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { type StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { type Reducer } from '@reduxjs/toolkit'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  children?: ReactNode
  name: StateSchemaKey
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({ children, name, reducers, removeAfterUnmount }) => {
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useDispatch()

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
      store.reducerManager.add(name, reducer)
      dispatch({ type: `@INTO ${name} reducer` })
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
          store.reducerManager.remove(name)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
