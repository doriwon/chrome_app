const weather = document.querySelector(".js-weather");
const API_KEY = "e5225ea5aab955e63a14e8325e0b4052";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch( //fetch : 데이터를 가져올 때 사용
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){ //then: 데이터가 완전히 들어온 다음 호출
        return response.json(); //json 데이터가 준비되길 대기
    }) 
    .then(function(json){ // 대기후에 json 데이터가 준비되면 호출
        //console.log(json);
        const temperature = json.main.temp; //온도 가져오기
        const place = json.name; //장소 가져오기
        weather.innerText = `${temperature} @ ${place}`
    });
}
function saveCoords(coordsObj){ //새로고침할때마다 위치를 물어보지 않도록 좌표 저장
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}
function handleGeoSucces(position){ //좌표를 가져오는데 성공
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도
    const coordsObj = {
        latitude, //latitude: latitude 객체 변수의 이름과 객체 key의 이름이 같다면 생략가능
        longitude //longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}
function handleGeoError(){ //좌표를 가져오는데 실패
    console.log('Cant access geo location');
}
function askForCoords(){ //위치 Coordinates(좌표)를 구함
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){ //localStorage에 좌표값이 없을 때만 실행
        askForCoords(); 
    }else{ //localStorage에 좌표값이 있을 때
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}
function init(){
    loadCoords();
}

init();