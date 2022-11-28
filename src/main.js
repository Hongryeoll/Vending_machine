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
    const container = document.querySelector('.list-cola');
    container.innerHTML = items.map(item => createMainHtmlString(item)).join('');
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

const list_getItem = document.querySelector(".list-getItem");

// 선택한 콜라 수량 변경
function itemCount(item_name) {
    //getItem에 같은 item이 있는 경우 수량 변경
    cola_obj[item_name] ? cola_obj[item_name]+=1 : cola_obj[item_name]=1;

    // 5개 이상 선택시 품절
    if(cola_obj[item_name]>=5){
        soldOut(item_name, cola_obj[item_name]);
    }

    // 콜라 수량 변경 요청이 온 콜라 이름과 기존에 등록ㄷ된 콜라들 중 맞는 이름을 찾아 해당 콜라 수량을 변경.
    for(let i=0; i<con_getCola.children.length; i++) {
        if(con_getCola.children[i].dataset.value===item_name) {
            con_getCola.children[i].lastElementChild.innerText=cola_obj[item_name];
        }
    }
}

function soldOut(colaName, colaCount) {
    for(let j=0; j<list_cola.children.length; j++) {
        if(list_cola.children[j].dataset.value===colaName){
            if(colaCount>=5){
                list_cola.children[j].classList.add("soldout");
            } else {
                list_cola.children[j].classList.remove("soldout")
            }
        }
    }
}

// 입금 클릭시 잔액 변경
const button_put = document.querySelector(".button-put");
const input_put = document.querySelector(".input-put");
const text_mymoney = document.querySelector(".text-mymoney");
const text_balance = document.querySelector(".text-balance");

button_put.addEventListener('click',()=>{
    //입금액 공백일때 잔액 예외처리
    if(input_put.value==''){
        input_put.value = 0;
    }
    // 기존 추가 입금액 저장
    text_balance.textContent = parseInt(input_put.value) + parseInt(text_balance.textContent);
    // 입금 후 금액 초기화
    input_put.value=null;
})

// 거스름돈 반환 후 잔액0, 소지금에 잔액 추가
const button_return = document.querySelector(".button-return");
button_return.addEventListener('click', ()=>{
    text_mymoney.textContent = parseInt(text_mymoney.textContent) + parseInt(text_balance.textContent);
})

const button_get = document.querySelector(".button-get");
button_get.addEventListener('click', ()=>{
    // 총 수량 * 1000원(개당 가격) > 잔액이면 획득 불가. 경고 출력
    // 총 수량 * 1000원(개당 가격)) < 잔액이면 정상 획득, 음료 list에 추가
    let totalCount = 0;
    for(let i = 0; i < list_getItem.children.length; i++){
        totalCount += parseInt(list_getItem.children[i].children[2].innerText);
    }

    if(totalCount * 1000 > parseInt(text_balance.textContent)){
        alert("잔액이 부족합니다.")
    } else if (list_getItem.children.length === 0){
        //list_getItem에 아무것도 없을 경우 예외처리
        return
    } else {
        getResult();
        // 잔액차감 및 콜라아이템 초기화
        text_balance.textContent -= totalCount * 1000;
        cola_obj = new Object(); // 아이템 초기화
    list_getItem.innerHTML=``; // list-getItem 초기화
    }
})

// 획득한 음료에 아이템 표시.
const result = document.querySelector(".list-getItem.result");
function getResult(){
    result.insertAdjacentHTML("afterbegin", list-getItem.innerHTML);
}


// json 함수 호출
getJson()
    .then(items=>{
        displayMainItems(items)
    });