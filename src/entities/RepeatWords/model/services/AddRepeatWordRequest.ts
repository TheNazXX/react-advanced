import { type Word } from 'entities/Words'
import axios from 'axios'

export const addRepeatWordRequest = async (word: Word) => {
  try {
    const response = await axios.post('http://localhost:8000/repeatWord', { word })

    if (!response.data) {
      throw new Error('Something went wrong')
    }

    return await response.data
  } catch (e: any) {
    const errorMessage = e?.response?.data?.message || 'Failed to fetch'
    throw new Error(errorMessage)
  }
}
