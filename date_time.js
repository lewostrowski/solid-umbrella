const dynamicTime = setInterval(showClock, 1000); // check time every second
function showClock() {
  let c = new Date();
  let h = c.getHours();
  let m = c.getMinutes();
  let s = c.getSeconds();

  if (m < 10) {
    m = "0" + m;
  };

  if (s < 10) {
    s = "0" + s;
  };
  document.getElementById("hours").innerHTML = h;
  document.getElementById("minutes").innerHTML = m;
  document.getElementById("seconds").innerHTML = s;
}


const dynamicDate = setInterval(showDate, 1000); // check time every second
function showDate() {
  let d = new Date();
  let d_num = d.getDate();
  let d_name = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  let m_num = d.getMonth();
  let m_name = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  let y = d.getFullYear();

  document.getElementById("d_name").innerHTML = d_name[d_num];
  document.getElementById("d_num").innerHTML = d_num;
  document.getElementById("m_name").innerHTML = m_name[m_num];
  document.getElementById("year").innerHTML = y;
}
