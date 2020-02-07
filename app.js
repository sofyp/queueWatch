let date = new Date();
let d = ("0" + date.getDate()).slice(-2);
let m =  ("0" + (date.getMonth() + 1)).slice(-2);
let y = date.getFullYear();
let getWeekday = new Array(7);
getWeekday[0] = 'Sunnuntai';
getWeekday[1] = 'Maanantai';
getWeekday[2] = 'Tiistai';
getWeekday[3] = 'Keskiviikko';
getWeekday[4] = 'Torstai';
getWeekday[5] = 'Perjantai';
getWeekday[6] = 'Lauantai';
let weekday = getWeekday[date.getDay()]
let myrtsi = 152;
let data = [];
let menu = 'https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/' + myrtsi + '/' + y + '-' + m + '-' + d;
console.log(y, m, d);
const getMenu =()=> {
    fetch(menu,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(response => response.json())
        .then((json) => {
            fixData(json);
        })
        .catch(e => console.log(e));
};

const fixData = (menuJson) => {
    let today = document.createElement('strong');
    document.getElementById('get-date').appendChild(today);
    let thisDay = weekday + ' ' + d + '.' + m + '.' + y;
    today.innerHTML = thisDay;
    const createMenu = document.getElementById('sodexo-menu');
    for(let k in menuJson.courses){
        console.log(k, menuJson.courses[k]);
        console.log('kierros');
        let menu = menuJson.courses;
        let name , allergenes, price ='';
            name = menu[k].title_fi;
            allergenes = menu[k].properties;
            price = menu[k].price;

            const menuDiv = document.createElement('DIV');
            document.getElementById('sodexo-menu').appendChild(menuDiv);

            let nimi = document.createElement('p');
            menuDiv.appendChild(nimi);
            let allergeeni = document.createElement('p');
            menuDiv.appendChild(allergeeni);
            let hinta = document.createElement('p');
            menuDiv.appendChild(hinta);

            nimi.innerHTML = name;
            allergeeni.innerHTML = allergenes;
            hinta.innerHTML = price;
    }
    let menu= menuJson.courses.forEach((t) => data.push({name: t.title_fi, allergenes: t.properties, price: t.price}));
};
getMenu();
