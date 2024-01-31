import { type FC, lazy } from 'react'

export const RepeatPageAsync = lazy<FC>(async () => await new Promise(resolve => {
  setTimeout(() => { resolve(import('./RepeatPage')) }, 1500)
}))
