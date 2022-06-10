// get the wedding date
const weddingDate = new Date("Nov 26, 2022 15:30:00").getTime();
// const weddingDate = new Date("Jun 7, 2022 22:30:00").getTime();

// do the magic
let sec = setInterval(function() {

  // get right now
  const rightNow = new Date().getTime();

  // get the difference
  const diff = weddingDate - rightNow;

  // math
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  // let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days === 1) {
    // display amanhã
    document.getElementById("countdown").innerHTML = 
      "<div class=\"countdown-wrap\">\
        <h1>É AMANHÃ!</h1>\
      </div> ";
  } else if (days === 0) {
    // display é hoje
    document.getElementById("countdown").innerHTML = 
      "<div class=\"countdown-wrap\">\
        <h1>É HOJE!</h1>\
      </div> ";
  } else {
    // display vários dias
    document.getElementById("countdown").innerHTML = 
      "<div class=\"countdown-wrap\">\
        <p class=\"number-prefix\">Faltam</p>\
        <p class=\"number\">" + days + "</p> \
        <p class=\"number-sufix\">Dias</p>\
       </div> ";
  }


  // Times Up!
  if (diff < 0) {
    clearInterval(sec);
    document.getElementById("countdown").innerHTML = 
      "<div class=\"countdown-wrap\">\
        <h1>ESTAMOS CASADOS!</h1>\
       </div> ";
  }
}, 1000);
