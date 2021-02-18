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
function HideHoverSettings(){
        settingHover.style.opacity = "0"
        settingHover.style.top = "0";
        settingHover.style.left = "-40rem";
        settingBox.style.width = "auto"
        list.innerHTML = "";
}


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