const vendingMachine =  document.querySelector('.vending-machine')
const listItem = document.querySelector('.list-item')
const buttonItem = document.querySelector('button-item')
const textBalance = document.querySelector('.text-balance')
const buttonReturn = document.querySelector('.button-return')
const inputPut = document.querySelector('input-put')
const buttonPut = document.querySelector('button-put')
const buttonStaged = document.querySelector('button-staged')
const buttonGet = document.querySelector('button-get')
const textTotal =document.querySelector('text-total')


//콤마 제거
function rmComma(str){
    str = String(str);
    return str.replace(/[^/d]+/g,"");
}
//콤마 추가
function addComma(num) {
    num=String(num);
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
}
//변수 : 소지금 콤마제거해서 가져오기
let cash = +rmComma(cashStr.innerText);

//기능 : 화면에 입금액, 소지금 출력
function doPrint(){
    balanceStr.innerText = `${addComma(sumDeposit)}원`;
    cashStr.innerText = `${addComma(cash)}원`;
    inpDeposit.value = "";
}