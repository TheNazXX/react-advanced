import axios from 'axios'

export const requestWord = async (word: string) => {
  try {
    const response = await axios.get(`http://apiwords/word?word=${word}`)

    if (!response.data) {
      throw new Error('Empty data')
    }

    return response.data
  } catch (e: any) {
    return e.message
  }
}
