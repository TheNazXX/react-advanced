import { type FC, lazy } from 'react'

export const RepeatPageAsync = lazy<FC>(async () => await import('./RepeatPage'))
