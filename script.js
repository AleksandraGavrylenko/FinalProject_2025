const hungerBar = document.querySelector('#hungerBar')
const feedBtn = document.querySelector('#feed')
const foodAmount = document.querySelector('#availableFood')
const hungerBarList = document.querySelector('#hungerBarList')
const availableFoodBar = document.querySelector('#availableFood')

//storeHungerValue(5,5)

function storeHungerValue(a,b){
    let hungerValue = a
    localStorage.setItem('hungerValue', hungerValue)
    let availableFood = b
    localStorage.setItem('availableFood', availableFood)
}


function feed(){
   let availableFood = localStorage.getItem('availableFood')
    if(availableFood>0){
       hungerValue = localStorage.getItem('hungerValue')
        availableFood--
        hungerValue++
        storeHungerValue(hungerValue,availableFood)
        updateStatusBars()
    }
    else{
        alert('no food available right now')
    }
}

function addFood(){
    let availableFood=localStorage.getItem('availableFood')
    availableFood++
    localStorage.setItem('availableFood', availableFood)
    updateStatusBars()
}

function createHungerBar(){
    hungerBarList.innerHTML = ''
    let hungerValue = localStorage.getItem('hungerValue')
    for(i=0;i<hungerValue;i++){
        const li=document.createElement('li')
        li.className = 'hungerBarItem'
        li.textContent='[]'
        hungerBarList.appendChild(li)
        console.log('li appended')
    }
}
function createAvailableFoodBar(){
    availableFoodBar.innerHTML = ''
    let availableFood = localStorage.getItem('availableFood')
    for(i=0;i<availableFood;i++){
        const li=document.createElement('li')
        li.className = 'availableFoodItem'
        Image = document.createElement('img')
        Image.src = 'images/banana.png'
        availableFoodBar.appendChild(li)
        console.log('li appended')
    }
}
function updateStatusBars(){
    createAvailableFoodBar()
    createHungerBar()
    faceChanger()
}
setInterval(()=>{
    let hungerValue = localStorage.getItem('hungerValue')
    if(hungerValue <= 0){
        alert('pls feed ur pet!')
    }
    else{
    hungerValue --
    localStorage.setItem('hungerValue', hungerValue)
    updateStatusBars()
    }
},60000)


document.querySelector('#feedBtn').addEventListener('click',feed)
document.querySelector('#moreFoodBtn').addEventListener('click', addFood )
window.addEventListener('DOMContentLoaded',()=>{
    updateStatusBars()
})




function faceChanger(){
    let hungerValue = localStorage.getItem('hungerValue')
    if(hungerValue<3){
        document.querySelector('#face').src = 'images/thumbnail_angry monkey.png'
    }
    else if(hungerValue<6){
        document.querySelector('#face').src = 'images/thumbnail_happy monkey.png'
    }
    else if(hungerValue<9){
        document.querySelector('#face').src = 'images/thumbnail_fed monkey.png'
    }
    
}