const hungerBar = document.querySelector('#hungerBar')
const feedBtn = document.querySelector('#feed')
const foodAmount = document.querySelector('#availableFood')
const hungerBarList = document.querySelector('#hungerBarList')

//storeHungerValue(5,5)

function storeHungerValue(a,b){
    let hungerValue = a
    localStorage.setItem('hungerValue', hungerValue)
    let availableFood = b
    localStorage.setItem('availableFood', availableFood)
}


function feed(){
   availableFood = localStorage.getItem('availableFood')
    if(availableFood>0){
       hungerValue = localStorage.getItem('hungerValue')
        availableFood--
        hungerValue++
        storeHungerValue(hungerValue,availableFood)
        createHungerBar()
    }
    else{
        alert('no food available right now')
    }
}

function addFood(){
    availableFood=localStorage.getItem('availableFood')
}

function createHungerBar(){
    hungerBarList.innerHTML = ''
    hungerValue = localStorage.getItem('hungerValue')
    for(i=0;i<hungerValue;i++){
        const li=document.createElement('li')
        li.className = 'hungerBarItem'
        li.textContent='[]'
        hungerBarList.appendChild(li)
        console.log('li appended')
    }
}



document.querySelector('#feedBtn').addEventListener('click',feed)
document.querySelector('#moreFoodBtn').addEventListener('click', addFood )
window.addEventListener('DOMContentLoaded',()=>{
    createHungerBar()
})





