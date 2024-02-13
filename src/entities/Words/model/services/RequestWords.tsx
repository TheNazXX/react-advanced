import { createAsyncThunk } from "@reduxjs/toolkit";
import { Word } from "../types/wordsSchema";
import axios from "axios";
import { wordsActions } from "../slice/wordsSlice";

export const RequestWords = createAsyncThunk<Word[], null>(
  'words/RequestWords',
  async (_, thunkAPI) => {
    try{
      const response = await axios.get('http://localhost:8000/words');

      if(!response.data){
        throw new Error();
      }

      thunkAPI.dispatch(wordsActions.setWords(response.data));

      return response.data;
    }catch(e){
      console.log(e)
      return thunkAPI.rejectWithValue("Wrong login or password")
    } 
  }
) 