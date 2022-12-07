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
const myMoney = document.querySelector(".text-mymoney");
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

// 거스름 돈 반환 후 잔액 0, 소지금에 잔액 추가

const buttonReturn = document.querySelector(".button-return");
buttonReturn.addEventListener('click', () => {
    myMoney.textContent = parseInt(myMoney.textContent) + parseInt(textBalance.textContent);
    textBalance.textContent = 0;
})

// 선택한 콜라 화면

const displayGetCola = document.querySelector(".list-item-get");

// 선택한 콜라 수량 변경
function itemCount(colaName){
    // getItem에 동일 item이 있는 경우 수량 변경
    colaObject[colaName] ? colaObject[colaName] += 1 : colaObject[colaName] = 1;
    console.log(colaObject);

    // 10개 이상 선택시 품절
    if(colaObject[colaName] >= 10){
        soldOut(colaName, colaObject[colaName])
    }

    // 콜라 수량 변경 요청 온 콜라이름과 기존에 등록된 콜라들 중 맞는 이름을 찾아 해당 콜라 수량을 변경.
    for(let i = 0; i < displayGetCola.children.length; i++){
        if(displayGetCola.children[i].dataset.value === colaName){
            displayGetCola.children[i].lastElementChild.innerHTML = colaObject[colaName];
        }
    }
}

function soldOut(colaItem, colaItemCount){
    for(let j = 0; j < getListCola.children.length; j++){
        if(getListCola.children[j].dataset.value === colaItem){
            if(colaItemCount >= 10){
                getListCola.children[j].classList.add("soldout");
            } else{
                getListCola.children[j].classList.remove("soldout");
            }
        }
    }
}

// getItem에서 item 클릭시 수량 감소.
displayGetCola.addEventListener("click", (event)=>{
    // 외부 클릭 예외처리
    event.target.className === "list-item-get" ? "" : getItemListCount(event);
})

function getItemListCount(event){
    let clickedItem = event.path.find(item => item.className === "list-item-get");
    console.log(clickedItem.children);
    let colaName = clickedItem.children[0].attributes[0].value;
    let colaCount = clickedItem.children[0].children[2];
    if(colaCount.innerText === "1"){
        delete colaObject[colaName];
        // console.log(clickedItem);
        clickedItem.children[0].outerHTML = "";
    } else {
        colaCount.innerText -= 1;
        colaObject[colaName] -= 1;
    }

    if(colaObject[colaName] <= 10){
        soldOut(colaName, colaObject[colaName]);
    }
}

// item 클릭시 list-item-get에 저장
const getListCola = document.querySelector(".list-item");
let colaObject = {};
getListCola.addEventListener('click', event=>{
    const clickedCola = event.target.dataset.value;
    // item 밖에 클릭시 동작 예외 처리
        if(event.target.localName !== "ul"){
            // 잔액이 없는 경우 콜라 선택 불가.
            if(parseInt(textBalance.textContent)>=1000){
                Object.keys(colaObject).includes(clickedCola) ? itemCount(clickedCola) : newItem(clickedCola, event);
            }
        }
})

function newItem(clickedCola, event){
    displayGetCola.insertAdjacentHTML("afterbegin", creatGetHTMLString(event));
    itemCount(clickedCola);
}

function creatGetHTMLString(item){
    let className = item.target.dataset.value;
    let array = className.split("");
    // array.splice(0,0);
    className = array.join("");
    return `
    <div data-value="${className}" class = "list-item-get li">
    <img
        src="./src/images/${className}.svg"
        alt = "${className} cola"
        class = "img-item"
    />
    <strong class = "text-item">${className}</strong>
    <strong class = "number-counter"></strong>
    `
}

// 획득 버튼 클릭시
const buttonGetItem = document.querySelector(".button-staged");
buttonGetItem.addEventListener('click', () => {
    // 총 수량 * 1000원 > 잔액 = 획득 불가, 경고 출력
    // 총 수량 * 1000원 < 잔액 = 정상 획득, 획득 음료 list에 추가
    let totalCount = 0;
    for(let i=0; i < displayGetCola.children.length; i++){
        totalCount += parseInt(displayGetCola.children[i].children[2].innerText);
    }

    if(totalCount * 1000 > parseInt(textBalance.textContent)){
        alert("잔액이 부족합니다.")
    } else if(displayGetCola.children.length === 0){
        // displayGetCola에 아무것도 없을 경우 예외 처리
        return
    } else{
        getResult();
        // 잔액 차감 및 콜라 아이템 초기화
        textBalance.textContent -= totalCount * 1000;
        colaObject = new Object(); // item초기화
        displayGetCola.innerHTML = `` // list-item-get초기화
        totalPrice();
    }
})

// 획득한 음료에 아이템 표시.
const result = document.querySelector(".list-item-get.result");
function getResult(){
    result.insertAdjacentHTML("afterbegin", displayGetCola.innerHTML);
}

//총 금액 변경
const textTotalPrice = document.querySelector(".text-total");
function totalPrice(){
    let total = 0;
    for(let i = 0; i < result.children.length; i++){
        total += parseInt(result.children[i].children[2].textContent);
    }
    textTotalPrice.textContent = total * 1000;
}

// json 함수 호출
getJson()
    .then(items => {
        displayItems(items)
    });