function get_year(){
   let CookieDate = new Date;
   CookieDate.setFullYear(CookieDate.getFullYear() +10);
   return CookieDate.toUTCString();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}


module.exports.get_year = get_year;
module.exports.getRandomInt = getRandomInt;