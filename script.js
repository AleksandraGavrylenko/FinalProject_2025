const hungerBar = document.querySelector('#hungerBar')
const feedBtn = document.querySelector('#feed')
const foodAmount = document.querySelector('#availableFood')
const hungerBarList = document.querySelector('#hungerBarList')

let availableFood = 5

function storeHungerValue(){
    let hungerValue = 5
    localStorage.setItem('hungerValue', hungerValue)
    let availableFood = 5
    localStorage.setItem('availableFood', availableFood)
}


function feed(){
    if(availableFood>0){
       hungerValue = localStorage.getItem('hungerValue')
        availableFood--
        hungerValue++
    }
}

function createHungerBar(){
    hungerValue = localStorage.getItem('hungerValue')
    for(i=0;i<hungerValue;i++){
        const li=document.createElement('li')
        li.className = 'hungerBarItem'
        li.textContent='[]'
        hungerBarList.appendChild(li)
        console.log('li appended')
    }
}



function innitApp(){
storeHungerValue()
createHungerBar()
}

innitApp()





