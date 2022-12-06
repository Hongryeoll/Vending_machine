'use strict';

//json 데이터 호출
function getJson(){
    return fetch("./src/cola.json")
        .then(Response=>Response.json())
        .then(json=>json.items)
        .catch(error=>alert(error))
}

// item들 디스플레이에 html로 추가
function displayItems(items){
    const container = document.querySelector('.list-item');
    container.innerHTML = items.map(item=>displayItemsList(item)).join('');
}

// 각 item들 html로 변경
function displayItemsList(item){
    return `
    <li data-value="${item.name}" class = "button-item">
        <img
            src = ${item.image}
            alt = "${item.color}"
            class = "img-item"
        />
        <strong class = "title-item">${item.name}</strong>
        <strong class = "text-price">${item.price}원</strong>
    </li>
    `
}

// 입금 클릭시 잔액 변경.
const buttonDeposit = document.querySelector(".button-put");
const textDepsit = document.querySelector(".input-put");
const myMooney = document.querySelector(".text-mymoney");
const textBalance = document.querySelector(".text-balance");

buttonDeposit.addEventListener('click', () => {
    // 입금액 공백에 대한 잔액 예외처리
    if(textDepsit.value == ''){
        textDepsit.value = 0;
    }
    // 기존 추가 입금액 저장
    textBalance.textContent = parseInt(textDepsit.value) + parseInt(textBalance.textContent);
    // 임금 후 금액 초기화
    textDepsit.value = null;
})

// json 함수 호출
getJson()
    .then(items => {
        displayItems(items)
    });