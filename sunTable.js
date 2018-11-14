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
    let tdrSS = tdr.results.sunset;

    // parse date string to milliseconds
    let tdrSRn = Date.parse(tdrSR);
    let tdrSSn = Date.parse(tdrSS);

      // change UTC+0 to UTC+1 - summer time included
      function timeZone() {
        let c = new Date();
        let tz = c.getTimezoneOffset();
        return -tz // amount of minutes between UTC and UTC+1 (minus needed for further action)
      }

    let tz = timeZone();
    let sunrise = tdrSRn + tz;
    let sunset = tdrSSn + tz;

    // change on page in accordance to sunrise and sunset
    if (sunrise < dateNow && sunset > dateNow) {
      console.log("day");
    } else {
      console.log("night");
    }
  });
}

sunTable(); // running function
