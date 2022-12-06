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
function itemCount(itemName){
    // getItem에 동일 item이 있는 경우 수량 변경
    colaObject[itemName] ? colaObject[itemName] += 1 : colaObject[itemName] = 1;

    // 10개 이상 선택시 품절
    if(colaObject[itemName] >= 10){
        // soldOut(itemName, colaObject[itemName])
    }

    // 콜라 수량 변경 요청 온 콜라이름과 기존에 등록된 콜라들 중 맞는 이름을 찾아 해당 콜라 수량을 변경.
    for(let i = 0; i < displayGetCola.children.length; i++){
        if(displayGetCola.children[i].dataset.value === itemName){
            displayGetCola.children[i].lastElementChild.innerHTML = colaObject[itemName];
        }
    }
}

// getItem에서 item 클릭시 수량 감소.
displayGetCola.addEventListener("click", (event)=>{
    // 외부 클릭 예외처리
    event.target.className === "list-item-get" ? "" : getItemListCount(event);
})

function getItemListCount(event){
    let clickedItem = event.path.find(item => item.className === ".list-item-get");
    let colaName = clickedItem.dataset.value;
    let colaCount = clickedItem.children[2];

    if(colaCount.innerText === "1"){
        delete colaObject[itemName];
        clickedItem.outerHTML = "";
    } else {
        itemCount.innerText -= 1;
        colaObject[itemName] -= 1;
    }

    if(colaObject[itemName] <= 10){
        soldOut(itemName, colaObject[itemName]);
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
    console.log(item.target.dataset.value);
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

// json 함수 호출
getJson()
    .then(items => {
        displayItems(items)
    });