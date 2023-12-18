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

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const responses = JSON.parse(body).response;
    callback(null, responses);
  }
)};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
  
module.exports = { nextISSTimesForMyLocation };