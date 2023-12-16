const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      const status = error.success;
      const ip = error.ip;
      const message = error.message;
  
      console.log(`It didn't work! Error: Success status was ${status}. Server message says: ${message} for IP ${ip}`);
      return;
    }
    
    console.log(data.latitude);
    console.log(data.longitude);
  });

});