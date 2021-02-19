//  dane
const polski = {
    "Header" : {
        "items" : ["GRA","HISTORIA GIER"]
    },
    "Settings" : {
        "items" : ["Języki","Ułożenie","Zasady"]
    },
    "Hover" : {
        "item1" : ["Polski","Angielski"],
        "item2" : ["Po Lewej", "Po Prawej"]
    }
}

const angielski = {
    "Header" : {
        "items" : ["GAME","GAME HISTORY "]
    },
    "Settings" : {
        "items" : ["Languages","Set","Rules"]
    },
    "Hover" : {
        "item1" : ["POLISH","ENGLISH"],
        "item2" : ["On Left", "On Right"]
    }
}


let jezyk;

// wczytanie danych

const lans = document.querySelectorAll(".lan_item");


lans.forEach(l => {
    l.addEventListener("click", (e) => {
        let chooseLan = new Promise(resolve => {
            switch(e.path[0].dataset.jezyk){
                case "polski" : jezyk = polski ; break;
            }
            resolve(jezyk)
        })

        chooseLan.then(r => {
            setLan()
        })
        
    })
})

// ustawianie jezyka


function setLan(first = true){
    let writeData = new Promise(resolve => {
        document.querySelectorAll(".nav_item")
        .forEach((i,p) => i.innerHTML = jezyk["Header"].items[p])
        document.querySelectorAll(".settings_item")
        .forEach((i,p) => i.innerHTML = jezyk["Settings"].items[p])
        resolve(document.querySelectorAll(".nav_item"))
        document.querySelectorAll(".hover_item").forEach((l,b) => {
            l.innerHTML = jezyk.Hover.item1[b];
            l.dataset.value = jezyk.Hover.item1[b];
        })
    })
    
    if(first){
        writeData.then(r => {
            setTimeout(() => {
                document.querySelector(".lan_list").style.top  = "-500px";
                setTimeout(() => {
                    document.querySelector(".languages").style.opacity = "0"
                    setTimeout(() => {
                        document.querySelector(".languages").style.zIndex = "-100";
                        document.querySelector(".languages").style.display = "none";
                    }, 300);
                }, 300);
            }, 300);
        })
    }
}


// settings 

let settings = document.querySelector(".settings");
let settingsOpen = false;

let itemHover = document.querySelectorAll(".item_hover");
let settingHover = document.querySelector(".settings_hover")
let settingBox = document.querySelector(".settings_box")
let list = document.querySelector(".hover_list")

settings.addEventListener("click", ShowSettings)

// pokazywanie ustawien

function ShowSettings(){

    if(!settingsOpen){
        settingsOpen = !settingsOpen
        settingBox.style.opacity = "1";
        settingBox.style.left = "1rem"

        window.addEventListener("click", ListenClick)

    }else if(settingsOpen) {
        settingsOpen = !settingsOpen
        settingBox.style.opacity = "0";
        settingBox.style.left = "-40rem"
    }

}

// zamykanie ustawien jak sie kliknie poza okno ustawien

function ListenClick(e){
    let clickList = ["settings_box","setting_list","settings_item", "hover_list","settings_hover","hover_item","settings_btn"];

    if(!clickList.includes(e.path[0].classList[0])){
        settingsOpen = false;
        settingBox.style.opacity = "0";
        settingBox.style.left = "-40rem"
        window.removeEventListener("click", ListenClick)
    }
}

// settings hover box 

itemHover.forEach(l => {
    l.addEventListener("mouseover", ShowHoverSettings);
    settingBox.addEventListener("mouseleave", HideHoverSettings)
})

// ustawienia na najechanie myszką na dane ustawienie

function ShowHoverSettings(e){
    let item = e.path[0].dataset.item;
    let listItems = ""
    let createList = new Promise(resolve => {

        jezyk["Hover"][item].forEach((i,b,c) => {
            if(b == c.length - 1){
                listItems += `<li class="hover_item" style="border-bottom:none;" data-value="${i}">${i}</li>`;
            }else{
                listItems += `<li class="hover_item" data-value="${i}">${i}</li>`;
            }
        });

        resolve(listItems)
    })
    
    createList.then(r => {
        list.innerHTML = r
        document.querySelectorAll(".hover_item").forEach(l => l.addEventListener("click", (e) => settingsChange(e)))
    })

    createList.then(r => {

        setTimeout(() => {
            settingHover.style.opacity = "1"
        }, 50);

        let BoxCoords = e.path[0].getBoundingClientRect();
        let settingBoxCoords = settingBox.getBoundingClientRect()
        settingBox.style.width = "20rem"
        settingHover.style.top = ((settingBoxCoords.top - BoxCoords.top) * -1) -8 +"px";
        settingHover.style.left = (BoxCoords.left + BoxCoords.width + 5) +"px";

    })

}

// chowanie ustawień danego ustawienia na które sie najechało po tym jak sie zjedzie z tych ustawien

function HideHoverSettings(){
        settingHover.style.opacity = "0"
        settingHover.style.top = "0";
        settingHover.style.left = "-40rem";
        settingBox.style.width = "auto"
        list.innerHTML = "";
}

// zmiana jezyka poprzez ustawienia 


function settingsChange(e){
    let value = e.path[0].dataset.value;

    switch(value){
        case jezyk["Hover"]["item1"][0] : 
            jezyk = polski;
            setLan(first = false);
        ; break;
        case jezyk["Hover"]["item1"][1] : 
            jezyk = angielski;
            setLan(first = false); 
        ; break;
    }
}






// zacznięcie gry 




let start = document.querySelector(".btn_start");
let user1 = document.querySelector(".user_1");

let user1Points = {
    jedynki : 0,
    dwojki : 0,
    trojki : 0,
    czworki : 0,
    piatki : 0,
    szostki : 0,
    sumax1 : 0,
    trzyx : 0,
    czteryx : 0,
    full : 0,
    maly: 0,
    duzy: 0,
    general : 0,
    szansa : 0,
    sumax2: 0,
    razem : 0,
}

let user2Points = {
    jedynki : 0,
    dwojki : 0,
    trojki : 0,
    czworki : 0,
    piatki : 0,
    szostki : 0,
    sumax1 : 0,
    trzyx : 0,
    czteryx : 0,
    full : 0,
    maly: 0,
    duzy: 0,
    general : 0,
    szansa : 0,
    sumax2: 0,
    razem : 0,
}

let user3Points = {
    jedynki : 0,
    dwojki : 0,
    trojki : 0,
    czworki : 0,
    piatki : 0,
    szostki : 0,
    sumax1 : 0,
    trzyx : 0,
    czteryx : 0,
    full : 0,
    maly: 0,
    duzy: 0,
    general : 0,
    szansa : 0,
    sumax2: 0,
    razem : 0,
}

let user4Points = {
    jedynki : 0,
    dwojki : 0,
    trojki : 0,
    czworki : 0,
    piatki : 0,
    szostki : 0,
    sumax1 : 0,
    trzyx : 0,
    czteryx : 0,
    full : 0,
    maly: 0,
    duzy: 0,
    general : 0,
    szansa : 0,
    sumax2: 0,
    razem : 0,
}

start.addEventListener("click", (e) => {
    
    StartGame(user1)

})

function StartGame(user){

    let Game = new Promise(resolve => {
        let score = FirstRole(user)

        resolve(score)
    })

    Game.then(r => {

        CountScore(r,user)

    })

}




function FirstRole(user){

    // dla podanego user powinno sie pobrac jego kostki i wykonać wylosowanie
    // zastosowanie Math.random do wylosowania 1 - 5 liczby potem wykonanie animacji która obróci każdą kostkę na daną stronę gdzie
    // znajduje sie liczba oczek taka jaka została wylosowana za pomocą switch pod sam koniec w tablicy zwraca wylosowane kostki
    // w kolejnosci od lewej -> lewa 1 korstka = 1 losowy numer 

}

// let s = [];

// for(let i = 0; i < 5 ; i++){
//     let r = Math.ceil(Math.random() * 6)
//     s.push(r)
// }

// CountScore(s,user1)


function CountScore(score,user){

    user = user.dataset.user;

    let tablica = document.querySelectorAll(`[data-player="${user}"]`);

    console.log(tablica)

    let jedynki = score.filter(i => i == 1)
    jedynki != 0 ? jedynki = jedynki.reduce((a,b) => a + b) : jedynki = 0;

    let dwojki = score.filter(i => i == 2)
    dwojki != 0 ? dwojki = dwojki.reduce((a,b) => a + b) : dwojki = 0;

    let trojki = score.filter(i => i == 3)
    trojki != 0 ? trojki = trojki.reduce((a,b) => a + b) : trojki = 0;

    let czworki = score.filter(i => i == 4)
    czworki != 0 ? czworki = czworki.reduce((a,b) => a + b) : czworki = 0;

    let piatki = score.filter(i => i == 5)
    piatki != 0 ? piatki = piatki.reduce((a,b) => a + b) : piatki = 0;

    let szostki = score.filter(i => i == 6)
    szostki != 0 ? szostki = szostki.reduce((a,b) => a + b) : szostki = 0;

    let trzyx = 0;
    let czteryx = 0;
    let full = 0;

        let set = new Set(score)
        let t = []
        set.forEach(s => t.push(s))

        if(t.length <= 3){
            t.map(x => {

                let c = 0;

                score.map(i => {
                    if(i == x){
                        c++;
                    }
                })
                if(t.length == 2 && c == 3){
                    full = 25;
                }

                if(c == 3){
                    trzyx = score.reduce((a,b) => a + b) 
                }else if(c == 4){
                    czteryx = score.reduce((a,b) => a + b) 
                }

            })
        }

    let maly = 0;
    let duzy = 0;

        if(t.length >= 4){

            let sort = [...t]
            sort = sort.sort((a,b) => a - b)
            
            let malycheck = [
                [sort.includes(1),sort.includes(2),sort.includes(3),sort.includes(4)].every(a => a),
                [sort.includes(2),sort.includes(3),sort.includes(4),sort.includes(5)].every(a => a),
                [sort.includes(3),sort.includes(4),sort.includes(5),sort.includes(6)].every(a => a),
            ];

            let duzycheck = [
                [sort.includes(1),sort.includes(2),sort.includes(3),sort.includes(4),sort.includes(5)].every(a => a),
                [sort.includes(2),sort.includes(3),sort.includes(4),sort.includes(5),sort.includes(6)].every(a => a),
            ];

            if(malycheck.some(a => a)){
                maly = 30;
            }
            if(duzycheck.some(a => a)){
                duzy = 40;
            }
            
        }

    let general = 0;

        if(t.length == 1){

            general = 50;

        }

     let szansa = score.reduce((a,b) => a + b);

    console.log(score,jedynki,dwojki,trojki,czworki,piatki,szostki,trzyx,czteryx,full,maly,duzy,general,szansa)
}