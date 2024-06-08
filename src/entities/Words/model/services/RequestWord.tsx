import axios from "axios";

export const requestWord = async (word: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8888/api/word?word=${word}`
    );

    if (!response.data) {
      throw new Error("Empty data");
    }

    return response.data.words;
  } catch (e: any) {
    throw new Error("Unknown word");
  }
};
