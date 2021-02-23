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
let arrows;
let potions;
let dragonNumHP;
let dragonAction;
let flight;

/* ----- cached elements references -----*/
//these variables allow us to grab elements once and store them for later functions:
const getHealth = {
    knight: document.getElementById('knight-hp'),
    dragon: document.getElementById('dragon-hp'),
}
const eventHeaderId = document.getElementById('event-header')
const eventTextId = document.getElementById('event-text')
const contId = document.getElementById('cont')
const swordId = document.getElementById('sword')
const shieldId = document.getElementById('shield')
const bowId = document.getElementById('bow')
const potionId = document.getElementById('potion')
const body = document.querySelector('body')
const replayId = document.getElementById('replay');
const replayDiv = document.querySelector('.replay');
const arrowsId = document.getElementById('arrows')


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
    knightNumHP = 100;
    getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
    dragonNumHP = 300;
    getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
    arrows = 6;
    bowId.textContent = `Bow: ${arrows} Arrows`;
    potions = 3;
    potionId.textContent = `Potions: ${potions}`;
    shieldValue = 0;
    eventHeaderId.textContent = 'Welcome, brave knight!';
    eventTextId.textContent = 'Select an Action to Begin';
    contId.disabled = true;
    flight = false;
    enableActions();
    replayId.remove();
}


// This function progresses the game after the Player clicks an Action Button.
function continueGame(){
    dragonTurn()
};

function potionAction(){
    function heal(min, max){
        randomHeal = Math.floor(Math.random() * (max-min) + min);
        return randomHeal;
    }
    heal(15, 30)
    knightNumHP += randomHeal;
    potions -= 1;
    eventHeaderId.textContent = `You drink a Potion.`
    eventTextId.textContent = `You regain ${randomHeal} HP!`
    getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
    potionId.textContent = `Potions: ${potions}`;
    disableActions()
    gameEnd();
    flightStatus()
};

function bowAction(){
        let bowChance = Math.floor(Math.random() * 100) + 1;
        if (bowChance > 50 && flight === false){
            function bowDamage(min, max){
                randomBowDmg = Math.floor(Math.random() * (max-min) + min);
                return randomBowDmg;
            }
            bowDamage(50, 86)
            dragonNumHP -= randomBowDmg;
            getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `Your arrow hits its mark! You deal ${randomBowDmg} damage!`
        } else if (bowChance > 70 && flight === true){
            function bowDamage(min, max){
                randomBowDmg = Math.floor(Math.random() * (max-min) + min);
                return randomBowDmg;
            }
            bowDamage(50, 76)
            dragonNumHP -= randomBowDmg;
            getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `Your arrow hits its mark! You deal ${randomBowDmg} damage!`
        } else {
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `The dragon's scales deflect your arrow. You should really work on your aim...`
        }

    arrows -= 1;
    bowId.textContent = `Bow: ${arrows} Arrows`

    disableActions()
    gameEnd();
    flightStatus()
};


function shieldAction(){
    function defend(min, max){
        randomDefense = Math.floor(Math.random() * (max-min) + min);
        return randomDefense;
    }
    defend(25, 51)
    shieldValue = randomDefense;
    eventHeaderId.textContent = `You brace your Shield.`
    eventTextId.textContent = ` Your defenses are bolstered for this turn.`
    
    disableActions()
    gameEnd();
    flightStatus()
};

function swordAction(){
    let swordChance = Math.floor(Math.random() * 100) + 1;
    if (swordChance > 20 && flight === false){
        function swordDamage(min, max){
            randomSwordDmg = Math.floor(Math.random() * (max-min) + min);
            return randomSwordDmg;
        }
        swordDamage(20, 31)
        dragonNumHP -= randomSwordDmg;
        getHealth.dragon.textContent = `Dragon HP: ${dragonNumHP}`;
        eventTextId.textContent = `Your sword swings true! You deal ${randomSwordDmg} damage!`
    } else {
        eventTextId.textContent = `Your sword misses the beast. How embarrassing...`
    }
    eventHeaderId.textContent = `You swing your sword!`
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
};

function enableActions(){
    swordId.disabled = false;
    shieldId.disabled = false;
    contId.disabled = true;

    if (potions < 1){
        potionId.disabled = true;
    } else {
        potionId.disabled = false;
    }

    if (arrows < 1){
        bowId.disabled = true;
    } else {
        bowId.disabled = false;
    }
};

function dragonTurn(){
    const biteChance = Math.floor(Math.random() * 100) + 1;
    const clawsChance = Math.floor(Math.random() * 100) + 1;
    const fireChance = Math.floor(Math.random() * 100) + 1;

    dragonAction = Math.floor(Math.random() * dragonActions.length);
    if (dragonAction === 0){
        if (biteChance > 30){
            function biteDamage(min, max){
                randomBiteDmg = Math.floor(Math.random() * (max-min) + min);
                return randomBiteDmg;
            }
            biteDamage(15, 26)
            knightNumHP -= Math.floor(randomBiteDmg * (100 - shieldValue)/100);
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventTextId.textContent = `The bite throws you off balance! You receive ${randomBiteDmg} damage!`
        } else {
            eventTextId.textContent = `You are too fast for the dragon's jaws! You dodge its bite.` 
        }
        eventHeaderId.textContent = `The dragon bites!`

    } else if (dragonAction === 1){
        if (clawsChance > 20){
            function clawsDamage(min, max){
                randomClawsDmg = Math.floor(Math.random() * (max-min) + min);
                return randomClawsDmg;
            }
            clawsDamage(10, 21)
            knightNumHP -= Math.floor(randomClawsDmg * (100 - shieldValue)/100);
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventTextId.textContent = `The claws dent your armor! You receive ${randomClawsDmg} damage!`
        } else {
            eventTextId.textContent = `You parry the dragon's claws with your sword!`
        }
        eventHeaderId.textContent = `The dragon swipes its claws!`


    } else if (dragonAction === 2){
        if (fireChance > 35){
            function fireDamage(min, max){
                randomFireDmg = Math.floor(Math.random() * (max-min) + min);
                return randomFireDmg;
            }
            fireDamage(20, 31);
            knightNumHP -= Math.floor(randomFireDmg * (100 - (shieldValue*1.75))/100);
            getHealth.knight.textContent = `Knight HP: ${knightNumHP}`;
            eventTextId.textContent = `YOU'RE on fire! No, really. You should stop, drop and roll. You receive ${randomFireDmg} damage!`
        } else {
            eventTextId.textContent = `The dragon's flames narrowly miss you!`
        }
        eventHeaderId.textContent = `The dragon breathes fire!`


    } else {
        flight = true;
        eventHeaderId.textContent = `The dragon takes flight!`
        eventTextId.textContent = `The majestic beast soars above looking for a weakness. (That won't be hard to spot...)`

    }
    shieldValue = 0;
    enableActions();
    gameEnd();
}

function flightStatus(){
    if (flight === true){
        eventHeaderId.textContent = `The dragon lands.`
        eventTextId.textContent = `The ground shakes around you. (Hint: It's the dragon.)`
        flight = false;
    } else {
        flight = false;
    }
}


function gameEnd(){
    if (knightNumHP <= 0){
        eventHeaderId.textContent = `GAME OVER`
        eventTextId.textContent = `The Dragon feasts on your corpse. You taste awful.`
        getHealth.knight.textContent = `Knight HP: 0`;
        replay();
    } else if (dragonNumHP <= 0){
        eventHeaderId.textContent = `VICTORY!!!`
        eventId.textContent = `You have slain the Dragon! Congrats. You're a murderer.`
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