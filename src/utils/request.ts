import axios from 'axios';
import qs from 'qs';

const DEFAULT_TIMEOUT_SECONDS = 20 * 1000;

const request = axios.create({
  baseURL: 'http://codingcase.zeiss.services',
  timeout: DEFAULT_TIMEOUT_SECONDS,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export default request;
