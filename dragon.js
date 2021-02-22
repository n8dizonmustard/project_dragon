/* ----- constants -----*/
//these const variables will not change throughout the program:
//these variables are for computing the chance 
const dragonActions = ['bite', 'claws', 'fire', 'fly']
const biteChance = Math.floor(Math.random() * 10) + 1;
const clawsChance = Math.floor(Math.random() * 10) + 1;
const fireChance = Math.floor(Math.random() * 10) + 1;

/* ----- app's state (variables) -----*/
//these let variables will be changed by init function:
let knight;
let shieldValue;
let dragon;
let eventText;
let knightNumHP;
let dragonNumHP;
let dragonAction;
let flight;

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
const body = document.querySelector('body')
const replayId = document.getElementById('replay');
const replayDiv = document.querySelector('.replay');


/* ----- event listeners -----*/
//these event listeners execute player actions or run the game
contId.addEventListener('click', continueGame);
potionId.addEventListener('click', potionAction);
bowId.addEventListener('click', bowAction);
shieldId.addEventListener('click', shieldAction);
swordId.addEventListener('click', swordAction);
replayId.addEventListener('click', init);



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
//Sets the dragon's default position to 'On the Ground':
    flight = false;
//This invokes the render function to update the view/DOM.
    enableActions();
    replayId.remove();
    render();
}


//This updates the DOM/View
function render(){
    console.log('render is firing! PEW PEW')
}

// This function progresses the game after the Player clicks an Action Button.
function continueGame(){
    dragonTurn()
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
    let swordChance = Math.floor(Math.random() * 10) + 1;
    console.log(swordChance);
    if (swordChance > 2 && flight === false){
        function swordDamage(min, max){
            randomSwordDmg = Math.floor(Math.random() * (max-min) + min);
            return randomSwordDmg;
        }
        swordDamage(16, 26)
        dragonNumHP -= randomSwordDmg;
        getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
        eventId.textContent = `Your sword swings true! You deal ${randomSwordDmg} damage!`
    } else {
        eventId.textContent = `Your sword misses the beast...How embarrassing.`
    }
    disableActions()
    gameEnd();
    flightStatus()
};

function disableActions(){
    swordId.disabled = true;
    shieldId.disabled = true;
    bowId.disabled = true;
    potionId.disabled = true;
    contId.disabled = false;
}

function enableActions(){
    swordId.disabled = false;
    shieldId.disabled = false;
    bowId.disabled = false;
    potionId.disabled = false;
    contId.disabled = true; 
}

function dragonTurn(){
    dragonAction = Math.floor(Math.random() * dragonActions.length);
    if (dragonAction === 0){
        if (biteChance > 3){
            function biteDamage(min, max){
                randomBiteDmg = Math.floor(Math.random() * (max-min) + min);
                return randomBiteDmg;
            }
            biteDamage(12, 16)
            knightNumHP -= randomBiteDmg;
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventId.textContent = `The dragon's terrible jaws nearly clamp around you! You receive ${randomBiteDmg} damage!`
        } else {
            eventId.textContent = `You are too fast for the dragon's jaws! You dodge its bite.` 
        }
    } else if (dragonAction === 1){
        if (clawsChance > 2){
            function clawsDamage(min, max){
                randomClawsDmg = Math.floor(Math.random() * (max-min) + min);
                return randomClawsDmg;
            }
            clawsDamage(8, 15)
            knightNumHP -= randomClawsDmg;
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventId.textContent = `The dragon pounces by swiping its claws! You receive ${randomClawsDmg} damage!`
        } else {
            eventId.textContent = `You parry the dragon's claws with your sword!`
        }
    } else if (dragonAction === 2){
        if (fireChance > 4){
            function fireDamage(min, max){
                randomFireDmg = Math.floor(Math.random() * (max-min) + min);
                return randomFireDmg;
            }
            fireDamage(15, 21);
            knightNumHP -= randomFireDmg;
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventId.textContent = `The dragon breathes fire! You receive ${randomFireDmg} damage!`
        } else {
            eventId.textContent = `The dragon's flames are repelled by your shield!`
        }
    } else {
        flight = true;
        eventId.textContent = `The dragon takes flight!`
    }
    enableActions();
    gameEnd();
}

function flightStatus(){
    if (flight === true){
        eventId.textContent += ` The dragon lands in front of you.`
        flight = false;
    } else {
        flight = false;
    }
}

function gameEnd(){
    if (knightNumHP <= 0){
        eventId.textContent += ` GAME OVER. The Dragon has eaten you.`
        getHealth.knight.textContent = `Knight HP: 0`;
        replay();
    } else if (dragonNumHP <= 0){
        eventId.textContent += ` VICTORY! You have slain the Dragon!`
        getHealth.dragon.textContent = `Dragon HP: 0`;
        replay();
    } else {
        return false;
    }
}

function replay(){
    disableActions()
    contId.disabled = true;
    replayDiv.appendChild(replayId);
}