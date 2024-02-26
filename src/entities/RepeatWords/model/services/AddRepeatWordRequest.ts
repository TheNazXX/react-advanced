import { type Word } from 'entities/Words'
import axios from 'axios'

export const addRepeatWordRequest = async (word: Word) => {
  try {
    const response = await axios.post('http://localhost:8000/repeatWord', { word });

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    

    console.log(response);

    // if(response.data)

    return await response.data;
  } catch (e: any) {
    console.log(e);
    throw Error(e);
  }
}
