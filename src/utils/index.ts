import moment from "moment";

function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;
  
    // generate random number 
    let rand = Math.random();
  
    // multiply with difference 
    rand = Math.floor( rand * difference);
  
    // add with min value 
    rand = rand + min;
  
    return rand;
  }
  
  export const getRandMinutes = () : string => {
    const time = generateRandom(30, 50);
  
    const dur = moment('2000-01-01 00:00:00').add(time, "minutes");
  
    return dur.format("mm:ss")
  }