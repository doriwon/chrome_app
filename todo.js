const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList"),
      todosLS = "toDos";
let toDos = []; //해야할 일이 생겼을때 추가되도록 배열 생성
  
function deleteTodo(event){
    //console.log(event.target.parentNode);
    const btn = event.target,
          li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //filter : 걸러주고 true 인것만 return 후 array로 만들어줌
        //console.log(toDo.id, li.id) //toDo.id는 숫자, li.id는 string(문자열)임
        return toDo.id !== parseInt(li.id); //parseInt1: string -> 숫자로 변환
    });
    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(todosLS, JSON.stringify(toDos)); 
    //JSON.stringify : 자바스크립트 object > string으로 변환
    //local storage에는 자바스크립트 data 저장 불가. only string(문자열)
    //JSON : JavaScript Object Notation (object <-> string)
}
function paintToDo(text){
    const li = document.createElement("li"); //createElement : 엘레먼트 만들기
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌"; // 이모지: [윈도우 + . (마침표)] or [윈도우 + ; (세미콜론)]
    delBtn.addEventListener("click",deleteTodo);
    span.innerHTML = text;
    li.appendChild(delBtn); //appendChild : 괄호안에(delBtn)을 부모(li) 엘레먼트에 넣음
    li.appendChild(span);
    li.id = newId;  //각  li에 id값 주기
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(todosLS);
    if(loadedToDos !== null){
        //console.log(loadedToDos); //아까 변환한 string으로 가져옴 
        const parsedToDos = JSON.parse(loadedToDos); //JSON.parse : string > object로 변환
        //console.log(parsedToDos); //다시 object로 변환

        parsedToDos.forEach(function(toDo){//forEach : arry 안의 것들을 각각 함수로 실행
            //console.log(toDo.text)
            paintToDo(toDo.text)
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();