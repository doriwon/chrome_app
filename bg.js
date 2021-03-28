const body = document.querySelector("body"),
      imageNumber = 6;

function paintImage(imgNumber){
    const image = new Image(); // const img = document.createElement("img") 와 같은 의미
    image.src = `images/${imgNumber + 1}.jpg`; //0부터 시작하기 때문
    body.prepend(image); //appendChild : 부모(body)의 마지막 자식으로 붙임 <-> prepend : 첫 자식으로 붙임
    image.classList.add('bgImage');
}
function genRandom(){
    //Math.random() * 6; //0~6사이의 숫자를 랜덤으로 생성
    //Math.floor(3.9) //= 3 : 소수점 버림(내림)
    //Math.ceil(3.9) //= 4 : 소수점 올림
    const number = Math.floor(Math.random() * imageNumber);
    return number;
}
function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
};

init();