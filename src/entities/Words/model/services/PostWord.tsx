import { type Word } from 'entities/Words'
import axios from 'axios'

export const postWord = async (word: Word) => {
  try {
    const response = await axios.post('http://apiwords/word', word)

    if (!response.data) {
      throw new Error('Something went wrong')
    }

    return await response.data
  } catch (e: any) {
    console.log(e)
    const errorMessage = e?.response?.data?.message || 'Failed to fetch'
    throw new Error(errorMessage)
  }
}
