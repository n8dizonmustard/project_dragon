/* ----- constants -----*/
//these const variables will not change throughout the program:
//these variables are for computing the chance 
const dragonActions = ['bite', 'claws', 'fire', 'fly']

/* ----- app's state (variables) -----*/
//these let variables will be changed by init function:
let knight;
let shieldValue;
let dragon;
let eventText;
let knightNumHP;
let dragonNumHP;

/* ----- cached elements references -----*/
//these variables allow us to grab elements once and store them for later functions:
const getHealth = {
    knight: document.getElementById('knight-hp'),
    dragon: document.getElementById('dragon-hp'),
}
const eventId = document.getElementById('event-text')
const contId = document.getElementById('cont')
const swordId = document.getElementById('sword')
const shieldId = document.getElementById('shield')
const bowId = document.getElementById('bow')
const potionId = document.getElementById('potion')


/* ----- event listeners -----*/
//these event listeners execute player actions or run the game
contId.addEventListener('click', continueGame);
potionId.addEventListener('click', potionAction);
bowId.addEventListener('click', bowAction);
shieldId.addEventListener('click', shieldAction);
swordId.addEventListener('click', swordAction);


/* ----- functions -----*/

//This sets the game's starting values.
init();
function init(){
//Set the HP of the Knight to 100:
    knightNumHP = 100;
    getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
//Set the HP of the Dragon to 300:
    dragonNumHP = 300;
    getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
//Set Text Event Text:
    eventId.textContent = 'Select an Action!';
//Disable the continue button:
    contId.disabled = true;
//This invokes the render function to update the view/DOM.
    render();
}


//This updates the DOM/View
function render(){
    console.log('render is firing! PEW PEW')
}

// This function progresses the game after the Player clicks an Action Button.
function continueGame(){
    console.log('continue button working');
};

function potionAction(){
    console.log('Potions brewed.');
};

function bowAction(){
    console.log('Bow is strung.');
};

function shieldAction(){
    console.log('Shield polished.');
};

function swordAction(){
    if (swordChance > 2){
        function swordDamage(min, max){
            randomSwordDmg = Math.floor(Math.random() * (max-min) + min);
            return randomSwordDmg;
            console.log(randomSwordDmg)
        }
        swordDamage(16, 26)
        dragonNumHP -= randomSwordDmg;
        getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
        eventId.textContent = `Your sword swings true! You deal ${randomSwordDmg} damage!`
    } else {
        eventId.textContent = `Your sword misses the beast...How embarrassing.`
    }
    disableActions()
};

function disableActions(){
    swordId.disabled = true;
    shieldId.disabled = true;
    bowId.disabled = true;
    potionId.disabled = true;
    contId.disabled = false;
}

function dragonTurn(){

}