/* Main goal of this API is to change page content in accordance to sunrise and sunset time
src https://sunrise-sunset.org/api */

let dateNow = Date.now(); // actual date in ms
let tdrLink = "json.json"; // link to test JSON
let error = "Warning! Check API update time! If this text apear more then 1 per houre, API generate too much data request!"

function sunCycle() {
  $.getJSON(tdrLink, function(tdr) { // geting info
    let sunRise = Date.parse(tdr.results.sunRise);
    let civilBegin = Date.parse(tdr.results.civil_twilight_begin);
    let sunSet = Date.parse(tdr.results.sunSet);
    let civilEnd = Date.parse(tdr.results.civil_twilight_end);
    console.log(error)

    function sunPosition() { // on screen changes
      function timeZone() { // convert UTC+0 to UTC+1, summer time included
        let c = new Date();
        let tz = c.getTimezoneOffset();
        tz *= -60000
        return tz
      }
      // update time values
      sunRise += timeZone();
      civilBegin += timeZone();
      sunSet += timeZone();
      civilEnd += timeZone();
      let dayDuration = civilEnd - dateNow;

      if (dateNow >= civilBegin && dateNow < sunRise) {
        console.log(dayDuration)
        console.log("Civil twilight")
      } else if (dateNow >= sunRise && dateNow < sunSet) {
        console.log(dayDuration)
        console.log("Day")
      } else if (dateNow >= sunSet && dateNow < civilEnd) {
        console.log("sunSet")
      } else {
        console.log("Night")
      }
    }
    const mainUpdate = setInterval(sunPosition, 1000); // update every 1s
    sunPosition();
  })
}
const mainUpdate = setInterval(sunCycle, 3600000); // update every 1h
sunCycle()
