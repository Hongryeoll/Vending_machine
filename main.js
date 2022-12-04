'use strict';

//json 데이터 호출
function getJson(){
    return fetch('./cola.json')
    .then(Response => Response.json())
    .then(json => json.items)
    .catch(error => alert(error))
}

