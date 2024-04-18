const container = document.querySelector('.container');
const btn = document.getElementById('click');
const allbtn = document.querySelector('.btn');
const allCardBlocks = document.querySelector('.memory-card-blocks');
const block = document.querySelectorAll('.card-block')
const gameTime = document.getElementById('timer')
let tada = document.getElementById('tada')
let wah = document.getElementById('wah')
let success = document.getElementById('success')
let failure = document.getElementById('failure')
setTime()
function setTime() {//function for setting time 
    let sec = 0
    setInterval(()=>{//for repeat the action every second
        sec++//second will plus 1 every second
        const min = Math.floor( sec/60 )//min will increase every 60 secon
        const second = sec - (min*60)//second will increase by one until 60s and get back to zero
        gameTime.innerHTML = `0${min}:${second}`//print it in the document 
    },1000)
    
}
btn.addEventListener('click', btnclick);
function btnclick(){
    allbtn.classList.add('none');
    container.classList.remove('null');
};
let duration = 1000;


let cardBlocks = Array.from(allCardBlocks.children);// this for gather all children(divs inside parent) from th parents

let orderRange = [...Array(cardBlocks.length).keys()];//(3dots[...] means extract whatever in the array inside the array like push method)//create this line for add an array have cardBlocks.length(16 element) and grab the keys(number like 0,1,2)
shuffle(orderRange)//invoking the function 
cardBlocks.forEach((block , index) =>{//use forEach method for grabing evry (block and index) in the cardblock divs and do :
    // block.style.order = index //this came first
    block.style.order = orderRange[index]//add css order for classing element depend on th number
    block.addEventListener('click' , () =>{
        flipCard(block)
        matchCard(block)
    })
})
 /* let exArray = [1,5,23,67,98,3,87,09,23,5,6,90,56] //example for parameter of shuffle
let randomexArray = shuffle(exArray) //example for parameter of shuffle
console.log(randomexArray) //example for parameter of shuffle ------------------- >*/ 

function shuffle(array){// the shuffle function that have (array) parameter(المعامل) صwe can use it to every array look example up
    let current = array.length,//give name of array.length of currernt
    temp,//its like something to store on it (stash) here using it for storing an number for while and place it with different number
    random;// for picking an random number
    while (current > 0) {//here means while the array have element iside it do :
        random = Math.floor(Math.random() * current);//this for make a random number in frame of the array the problem here is this method can give a repeat number and to avoid it we will use temp 
        current--;//and to avoid infinite loop //exp to understand decreasing : we have array = [1,2,3,4,5,6,7,8,9] by deacreasing method will take number 9 and store it in the temp and the replace it with another number randomly and take 8 and replace it and then 7 until the number 1 and it will repeat the process
        temp = array[current]//it take tha last number in the array
        array[current] = array[random];//replace the previous number an replace it with random one
        array[random] = temp;// this make infinite replace numbers
    };
    return array;//for applying the array

}




function flipCard(select){//this function have 'select' parameter for select each card using addeventlistener method
    select.classList.add('fliped')// the card will add class list 'fliped' in every card will clicks
    let allflipblock = cardBlocks.filter(flipblock => flipblock.classList.contains('fliped'))//and after click will store every card have name of flipped to an array using filter method
    checkMatch(allflipblock[0],allflipblock[1])
    if (allflipblock.length === 2) {//here using if condition for limit th number of clicked card to two card and check if they match
        stopClick() //call back this function that have tasks inside it
    }
    
}
function stopClick(){//this function that have tasks inside it
    allCardBlocks.classList.add('no-clicking')//adding this class list to stop clicking for while to other card using pointer-event in css untill we check if they match or no
    setTimeout(()=>{// set a time for click again 
        allCardBlocks.classList.remove('no-clicking')//removing theclass list after 1 second 
    },duration)

}
function checkMatch(firstBlock,secondBlock) {//this function have two parameter (firstBlock,secondBlock) 
    let wrongMoves = document.getElementById('moves')//calling the number of wrong tries
    if (firstBlock.dataset.animal === secondBlock.dataset.animal) {//condition if the two cards have the same data do:
        firstBlock.classList.remove('fliped')//remove the class list from the first card
        secondBlock.classList.remove('fliped')//remove the class list from the first card
        firstBlock.classList.add('match')//and add class to the first card the we will style it in css
        secondBlock.classList.add('match')//and add class to the first card the we will style it in css
        success.play()//this is sound effect
        
    }else{//if they not match do:
        setTimeout(()=>{// setting time afte checking is not match
            failure.play()//playing sound effect
            firstBlock.classList.remove('fliped')// removing the clas list
            secondBlock.classList.remove('fliped')// removing the clas list
            wrongMoves.innerHTML = parseInt(wrongMoves.innerHTML) +1//adding 1 to the wrong tries
            if (wrongMoves.innerHTML == 5) {//condition for move if it 5 moves you will lose the game
                setTimeout(()=>{//time for doing lose action
                    wah.play()//sound
                    alert('YOU LOSE THE GAME')
                    window.location.reload()//refreshing the game again
                },500)
            }
        },duration)
      
    }
}
function matchCard(select) {//function for winning the game 
    let allmatchpblock = cardBlocks.filter(matchBlock => matchBlock.classList.contains('match'))//storing all card that have the same class of match wich mean the match card 
    if (allmatchpblock.length == 16) {//and then if all card match means you won the game 
        setTimeout(()=>{//setting time
            tada.play()//playing music
            alert('YOU WON THE GAME')
            window.location.reload()

        },500)
        
    }
    
}
