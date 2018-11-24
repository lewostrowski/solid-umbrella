/* Main goal of this API is to change page content in accordance to sunrise and sunset time
src https://sunrise-sunset.org/api */

let dateNow = Date.now(); // actual date in ms
let tdrLink = "json.json"; // link to test JSON
let error = "Warning! Check API update time! If this text apear more then 1 per houre, API generate too much data request!"

function sunCycle() {
  $.getJSON(tdrLink, function(tdr) { // geting info
    let sunRise = Date.parse(tdr.results.sunrise);
    let civilBegin = Date.parse(tdr.results.civil_twilight_begin);
    let sunSet = Date.parse(tdr.results.sunset);
    let civilEnd = Date.parse(tdr.results.civil_twilight_end);
    console.log(error)

     // convert UTC+0 to UTC+1, summer time included
    let c = new Date();
    let tz = c.getTimezoneOffset();
    tz *= -60000
    // update time values
    sunRise += tz;
    civilBegin += tz;
    sunSet += tz;
    civilEnd += tz;

    function sunPosition() { // on screen changes
      let dateNow = Date.now(); // actual date in ms
      let dayDuration = civilEnd - dateNow;

        function dayLight() {
        let dayDuration = civilEnd - dateNow;
        let dayMinuteDuration = dayDuration / 60000
        if (dayMinuteDuration >= 60) {
          let remain = dayMinuteDuration / 60;
          return remain
        } else if (dayMinuteDuration < 60){
          let remain = dayMinuteDuration;
          return remain
        } else {
          return "Error"
        }
      }

      if (dateNow >= civilBegin && dateNow < sunRise){
        document.getElementById("dayDuration").innerHTML = "Pozostało " + dayLight() + " światła dziennego.";
        console.log("Civil twilight")
      } else if (dateNow >= sunRise && dateNow < sunSet) {
        document.getElementById("dayDuration").innerHTML = "Pozostało " + dayLight() + " światła dziennego.";
        console.log("Day")
      } else if (dateNow >= sunSet && dateNow < civilEnd) {
        document.getElementById("dayDuration").innerHTML = "Trwa noc";
        console.log("Sunset")
      } else {
        document.getElementById("dayDuration").innerHTML = "Trwa noc";
        console.log("Night")
      }
    }
    const mainUpdate = setInterval(sunPosition, 1000); // update every 1s
    sunPosition();
  })
}
const mainUpdate = setInterval(sunCycle, 3600000); // update every 1h
sunCycle()
