/* ----- constants -----*/
//these const variables will not change throughout the program:
const bite = Math.floor(Math.random() * 0.6);
const claws = Math.floor(Math.random() * 0.7);
const fire = Math.floor(Math.random() * 0.8);
const sword = Math.floor(Math.random() * 0.9);
const shield = 1;
const bow = Math.floor(Math.random() * 0.5);
const potion = 1;

/* ----- app's state (variables) -----*/
//these let variables will be changed by init function:
let knight;
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
const playerActions = document.querySelector('player-action')
const swordId = document.getElementById('sword')
const shieldId = document.getElementById('shield')
const bowId = document.getElementById('bow')
const potionId = document.getElementById('potion')


/* ----- event listeners -----*/
//this event listener is for the confirm button
contId.addEventListener('click', continueGame);
potionId.addEventListener('click', potionAction);
bowId.addEventListener('click', bowAction);
shieldId.addEventListener('click', shieldAction);
swordId.addEventListener('click', swordAction);


/* ----- functions -----*/

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
    console.log('Sword sharpened.');
};

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

}

init();