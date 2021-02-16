//  dane
const polski = {
    "Header" : {
        "items" : ["GRA","HISTORIA GIER"]
    },
    "Settings" : {
        "items" : ["Języki","Ułożenie","Zasady"]
    }
}

const angielski = {
    "Header" : {
        "items" : ["GAME","GAME HISTORY "]
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
    })
    
    if(first){
        console.log("zamykanie")
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


document.querySelector(".item-2").addEventListener("click", () => {
    let chooseLan = new Promise(resolve => {
        jezyk = angielski;
        resolve(jezyk)
    })

    chooseLan.then(r => {
        setLan(first = false)
    })
})