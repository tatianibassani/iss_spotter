const request = require('request');

const fetchMyIP = function(callback) { 
    request('https://api.ipify.org?format=json/', (error, response, body) => {

      if (error) {
        callback(error, null);
        return;
      }
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      callback(error, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, data) => {

    if (error) {
      callback(error, null);
      return;
    }

    const obj = JSON.parse(data);

    if (obj.success === false) {
      error = obj;
    }

    callback(error, {latitude: obj.latitude, longitude: obj.longitude});
                
  });
};
  
module.exports = { fetchMyIP, fetchCoordsByIP };