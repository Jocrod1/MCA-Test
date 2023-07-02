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

export const isValidUrl = (urlString :string)=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}