const hungerBar = document.querySelector('#hungerBar')
const feedBtnContainer = document.querySelector('#feed')
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
        li.innerHTML='<img class="bananaIcon" src="images/bananapeel.png" alt="">'
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
        li.innerHTML ='<img class="bananaIcon" src="images/banana.png" alt="">'
        availableFoodBar.appendChild(li)
        console.log('li appended')
    }
}
function getRandomPosition(cW,cH){
    const x= Math.floor(Math.random()*cW)
    const y= Math.floor(Math.random()*cH)
    return {x,y}
}
function feedBtnLocation(){
    
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
},6000)


document.querySelector('#feedBtn').addEventListener('click',feed)
document.querySelector('#moreFoodBtn').addEventListener('click', addFood )
window.addEventListener('DOMContentLoaded',()=>{
    updateStatusBars()
})




function faceChanger(){
    let hungerValue = localStorage.getItem('hungerValue')
    if(hungerValue<3){
        document.querySelector('#petImage').src = 'images/thumbnail_angry_monkey.png'
    }
    else if(hungerValue<6){
        document.querySelector('#petImage').src = 'images/thumbnail_happy_monkey.png'
    }
    else if(hungerValue<9){
        document.querySelector('#petImage').src = 'images/thumbnail_fed_monkey.png'
    }
    else {
        document.querySelector('#petImage').src = 'images/thumbnail_cute_monkey.png'

    }
    
}