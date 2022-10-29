//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
//const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

//const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
//const exampleCoords = { latitude: '9999', longitude: '9' };

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  for (let pass of passTimes) {
    console.log(`Next pass at ${new Date(pass.risetime * 1000)} for ${pass.duration} seconds!`);
  }
});

/*fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:', passTimes);
});*/


/*fetchMyIP((error, ip) => {
  if (error) {
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
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  
});*/

/*fetchCoordsByIP('108.173.221.40', (error, data) => {
  if (error) {
    const status = error.success;
    const ip = error.ip;
    const message = error.message;

    console.log(`It didn't work! Error: Success status was ${status}. Server message says: ${message} for IP ${ip}`);
    return;
  }
  
  console.log(data.latitude);
  console.log(data.longitude);

//   if (error) {
//     callback(error, null);
//     return;
//   }
//  const parsedBody = JSON.parse(body);
    
//     if (!parsedBody.success) {
//       const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
//       callback(Error(message), null);
//       return;
//     }
});*/

// fetchCoordsByIP = (error, ip) => {
//   if (error) {
//     callback(error, data);
//     return;
//   }
//   console.log("It didn't work!" , error);
//     return;
// }

//Require it in index.js
//For now, call the function and pass in our (IPv4) IP address string as the first argument to the function
//For now, our callback can simply print out the values for error and data