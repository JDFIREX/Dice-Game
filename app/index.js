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
let repeatBtn = document.querySelector(".repeat_btn")
let user1 = document.querySelector(".user_1");
let user2 = document.querySelector(".user_2");
let user3 = document.querySelector(".user_3");
let user4 = document.querySelector(".user_4");

let defaultPoints = {
    jedynki : {
        score : 0,
        confirm : false
    },
    dwojki : {
        score : 0,
        confirm : false
    },
    trojki : {
        score : 0,
        confirm : false
    },
    czworki : {
        score : 0,
        confirm : false
    },
    piatki : {
        score : 0,
        confirm : false
    },
    szostki : {
        score : 0,
        confirm : false
    },
    sumax1 : 0,
    trzyx : {
        score : 0,
        confirm : false
    },
    czteryx : {
        score : 0,
        confirm : false
    },
    full : {
        score : 0,
        confirm : false
    },
    maly: {
        score : 0,
        confirm : false
    },
    duzy: {
        score : 0,
        confirm : false
    },
    general : {
        score : 0,
        confirm : false
    },
    szansa : {
        score : 0,
        confirm : false
    },
    sumax2: 0,
    razem : 0
}
let user1Points = JSON.parse(JSON.stringify(defaultPoints))
let user2Points = JSON.parse(JSON.stringify(defaultPoints))
let user3Points = JSON.parse(JSON.stringify(defaultPoints))
let user4Points = JSON.parse(JSON.stringify(defaultPoints)) 



let round = 0;
let repeat = 0;
let currentUser = 0;

start.addEventListener("click", (e) => {
    
    start.style.opacity = "0"

    StartGame(user1)

    setTimeout(() => {
        start.style.display = 'none'
    }, 300);

})

function StartGame(user){

    currentUser = Number(user.dataset.user)

    if(user.dataset.user == "1"){
        if(round < 13){
            round++
            repeat = 0;
            FirstRole(user)
        }else{
            console.log("koniec")
            console.log(user1Points)
            console.log(user2Points)
            console.log(user3Points)
            console.log(user4Points)
        }
    }else{
        BotRole(user)
    }

}

// bot 

function BotRole(user){

    let kostki = user.querySelector(".kostki");

    let s = []

    let randomScore = new Promise(resolve => {
        for(let i = 0; i < 5 ; i++){
            let r = Math.ceil(Math.random() * 6)
            s.push(r)
        }

        SetKostkiPoints(s,user,kostki)
        // CountScore(s,user,kostki,time = 1)
    })



}

//  my - gracz 1

function FirstRole(user){

    repeat = 0;

    let kostki = user1.querySelector(".kostki");

    repeatBtn.style.display = "block";
    setTimeout(() => {
        repeatBtn.style.opacity = "1";
    }, 300);

    // losowanie punktow

    let s = [];

    let randomScore = new Promise(resolve => {
        for(let i = 0; i < 5 ; i++){
            let r = Math.ceil(Math.random() * 6)
            s.push(r)
        }

        resolve(s)
    })

    // ustwanie punktow dla losow i tworzenie mozliwosci kolejnego losu 

    randomScore.then(r => {
        
        repeatBtn.addEventListener("click",NewRole,true)

        SetKostkiPoints(r,user,kostki)

        for(let i = 0; i <= 4 ; i++){
            kostki.children[i].addEventListener('click', kostkaSave,true)
        }

    })

}

//   rotacja kostek

const rzucKostka = (kostka,x) => {
    
    switch(x){
        case 1:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateX(0deg) rotateY(0deg)";
        ;break;
        case 2:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateY(-90deg) rotateX(0deg)";
        ;break;
        case 3:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateX(90deg) rotateY(0deg)";
        ;break;
        case 4:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateX(-90deg) rotateY(0deg)";
        ;break;
        case 5:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateY(90deg) rotateX(0deg)";
        ;break;
        case 6:
            kostka.dataset.val = Number(x);
            kostka.style.transform ="rotateX(180deg) rotateY(0deg)";
        ;break;
    }

}

// ustwia punkty kostek i wywoluje rotacje

const SetKostkiPoints = (r,user,kostki,time = 1) => {
    
    let mapPoints = new Promise (resolve => {

        r.map((x,b) => {

            switch(b){
                case 0 : 
                    if(user.querySelector(".kostka_1").dataset.save == "false"){
                        rzucKostka(user.querySelector(".kostka_1"),x)
                    };
                break;
                case 1 : 
                    if(user.querySelector(".kostka_2").dataset.save == "false"){
                        rzucKostka(user.querySelector(".kostka_2"),x)
                    };
                break;
                case 2 : 
                    if(user.querySelector(".kostka_3").dataset.save == "false"){
                        rzucKostka(user.querySelector(".kostka_3"),x)
                    };
                break;
                case 3 : 
                    if(user.querySelector(".kostka_4").dataset.save == "false"){
                        rzucKostka(user.querySelector(".kostka_4"),x)
                    };
                break;
                case 4 : 
                    if(user.querySelector(".kostka_5").dataset.save == "false"){
                        rzucKostka(user.querySelector(".kostka_5"),x)
                    };
                break;
                default: null; break;
            }
    
        })

        resolve(r)

    })

    mapPoints.then(r => {

        let points = [];

        for(let i = 0; i < 5; i++){

            points.push(Number(kostki.children[i].dataset.val))

        }

        CountScore(points,user,kostki,time)

    })
    

}

// klikajac kostke zabezpiecza ja przed kolejna rocja

const kostkaSave = (e) => {


    let save = new Promise(resolve => {

        e.path[1].dataset.save == "true" ? e.path[1].dataset.save = "false" : e.path[1].dataset.save = "true";

        resolve(e.path[1])
    })
    
    save.then(r => {

        if(r.dataset.save == "true"){
            for(let i = 0 ;i <= 5; i++){
                r.children[i].style.backgroundColor = "red";
            }
        }else{
            for(let i = 0 ;i <= 5; i++){
                r.children[i].style.backgroundColor = "white";
            }
        }
        
    })

}

// kolejna rzut w rundzie

const NewRole = (e) => {
    
    let kostki = user1.querySelector(".kostki");

    repeat++;


    if(repeat < 3){


        let role = new Promise(resolve => {

            s = [];

            for(let i = 0; i < 5 ; i++){
                let r = Math.ceil(Math.random() * 6)
                s.push(r)
            }

            resolve(s)

        })

        role.then(r => {

            SetKostkiPoints(r,user1,kostki,time = 2)

        })

        if(repeat == 2){
            repeatBtn.style.opacity = "0";
            setTimeout(() => {
                repeatBtn.style.display = "none";
            }, 300);

            for(let j = 0 ; j < 5 ; j++){
                kostki.querySelectorAll(".kostka_side").forEach(k => k.style.backgroundColor = "white" )
                kostki.children[j].removeEventListener('click', kostkaSave,true)
                repeatBtn.removeEventListener("click", NewRole,true)
            }
        }


    }
    
}


//  zliczanie punktów

function CountScore(score,user,kostki,time){

    let counting = new Promise(resolve => {

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


        let table = [
            jedynki,
            dwojki,
            trojki,
            czworki,
            piatki,
            szostki,
            trzyx,
            czteryx,
            full,
            maly,
            duzy,
            general,
            szansa
        ]

        resolve(table)

    })

//  ustawianie punktow dla danego gracza

    counting.then(r => {


        user = user.dataset.user;

        let tablica = document.querySelectorAll(`[data-player="${user}"]`);


        switch(user){

            case "1" :
                SetPoints(tablica,user1Points,r,user,kostki,time)
            ;break;
            case "2" :
                SetPoints(tablica,user2Points,r,user,kostki,time)
            ;break;
            case "3" :
                SetPoints(tablica,user3Points,r,user,kostki,time)
            ;break;
            case "4" :
                SetPoints(tablica,user4Points,r,user,kostki,time)
            ;break;
        }

    })

    
}

// ustawianie punktow w tabeli

function SetPoints(tablica,userPoints,score,user,kostki,time){

    // potwierdzanie punktow

    const confirmPoints = (e) => {

        // czyszczenie funkcji kostek

        for(let j = 0 ; j < 5 ; j++){
            kostki.querySelectorAll(".kostka_side").forEach(k => {
                k.style.backgroundColor = "white"
            } )
            kostki.children[j].dataset.save = "false"
            kostki.children[j].removeEventListener('click', kostkaSave,true)
            repeatBtn.removeEventListener("click", NewRole,true)
        }
    
    
        repeatBtn.style.opacity = "0";
        setTimeout(() => {
            repeatBtn.style.display = "none";
        }, 300);

        // przypisywanie kliknietych punkow jako stalych nie zmiennych do konca gry
    
        let confirm = new Promise(resolve => {
            let value = Number(e.path[0].innerHTML)
            let cat = e.path[0].dataset.cat;
    
            userPoints[cat].score = value;
            userPoints[cat].confirm = true;
    
    
            tablica.forEach(t => {
                t.removeEventListener("click", confirmPoints,true)
            })
            resolve(tablica)
        })

        confirm.then(r => {
    
            e.path[0].style.backgroundColor = "rgba(0, 0, 0, 0.603)"
    
            clearAndSumTable(r,userPoints) 
    
        })
    
        // wywolanie bota

        confirm.then(r => {
            setTimeout(() => {
                StartGame(user2)
            }, 2000);
        })
        
    
    }


    // ustawanie punktow kiedy gra bot

    const BotConfirmPoints = () => {

        // szukanie najwyższej liczby punktow

        let findMaxPoint = new Promise(resolve => {
            let sort = [...score];
            sort = sort.sort((a,b) => a - b).reverse();
            let pos = 0;
            let max = sort[pos];
            let index;
    
            let findIndex = () => {
    
                index = score.indexOf(max)   
    
                if(max == 0){
    
                    let i = tablePoints.length - 1;
                    let f = false;
                    while(f == false){
    
                        if(userPoints[tablePoints[i].dataset.cat].confirm == false){
    
                            let value = Number(tablePoints[i].innerHTML)
                            let cat = tablePoints[i].dataset.cat;
                            userPoints[cat].score = value;
                            userPoints[cat].confirm = true;
                            index = i;
                            f = true;
                        }
    
                        i--;
                    }
    
                }else if(userPoints[tablePoints[index].dataset.cat].confirm == true){
                    pos++;
                    max = sort[pos];
                    findIndex();
                }else{
                    let value = Number(tablePoints[index].innerHTML)
                    let cat = tablePoints[index].dataset.cat;
                        userPoints[cat].score = value;
                        userPoints[cat].confirm = true;
                }
            }
    
            findIndex()
    
            
    
            resolve(tablePoints[index])
    
        })
    
        // zatwierdzanie punkktow

        findMaxPoint.then(r => {
    
            r.style.backgroundColor = "rgba(0, 0, 0, 0.603)"
            clearAndSumTable(tablica,userPoints) ;
    
        });
    
        //wczytywanie kolejnego gracz

        findMaxPoint.then(r => {
            setTimeout(() => {
                switch(currentUser){
                    case 1: StartGame(user2); break;
                    case 2: StartGame(user3); break;
                    case 3: StartGame(user4); break;
                    case 4: StartGame(user1); break;
                }
            }, 1000);
        })
    
    
    }

    // usuwanie mozliwosci klikania punktow

    tablica.forEach(t => {
        t.removeEventListener("click", confirmPoints,true)
    })

    // tworzenie tabelicy tylko z polami w ktorych maja sie znajdowac punkty

    let tablePoints = []
    // wpisywanie w td punktow

    let createTable = new Promise(resolve => {

        tablica.forEach(t => {
            if(t.classList == "points"){
                tablePoints.push(t)
            }
        })


        resolve(tablePoints)
    })

    // rzypisywanie do pol odpowiednie im punkty

    createTable.then(r => {
        score.forEach((s,b) => {
            if(userPoints[r[b].dataset.cat].confirm == false){
                r[b].innerHTML = s;
            }
        })
    })

    // nadawanie polom mozliwosci zatwierdzania ich

    createTable.then(r => {

        if(user == "1"){
            if(time == 1){
                r.forEach(x => {
                    if(userPoints[x.dataset.cat].confirm == false){
                        x.addEventListener("click", confirmPoints,true)
                    }
                })
            }
        }
        else{
            if(time == 1){
                setTimeout(() => {
                    BotConfirmPoints()
                }, 1000);
            }
        }
        
    })

}



// czyszczenie tabeli z td które nie zostały klikniete


function clearAndSumTable(r,userPoints){

    r.forEach(t => {
        if(userPoints[t.dataset.cat].confirm == false){
            t.innerHTML = "";
        }
    })

    // obliczanie sum i łącznej sumy

    let setSuma = new Promise(resolve => {

        let setSumax1 = new Promise(resolve => {

            userPoints["sumax1"] = userPoints["jedynki"].score + 
            userPoints["dwojki"].score + 
            userPoints["trojki"].score + 
            userPoints["czworki"].score +
            userPoints["piatki"].score +
            userPoints["szostki"].score;
    
            resolve(userPoints["sumax1"])
    
        })
    
        setSumax1.then(res => {
    
            r.forEach(t => {
                if(t.dataset.cat == "sumax1"){
                    t.innerHTML = res;
                }
            })
    
        })
        
        let setSumax2 = new Promise(resolve => {
    
            userPoints["sumax2"] = userPoints["trzyx"].score + 
            userPoints["czteryx"].score + 
            userPoints["full"].score + 
            userPoints["maly"].score +
            userPoints["duzy"].score +
            userPoints["general"].score +
            userPoints["szansa"].score;
    
            resolve(userPoints["sumax2"])
    
        })
    
        setSumax2.then(res => {
    
            r.forEach(t => {
                if(t.dataset.cat == "sumax2"){
                    t.innerHTML = res;
                }
            })
    
        })

        resolve(userPoints)

    })


    setSuma.then(rr => {
        let setrazem = new Promise(resolve => {

            rr["razem"] = rr["sumax1"] + rr["sumax2"];
    
            resolve(rr["razem"])
    
        })
    
        setrazem.then(res => {

            r.forEach(t => {
                if(t.dataset.cat == "razem"){
                    t.innerHTML = res;
                }
            })
    
        })
    })

}