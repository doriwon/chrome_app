
const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");
function getTime(){ //시간을 얻자
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours } : ${
        minutes < 10 ? `0${minutes}` : minutes } : ${
        seconds < 10 ? `0${seconds}` : seconds
    }`; 
    // ${hours}:${minutes}:${seconds} 에서 한자리 숫자 앞에 0 붙이기 
    // ? (작은 if), : (else)
}
function init(){
    getTime();
    setInterval(getTime, 1000); // 1초 간격으로 실행
}
init();