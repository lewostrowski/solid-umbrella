/* Main goal of this API is to change page content in accordance to sunrise and sunset time
src https://sunrise-sunset.org/api */

let dateNow = Date.now(); // actual date in ms
let tdrLink = "json.json";
const interval = setInterval(sunTable, 1800000) // data update every 30 min

function sunTable() {

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

    // change on page in accordance to sunrise and sunset
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
  });
}

sunTable(); // running function
