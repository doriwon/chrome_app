const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings"),
      userLS = "currentUser",
      showingCN = "showing";
      //querySelector : 셀렉터 다 갖고옴(id, class, tag..), 찾은 첫번째 것을 가져옴
      //querySelectorAll : 모든걸 갖고옴. 모든 엘리먼트들에 array를 줌
      //getElementById : id 갖고옴
      //getElementsByTagName : 태그로 앨리먼트를 갖고옴(input,body,html,div..)

function saveName(text){
    localStorage.setItem(userLS, text);
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value; //input에 적은 정보 저장
    paintingGreeting(currentValue);
    saveName(currentValue);
}
function askForName(){
    form.classList.add(showingCN);
    form.addEventListener("submit", handleSubmit);
}
function paintingGreeting(text){
    form.classList.remove(showingCN);
    greeting.classList.add(showingCN);
    greeting.innerHTML = `Hello ${text}`;
}
function loadName(){
    const currentUser = localStorage.getItem(userLS); //localStorage: 컴퓨터 저장소
    if(currentUser === null){
        // user is not
        askForName();
    }else{
        //user is
        paintingGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();