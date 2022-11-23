'use strict';

//json 데이터 호출
function getJson(){
    return fetch('./src/cola.json')
    .then(response=>response.json())
    .then(json=>json.items)
    .catch(error=>alert(error))
}

// 메인컨테이너에 아이템 html로 추가
function displayMainItems(items){
    const container = document.querySelector('.list-item');
    container.innerHTML = items.map(item=>createMainHtmlString(item)).json('');
}