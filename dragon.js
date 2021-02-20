/* ----- constants -----*/
//these const variables will not change throughout the program:
const bite = Math.random() * 0.6;
const claws = Math.random() * 0.7;
const fire = Math.random() * 0.8;
const sword = Math.random() * 0.9;
const shield = 1;
const bow = Math.random() * 0.5;

/* ----- app's state (variables) -----*/
//these let variables will be changed by init function:
let knight;
let dragon;
let eventText;
let cont;
let conf;


/* ----- cached elements references -----*/
//these variables allow us to grab elements once and store them for later functions:
const getHealth = {
    knight: document.getElementById('knight-hp'),
    dragon: document.getElementById('dragon-hp'),
}
const getEvent = document.getElementById('event')
const getCont = document.getElementById('cont')
const getConf = document.getElementById('conf')
const getSword = document.getElementById('sword')
const getShield = document.getElementById('shield')
const getBow = document.getElementById('bow')

/* ----- event listeners -----*/
//this event listener is for the confirm button
document.getElementById('conf')
    .addEventListener('click', confirmAction);

//this event listener is for the confirm button
document.getElementById('cont')
    .addEventListener('click', continueGame);


/* ----- functions -----*/
function confirmAction(){
    console.log('confirm button working');
};

function continueGame(){
    console.log('continue button working');
};