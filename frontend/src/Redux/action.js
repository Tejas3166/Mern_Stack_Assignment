import {
  DATA_PAGE_LOADING,
  DATA_PAGE_SUCCESS,
  DATA_PAGE_ERROR,
  SEARCH_DATA_SUCCESS,
  STAT_DATA_SUCCESS,
  MONTH_DATA_SUCCESS,
  MONTH_SOLD_ITEMS,
  MONTH_UNSOLD_ITEMS,
  PIE_CHART,
} from "./actionTypes";
import axios from "axios";
const AllData = (page, limit) => (dispatch) => {
  dispatch({ type: DATA_PAGE_LOADING });
  return axios
    .get(`https://stormy-ox-beret.cyclic.app/items?page=${page}&limit=${limit}`)
    .then((res) => {
      dispatch({ type: DATA_PAGE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: DATA_PAGE_ERROR });
    });
};

const Searching_Data = (data) => (dispatch) => {
  const { value } = data;
  return axios
    .get(`https://stormy-ox-beret.cyclic.app/items?q=${value}`)
    .then((res) => {
      dispatch({ type: SEARCH_DATA_SUCCESS, payload: res.data });
    });
};

const Accoding_Month = (data) => (dispatch) => {
  return axios
    .get(`https://stormy-ox-beret.cyclic.app/items?month=${data}`)
    .then((res) => {
      dispatch({ type: MONTH_DATA_SUCCESS, payload: res.data });
    });
};

const STATE = (data) => (dispatch) => {
  return axios
    .get(`https://stormy-ox-beret.cyclic.app/Statistics?month=${data}`)
    .then((res) => {
      dispatch({ type: STAT_DATA_SUCCESS, payload: res.data });
    });
};

const Totalsold = (data) => (dispatch) => {
  return axios
    .get(
      `https://stormy-ox-beret.cyclic.app/Statistics?month=${data}&sold=${true}`
    )
    .then((res) => {
      dispatch({ type: MONTH_SOLD_ITEMS, payload: res.data.length });
    });
};
const Totalunsold = (data) => (dispatch) => {
  return axios
    .get(
      `https://stormy-ox-beret.cyclic.app/Statistics?month=${data}&unsold=${true}`
    )
    .then((res) => {
      dispatch({ type: MONTH_UNSOLD_ITEMS, payload: res.data.length });
    });
};

const Piechart = (data) => (dispatch) => {
  return axios
    .get(`https://stormy-ox-beret.cyclic.app/piechart?month=${data}`)
    .then((res) => {
      dispatch({ type: PIE_CHART, payload: res.data });
    });
};
export {
  AllData,
  Searching_Data,
  STATE,
  Accoding_Month,
  Totalsold,
  Totalunsold,
  Piechart,
};
