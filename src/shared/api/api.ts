import axios from 'axios'
import { USER_LOCAL_KEY } from 'shared/const/lodalStorage'

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(USER_LOCAL_KEY),
    'Content-Type': 'application/json'
  }
})
