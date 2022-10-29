const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/', (error, response, body) => {
    callback(error, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, data) => {
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

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }

    fetchCoordsByIP(ip, (error, data) => {
       if (error) {
        callback(error);
        return;
       }

       const coords = {latitude: data.latitude, longitude: data.longitude};
       fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          callback(error);
          return;
        }
        
        callback(null, passes);
       })
    })
  })
}

module.exports = { nextISSTimesForMyLocation };
//module.exports = { fetchISSFlyOverTimes };
//module.exports = { fetchCoordsByIP };
//module.exports = { fetchMyIP };