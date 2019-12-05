const {URL} = require('url');
const axios = require('axios');
const API_HOST = 'https://reqres.in/api/';

(async () => {
  const getProfiles = page => {
    console.log(API_HOST, 'API HOST');
    const url = new URL(API_HOST + 'users');
    if (page) url.searchParams.set('page', page);
    console.log(url + '');
    const data = axios.get(url);
    console.log(data, 'DATA');
  };

  getProfiles();
})()
  .catch(err => console.log('Error:: ', err));
