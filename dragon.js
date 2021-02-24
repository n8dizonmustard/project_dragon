/* ----- constants -----*/
//these const variables will not change throughout the program:
//these variables are for computing the chance 
const dragonActions = ['bite', 'claws', 'fire', 'fly']
const dragonSprite = {imageUrl: 'http://clipart-library.com/images_k/dragon-png-transparent/dragon-png-transparent-1.png'}


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
};
const eventHeaderId = document.getElementById('event-header');
const eventTextId = document.getElementById('event-text');
const contId = document.getElementById('cont');
const swordId = document.getElementById('sword');
const shieldId = document.getElementById('shield');
const bowId = document.getElementById('bow');
const potionId = document.getElementById('potion');
const body = document.querySelector('body');
const arrowsId = document.getElementById('arrows');
const dragonSpriteId = document.getElementById('drg-sprite');
const dragonSpriteDiv = document.getElementById('dragon-sprite');
const darkestDungeon = document.getElementById('darkest-dungeon');


darkestDungeon.volume = .35;

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
    knightNumHP = 100;
    getHealth.knight.textContent = `${knightNumHP}`;
    dragonNumHP = 300;
    getHealth.dragon.textContent = `${dragonNumHP}`;
    arrows = 6;
    bowId.textContent = `${arrows}`;
    potions = 3;
    potionId.textContent = `${potions}`;
    shieldValue = 0;
    eventHeaderId.textContent = "You're attacked by a dragon!";
    eventTextId.textContent = "You probably deserve it.";
    contId.disabled = true;
    flight = false;
    contId.textContent = 'Begin'
    disableActions();
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
    heal(30, 51)
    knightNumHP += randomHeal;
    potions -= 1;
    eventHeaderId.textContent = `You drink a Potion.`
    eventTextId.textContent = `You regain ${randomHeal} HP!`
    getHealth.knight.textContent = `${knightNumHP}`;
    potionId.textContent = `${potions}`;
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
            getHealth.dragon.textContent = `${dragonNumHP}`;
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `Your arrow hits its mark! You deal ${randomBowDmg} damage!`
        } else if (bowChance > 70 && flight === true){
            function bowDamage(min, max){
                randomBowDmg = Math.floor(Math.random() * (max-min) + min);
                return randomBowDmg;
            }
            bowDamage(50, 76)
            dragonNumHP -= randomBowDmg;
            getHealth.dragon.textContent = `${dragonNumHP}`;
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `Your arrow hits its mark! You deal ${randomBowDmg} damage!`
        } else {
            eventHeaderId.textContent = `You fire your bow!`
            eventTextId.textContent = `The dragon's scales deflect your arrow. You should really work on your aim...`
        }

    arrows -= 1;
    bowId.textContent = `${arrows}`

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
    if (swordChance > 15 && flight === false){
        function swordDamage(min, max){
            randomSwordDmg = Math.floor(Math.random() * (max-min) + min);
            return randomSwordDmg;
        }
        swordDamage(20, 31)
        dragonNumHP -= randomSwordDmg;
        getHealth.dragon.textContent = `${dragonNumHP}`;
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

    swordId.style.backgroundColor = "#262626";
    swordId.style.border = "10px outset #666666";
    shieldId.style.backgroundColor = "#262626";
    shieldId.style.border = "10px outset #666666";
    bowId.style.backgroundColor = "#262626";
    bowId.style.border = "10px outset #666666";
    bowId.style.color = "white";
    potionId.style.backgroundColor = "#262626";
    potionId.style.border = "10px outset #666666";
    potionId.style.color = "white";

};

function enableActions(){
    swordId.disabled = false;
    shieldId.disabled = false;
    contId.disabled = true;
    contId.style.color = "gray";
    contId.style.backgroundColor = "#262626";
    contId.style.border = "7px outset #666666";

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

    contId.style.backgroundColor = "black";
    contId.style.border = "7px outset gold";
    contId.style.color = "red";

    swordId.style.backgroundColor = "red";
    swordId.style.border = "10px outset maroon";
    shieldId.style.backgroundColor = "#262626";
    shieldId.style.border = "10px outset goldenrod";
    bowId.style.backgroundColor = "rgb(58, 58, 130)";
    bowId.style.border = "10px outset navy";
    bowId.style.color = "yellow";
    potionId.style.backgroundColor = "rgb(48, 181, 181)";
    potionId.style.border = "10px outset darkgreen";
    potionId.style.color = "greenyellow";

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
            getHealth.knight.textContent = `${knightNumHP}`;
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
            getHealth.knight.textContent = `${knightNumHP}`;
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
            getHealth.knight.textContent = `${knightNumHP}`;
            eventTextId.textContent = `YOU'RE on fire! No, really. You should stop, drop and roll. You receive ${randomFireDmg} damage!`
        } else {
            eventTextId.textContent = `The dragon's flames narrowly miss you!`
        }
        eventHeaderId.textContent = `The dragon breathes fire!`


    } else {
        flight = true;
        eventHeaderId.textContent = `The dragon takes flight!`
        eventTextId.textContent = `The majestic beast soars above looking for a weakness. (That won't be hard to spot...)`
        dragonSpriteId.remove();

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
    dragonSpriteDiv.appendChild(dragonSpriteId);
}


function gameEnd(){
    if (knightNumHP <= 0){
        eventHeaderId.textContent = `GAME OVER`
        eventTextId.textContent = `The Dragon feasts on your corpse. You taste awful.`
        getHealth.knight.textContent = `0`;
        replay();
    } else if (dragonNumHP <= 0){
        eventHeaderId.textContent = `VICTORY!!!`
        eventId.textContent = `You have slain the Dragon! Congrats. You're a murderer.`
        getHealth.dragon.textContent = `0`;
        replay();
    } else {
        return false;
    }
}

function replay(){
    disableActions()
    contId.textContent = 'Replay?'
    contId.addEventListener('click', init)
}
