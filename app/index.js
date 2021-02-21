//  dane
const polski = {
    "Header" : {
        "items" : ["GRA","HISTORIA GIER"]
    },
    "Settings" : {
        "items" : ["Języki","Zasady"]
    },
    "Hover" : {
        "item1" : ["Polski","Angielski"]
    },
    "Gra" : {
        "btn" : "GRAJ",
        "users" : ["Ty", "Gracz #2","Gracz #3","Gracz #4"],
        "turn" : "Rzuca"
    },
    "Table" : {
        "users" : ["Gracz #1","Gracz #2","Gracz #3","Gracz #4"],
        "points" : ["jedynki", "dwojki", "trojki", "czworki",'piatki',"szostki","suma","trzy jednakowe","cztery jednakowe","full","maly strit","duzy strit","general","szansa","suma","razem"]
    }
}

// przycisk gra i historia gier

let currentWindow = "gra";

let graBtn = document.querySelector(".item-1");
let historiaBtn = document.querySelector(".item-2");
let historiaBox = document.querySelector(".History");
let graBox = document.querySelector('.game');

graBtn.addEventListener('click', (e) => {
    if(currentWindow == "historia"){
        currentWindow = "gra";
        historiaBox.style.top = "-300vw";
        historiaBox.style.opacity = "0"
        setTimeout(() => {
            graBox.style.top = "0";
            graBox.style.opacity = "1";
        }, 250);
    }
})

historiaBtn.addEventListener("click" , (e) => {

    if(currentWindow == "gra"){
        currentWindow = "historia";
        graBox.style.top = "-300vw";
        graBox.style.opacity = "0";
        setTimeout(() => {
            historiaBox.style.top = "0vw";
            historiaBox.style.opacity = "1"
        }, 250);
    }
})


// rules

let rulesbtn = document.querySelector(".rules");
let rulesOpen = false;
let rulesClose = document.querySelector(".close");

rulesbtn.addEventListener("click", openRules)
rulesClose.addEventListener("click", closeRules)


// zamykanie okna z zasadami

function closeRules() {

    if(rulesOpen){

        rulesOpen = false;

        let rulesBox = document.querySelector('.rules_box');

        rulesBox.style.opacity = "0";
        
        setTimeout(() => {
            rulesBox.style.top = "-200vw";
        }, 300);

    }

}

// otwieranie okna z zasadami

function openRules(e) {

    rulesOpen = true;

    let rulesBox = document.querySelector('.rules_box');

    rulesBox.style.top = "0px";

    setTimeout(() => {
        rulesBox.style.opacity = "1";
    }, 300);


}


// jezyki

let jezyk = polski;

// ustawianie jezyka

function setLan(){
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
        document.querySelectorAll(".user").forEach((u,b) => {
            u.innerHTML = jezyk.Table.users[b]
        })
        document.querySelectorAll(".cat_name").forEach((u,b) => {
            u.innerHTML = jezyk.Table.points[b]
        })
        document.querySelector(".btn_start").innerHTML = jezyk.Gra.btn;
        document.querySelectorAll(".header_h1").forEach((h,b) => {
            h.innerHTML = jezyk.Gra.users[b]
        })
        if(gameStart){
            document.querySelector(".Turn_h").innerHTML = jezyk.Gra.turn;
            document.querySelector(".Turn_u").innerHTML = jezyk.Gra.users[currentUser - 1]
        }
    })
    
}

setLan()


// zacznięcie gry  dane

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

let History = []

let gameStart = false;
let tableclone =  document.querySelector(".table_main");
tableclone = tableclone.cloneNode(true);

let round = 0;
let repeat = 0;
let currentUser = 0;
let game = 0;

// zaczecie gry

start.addEventListener("click", (e) => {
    

    gameStart = true;
    start.style.opacity = "0"

    StartGame(user1)

    setTimeout(() => {
        start.style.display = 'none'
    }, 300);

})

function StartGame(user){

    currentUser = Number(user.dataset.user);

    document.querySelector(".Turn_h").innerHTML = jezyk.Gra.turn;
    document.querySelector(".Turn_u").innerHTML = jezyk.Gra.users[currentUser - 1]

    if(user.dataset.user == "1"){
        if(round < 13){
            round++
            repeat = 0;
            FirstRole(user)
        }else{
            
            GameFinish()
        }
    }else{
        BotRole(user)
    }

}
// Koniec gry

function GameFinish(){

    let finish = new Promise(resolve => {

        game ++;
        document.querySelector(".Turn_h").innerHTML = ""
        document.querySelector(".Turn_u").innerHTML = "";


        let maxpoints = [user1Points["razem"],user2Points["razem"],user3Points["razem"],user4Points["razem"]];
        let max = [...maxpoints];
        max = max.sort((a,b) => a - b).reverse();
        max = max[0]

        maxpoints = maxpoints.map(a => {
            if(a == max){
                return true;
            }else {
                return false;
            }
        })

        resolve(maxpoints)

    })
    
    finish.then(maxpoints => {
        History.unshift(
            {
                "gra" : game,
                "ty" : {
                    "score" : user1Points.razem,
                    "winner" : maxpoints[0],
                },
                "user2" : {
                    "score" : user2Points.razem,
                    "winner" : maxpoints[1]
                },
                "user3" : {
                    "score" : user3Points.razem,
                    "winner" : maxpoints[2]
                },
                "user4" : {
                    "score" : user4Points.razem,
                    "winner" : maxpoints[3]
                }
            }
        )
    })

    finish.then(r => {

        CreateHistoryGame()
        
    }) 


}

// tworzenie listy histori gier

function CreateHistoryGame(){

{/* <div class="item">
    <div class="id">Gra : 1</div>
    <div class="users">
        <div class="gracz-1 gracz" data-winner="true">
            <h1>Ty > </h1>
            <p>Punkty : 123</p>
        </div>
        <div class="gracz-2 gracz" data-winner="false">
            <h1>Gracz 2 > </h1>
            <p>Punkty : 123</p>
        </div>
        <div class="gracz-3 gracz" data-winner="false">
            <h1>Gracz 3 > </h1>
            <p>Punkty : 123</p>
        </div>
        <div class="gracz-4 gracz" data-winner="false">
            <h1>Gracz 4 > </h1>
            <p>Punkty : 123</p>
        </div>
    </div>
</div> */}

    let createNewHistoryItem = new Promise(resolve => {

        let list = document.querySelector(".list");

        let items = "";

        History.map(a => {
            items += `
                <div class="item">
                    <div class="id">Gra : ${a.gra}</div>
                    <div class="users">
                        <div class="gracz-1 gracz" data-winner="${a.ty.winner}">
                            <h1>Ty > </h1>
                            <p>Punkty : ${a.ty.score}</p>
                        </div>
                        <div class="gracz-2 gracz" data-winner="${a.user2.winner}">
                            <h1>Gracz 2 > </h1>
                            <p>Punkty : ${a.user2.score}</p>
                        </div>
                        <div class="gracz-3 gracz" data-winner="${a.user3.winner}">
                            <h1>Gracz 3 > </h1>
                            <p>Punkty : ${a.user3.score}</p>
                        </div>
                        <div class="gracz-4 gracz" data-winner="${a.user4.winner}">
                            <h1>Gracz 4 > </h1>
                            <p>Punkty : ${a.user4.score}</p>
                        </div>
                    </div>
                </div>
            `
        })

        list.innerHTML = items;

        resolve(list)

    })

    createNewHistoryItem.then(r => {

        clearCurrentData();

    })


}

// czyszczenie danych po grze

function clearCurrentData(){

    let loadTable = new Promise(resolve => {

        let tabela = document.querySelector(".tabela");
        tabela.removeChild(tabela.children[0])
        tabela.appendChild(tableclone.cloneNode(true))

        resolve(tabela)

    })

    loadTable.then(r => {

        document.querySelectorAll(".user").forEach((u,b) => {
            u.innerHTML = jezyk.Table.users[b]
        })
        document.querySelectorAll(".cat_name").forEach((u,b) => {
            u.innerHTML = jezyk.Table.points[b]
        })
    })

    loadTable.then(r => {
        
        user1Points = JSON.parse(JSON.stringify(defaultPoints))
        user2Points = JSON.parse(JSON.stringify(defaultPoints))
        user3Points = JSON.parse(JSON.stringify(defaultPoints))
        user4Points = JSON.parse(JSON.stringify(defaultPoints))
    })

    loadTable.then(r => {

        round = 0;
        repeat = 0;
        currentUser = 0;
        gameStart = false;
        repeatBtn.style.display = "none";
        setTimeout(() => {
            repeatBtn.style.opacity = "0";
            start.style.display = 'block'
            setTimeout(() => {
                start.style.opacity = "1"
            }, 300);
        }, 300);
    })



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