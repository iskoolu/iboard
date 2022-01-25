import axios from 'axios';

export function apiCallFetch(url, methodType, options, params) {
  fetch(url, {
    method: methodType,
    body: params,
    headers: options,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function apiCallAxiosGet(url, options, params) {
  axios
    .get(url + params)
    .headers(options)
    .then(function (response) {
      // handle success
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      alert(error.message);
    })
    .finally(function () {
      // always executed
      alert('Finally called');
    });
}

export function apiCallAxiosPost(url, options, params) {
    axios
      .post(url, { params })
      .headers(options)
      .then(function (response) {
        // handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        alert('Finally called');
      });
  }

  /*
   urls[]
  */
  export function apiCallMultipleRequests(urls, options) {
    //TBD
  };