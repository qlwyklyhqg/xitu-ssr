
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from "axios";

const defaultState = {
  category: "frontend",
  lang: "javascript",
  goldlist: [],
  gitlist: [],
}

export const actionTypes = {
  GET_GOLD: 'GET_GOLD',
  GET_GIT: 'GET_GIT',
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_GOLD:
      return Object.assign({ ...state }, {
        goldlist: action.data
      })
    case actionTypes.GET_GIT:
      return Object.assign({ ...state }, {
        gitlist: action.data
      })
    default:
      return state
  }
}

export const getGold = ({ value, isServer }) => (dispatch, getState) => {
  let url = '/resources/gold';
  if (isServer)
    url = 'https://extension-ms.juejin.im/resources/gold';
  return axios.post(url,
    {
      category: value || getState().category,
      order: "heat",
      offset: 0,
      limit: 30,
    })
    .then(res => {
      dispatch({ type: actionTypes.GET_GOLD, data: res.data.data });
    });
}

export const getGit = ({ value, isServer }) => (dispatch, getState) => {
  let url = '/resources/github';
  if (isServer)
    url = 'https://extension-ms.juejin.im/resources/github';
  return axios.post(url,
    {
      category: "trending",
      order: "day",
      lang: value || getState().lang,
      offset: 0,
      limit: 30,
    })
    .then(res => {
      dispatch({ type: actionTypes.GET_GIT, data: res.data.data });
    });
}

export function initializeStore(initialState = defaultState) {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}