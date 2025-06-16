const hungerBar = document.querySelector('#hungerBar')
const feedBtnContainer = document.querySelector('#feed')
const foodAmount = document.querySelector('#availableFood')
const hungerBarList = document.querySelector('#hungerBarList')
const availableFoodBar = document.querySelector('#availableFood')
const happinessBar = document.querySelector('#happinessBar')

const startScreen = document.querySelector('#startScreen')
const deathScreen = document.querySelector('#deathScreen')
const higherContainer = document.querySelector('#higherContainer')

//storeHungerValue(5,5)
function checkScreenStatus(){
 if(localStorage.getItem('startScreenStatus')==='true'){
    startScreen.style.display = 'block'
    deathScreen.style.display = 'none'
    higherContainer.style.display = 'none'
 }else if(localStorage.getItem('deathScreenStatus')==='true'){
    startScreen.style.display = 'none'
    deathScreen.style.display = 'block'
    higherContainer.style.display = 'none'
 } else if(localStorage.getItem('higherContainerStatus')==='true'){
    startScreen.style.display = 'none'
    deathScreen.style.display = 'none'
    higherContainer.style.display = 'block'
 }
}
function storeHungerValue(a,b){
    let hungerValue = a
    if(hungerValue <= 0){
        hungerValue = 0
    } else if(hungerValue >= 10){
        hungerValue = 10
    }
    localStorage.setItem('hungerValue', hungerValue)
    let availableFood = b
    localStorage.setItem('availableFood', availableFood)
}
function storeHappinessValue(a){
let happiness = a
if(happiness===null || happiness===undefined){
    happiness=5
}
else if(happiness<=0){
    happiness=0
    death()
}
else if(happiness>=10){
    happiness=10
}
else{
happiness = a
}
localStorage.setItem('happiness',happiness)
}

function feed(){
   let availableFood = parseInt(localStorage.getItem('availableFood'))
    if(availableFood>0){
       let hungerValue = parseInt(localStorage.getItem('hungerValue'))
        availableFood--
        hungerValue++
        storeHungerValue(hungerValue,availableFood)
        document.querySelector('#petImage').src = 'images/thumbnail_fed_monkey.p3ng'
        createAvailableFoodBar()
        createHungerBar()
    }
    else{
        alert('no food available right now')
    }
}

function addFood(){
    let availableFood = parseInt(localStorage.getItem('availableFood'))
    availableFood++
    localStorage.setItem('availableFood', availableFood)
    updateStatusBars()
}

function createHungerBar(){
    hungerBarList.innerHTML = ''
    let hungerValue = parseInt(localStorage.getItem('hungerValue'))
    for(let i=0;i<hungerValue;i++){
        const li=document.createElement('li')
        li.className = 'hungerBarItem'
        li.innerHTML='<img class="bananaIcon" src="images/bananapeel.png" alt="">'
        hungerBarList.appendChild(li)
    }
}
function createAvailableFoodBar(){
    availableFoodBar.innerHTML = ''
    let availableFood = parseInt(localStorage.getItem('availableFood'))
    for(let i=0;i<availableFood;i++){
        const li=document.createElement('li')
        li.className = 'availableFoodItem'
        li.innerHTML ='<img class="bananaIcon" src="images/banana.png" alt="">'
        availableFoodBar.appendChild(li)
    }
}
function createHappinessBar(){
    happinessBar.innerHTML = ''
    let happiness = parseInt(localStorage.getItem('happiness'))
    //happiness = 5
    for(let i=0;i<happiness;i++){
        const li=document.createElement('li')
        li.className = 'happinessItem'
        li.innerHTML ='<img class="heartIcon" src="images/heart.png" alt="">'
        happinessBar.appendChild(li)
    }
}
function updateInfoP(){
     const InfoP = document.querySelector('#infoP')
     const name = localStorage.getItem('name')
     InfoP.textContent = `Hello! My name is [${name}]! Welcome to PixelPets! Please feed me, so my Hunger Bar doesn't go down to zero! If it does, my Happiness Bar will decrease! If that gets to zero, I'll die! But good news: If you pet me for 10 secs, one heart will come back!`
}
function displayLevel(){
    let p = document.querySelector('#level').querySelector('p')
    p.textContent = `Level: ${localStorage.getItem('level')}`
    
}
function displayHighScore(){
    let p = document.querySelector('#highScore').querySelector('p')
    if(localStorage.getItem('highScore')){
        
        p.textContent = `High Score: ${localStorage.getItem('highScore')}`
    }
    else{
        p.textContent = `High Score: --`
        
    }
    
}
function displayDepletion(){
    let p = document.querySelector('#depletion').querySelector('p')
    p.textContent = `Depletion: ${(localStorage.getItem('depletion'))/1000} sec`
    
}
function deathCheck(){
    const happiness = parseInt(localStorage.getItem('happiness'))
 if(happiness <= 0){
    //death()
    console.log('i died')
    death()
 }
}
function death(){
    document.querySelector('#petImage').src = 'images/grave.png'
    document.querySelector('#higherContainer').style.display = 'none'
    localStorage.setItem('deathStatus','true')
    localStorage.setItem('startScreenStatus', 'false') 
    localStorage.setItem('deathScreenStatus', 'true') 
    localStorage.setItem('higherContainerStatus', 'false') 
    localStorage.setItem('highScore',localStorage.getItem('level'))
    checkScreenStatus()
}

//console.log(localStorage.getItem('happiness'))
function getRandomPosition(cW,cH){
    const x= Math.floor(Math.random()*cW)
    const y= Math.floor(Math.random()*cH)
    return [x,y]
}
document.querySelector('#nameBtn').addEventListener('click',()=>{
   const nameChangeDiv = document.querySelector('#nameChange')
   nameChangeDiv.style.display= 'inline-block'
})
document.querySelector('#nameSubmit').addEventListener('click',()=>{
    const name = document.querySelector('#nameForm').value.trim()
    if(!name){
        alert('name invalid')
    }
    else{

        localStorage.setItem('name',name)
        updateStatusBars()
        //console.log(name)
        document.querySelector('#nameChange').style.display = 'none'
        document.querySelector('#nameForm').value = ''
    }
})
function levelUp(){
    let level = parseInt(localStorage.getItem('level'))
    if(!level){
        level = 1
    }
    level++
    let depletion = 15000 - level*500
    if(depletion < 5000) depletion = 5000 // Minimum depletion time
    localStorage.setItem('level', level)
    localStorage.setItem('depletion', depletion)
}
function restart(){
    localStorage.setItem('startScreenStatus', 'true') 
    localStorage.setItem('deathScreenStatus', 'false') 
    localStorage.setItem('higherContainerStatus', 'false') 
    storeHungerValue(5, 5) 
    storeHappinessValue(5) 
    localStorage.setItem('level', '1') 
    localStorage.setItem('depletion', '15000')
    localStorage.setItem('deathStatus', 'false')
    checkScreenStatus()
    updateStatusBars()
}
function updateStatusBars(){
    createAvailableFoodBar()
    createHungerBar()
    createHappinessBar()
    faceChanger()
    updateInfoP()
    displayLevel()
    displayHighScore()
    displayDepletion()
    deathCheck()
    checkScreenStatus()
}
function initializeGame() {
     if (!localStorage.getItem('hungerValue')) { 
        storeHungerValue(5, 5) 
    } if (!localStorage.getItem('happiness')) { 
        storeHappinessValue(5) 
    } if (!localStorage.getItem('level')) {
     localStorage.setItem('level', '1') 
     localStorage.setItem('depletion', '15000')
    } if (!localStorage.getItem('name')) { 
        localStorage.setItem('name', 'Your Pet') 
    } if(!localStorage.getItem('deathStatus')){
        localStorage.setItem('deathStatus', 'false')
    }
    
    // Only set default screen status if none exists (first time playing)
    if (!localStorage.getItem('startScreenStatus') && 
        !localStorage.getItem('deathScreenStatus') && 
        !localStorage.getItem('higherContainerStatus')) {
        localStorage.setItem('startScreenStatus', 'true') 
        localStorage.setItem('deathScreenStatus', 'false') 
        localStorage.setItem('higherContainerStatus', 'false') 
    }
} 

let gameInterval;

function startGameLoop() {
    if(gameInterval) clearInterval(gameInterval);
    
    const depletionTime = parseInt(localStorage.getItem('depletion')) || 15000
    gameInterval = setInterval(()=>{
        let hungerValue = parseInt(localStorage.getItem('hungerValue'))
        let deathStatus = localStorage.getItem('deathStatus')
        if(deathStatus !== 'true'){
            if(hungerValue <= 0){
                alert('pls feed ur pet!')
                let happiness = parseInt(localStorage.getItem('happiness'))
                happiness--
                storeHappinessValue(happiness)
            }
            else{
                hungerValue --
                localStorage.setItem('hungerValue', hungerValue)
            } 
                
            levelUp()
        }
        updateStatusBars()
    }, depletionTime)
}

let hoverTimeout
document.querySelector('#petImage').addEventListener('mouseover',()=>{
clearTimeout(hoverTimeout)

hoverTimeout = setTimeout(()=>{
    let happiness = parseInt(localStorage.getItem('happiness'))
    happiness++
    storeHappinessValue(happiness)
    updateStatusBars()
},10000)
})

document.querySelector('#petImage').addEventListener('mouseout', ()=>{
    clearTimeout(hoverTimeout)
})


document.querySelector('#feedBtn').addEventListener('click',feed)
document.querySelector('#feedBtn').addEventListener('click',()=>{
    setTimeout(()=>{
        faceChanger()
    },750)
})
document.querySelector('#moreFoodBtn').addEventListener('click', addFood)

window.addEventListener('DOMContentLoaded',()=>{
    initializeGame()
    updateStatusBars()
    startGameLoop()
})

document.querySelector('#petImage').addEventListener('mouseover',()=>{
    document.querySelector('#petImage').classList.toggle('pettingActive')
})
document.querySelector('#petImage').addEventListener('mouseout',()=>{
    document.querySelector('#petImage').classList.toggle('pettingActive')
})

document.querySelector('#startGameBtn').addEventListener('click', ()=>{
    localStorage.setItem('startScreenStatus', 'false') 
    localStorage.setItem('deathScreenStatus', 'false') 
    localStorage.setItem('higherContainerStatus', 'true') 
    checkScreenStatus()
    updateStatusBars()
    startGameLoop()
})
document.querySelector('#restartGame').addEventListener('click', restart)
document.querySelector('#restart').addEventListener('click', restart)


function faceChanger(){
    let hungerValue = parseInt(localStorage.getItem('hungerValue'))
    if(hungerValue<3){
        document.querySelector('#petImage').src = 'images/thumbnail_angry_monkey.png'
    }
    else if(hungerValue<6){
        document.querySelector('#petImage').src = 'images/thumbnail_happy_monkey.png'
    }
    else {
        document.querySelector('#petImage').src = 'images/thumbnail_cute_monkey.png'
    }
}