/* Main goal of this API is to change page content in accordance to sunrise and sunset time
src https://sunrise-sunset.org/api */

let dateNow = Date.now(); // actual date in ms
let tdrLink = "json.json"; // link to API 
const interval = setInterval(setSunTable, 10800000 ) // data update every 3 houre

function setSunTable() { // main function

  // tdr stands for time & date request
  $.getJSON(tdrLink, function(tdr) {

    // get json info in UTC
    let tdrSR = tdr.results.sunrise;
    let tdrCTB = tdr.results.civil_twilight_begin;
    let tdrSS = tdr.results.sunset;
    let tdrCTE = tdr.results.civil_twilight_end;

    // parse date string to milliseconds
    let tdrSRn = Date.parse(tdrSR);
    let tdrCTBn = Date.parse(tdrCTB);
    let tdrSSn = Date.parse(tdrSS);
    let tdrCTEn = Date.parse(tdrCTE);

      // change UTC+0 to UTC+1 - summer time included
      function timeZone() {
        let c = new Date();
        let tz = c.getTimezoneOffset();
        return -tz // amount of minutes between UTC and UTC+1 (minus needed for further action)
      }

    let tz = timeZone();
    let sunrise = tdrSRn + tz;
    let twBegin = tdrCTBn + tz;
    let sunset = tdrSRn + tz;
    let twEnd = tdrCTEn + tz;


      // change page content in accordance to sunrise and sunset
      const interval = setInterval(sunPosition, 60000) // data update every 1 min
      function sunPosition() { // function checking sun position
        if (dateNow >= twBegin && dateNow < sunrise){
          let dayDuration = twEnd - dateNow; // remaining time to sunset
          console.log(dayDuration)
          console.log("Civil twilight")
        } else if (dateNow >= sunrise && dateNow < sunset) {
          let dayDuration = twEnd - dateNow; // remaining time to sunset
          console.log(dayDuration)
          console.log("Day")
        } else if (dateNow >= sunset && dateNow < twEnd) {
          console.log("Sunset")
        } else {
          console.log("Night")
        }
      }
      sunPosition(); // running function

  });
}

setSunTable(); // running main function
