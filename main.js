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

// 각 item을 메인 콜라 리스트 html로 변경
function createMainHtmlString(item){
    return `
    <li data-value="${item.color}" class="list-${item.color}">
    <img
        src=${item.image}
        width="36px"
        height="65px"
        alt="${item.type}"
        class="img-${item.color}"
    />
    <p class="txt-colaName">${item.type}</p>
    <p class="txt-price">${item.price}원</p>
    </li>
    `
}