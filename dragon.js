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
const eventId = document.getElementById('event');
const startId = document.getElementById('start');
const contId = document.getElementById('cont');
const replayId = document.getElementById('replay');
const swordId = document.getElementById('sword');
const shieldId = document.getElementById('shield');
const bowId = document.getElementById('bow');
const potionId = document.getElementById('potion');
const body = document.querySelector('body');
const arrowsId = document.getElementById('arrows');

const dragonSpriteId = document.getElementById('drg-sprite');
const dragonSpriteDiv = document.getElementById('dragon-sprite');
const darkestDungeon = document.getElementById('darkest-dungeon');
const actionSpritesDiv = document.getElementById('actionSprites');
const fireSprite = document.getElementById('fire-sprite');
const clawsSprite = document.getElementById('claws-sprite');
const biteSprite = document.getElementById('bite-sprite');
const windSprite = document.getElementById('wind-sprite');

const swordSFX = document.getElementById('swordSFX');
const hitSFX = document.getElementById('hitSFX');
const whooshSFX = document.getElementById('whooshSFX');
const shieldSFXbc = document.getElementById('shieldSFXbc');
const shieldSFXpound = document.getElementById('shieldSFXpound');
const potionSFXdrink = document.getElementById('potionSFX');
const magicSFX = document.getElementById('magicSFX');
const biteSFX = document.getElementById('biteSFX');
const fireSFX = document.getElementById('fireSFX');
const flyingSFX = document.getElementById('flyingSFX');
const landingSFX = document.getElementById('landingSFX');
const dragonSFX = document.getElementById('dragonSFX');

darkestDungeon.volume = .3;
magicSFX.volume = .75;
fireSFX.volume = .5;
magicSFX.volume = .75;
potionSFXdrink.volume = .75;

/* ----- event listeners -----*/
//these event listeners execute player actions or run the game
contId.addEventListener('click', continueGame);
potionId.addEventListener('click', potionAction);
bowId.addEventListener('click', bowAction);
shieldId.addEventListener('click', shieldAction);
swordId.addEventListener('click', swordAction);
startId.addEventListener('click', start);
replayId.addEventListener('click', init);



/* ----- functions -----*/
eventId.appendChild(startId);

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
    flight = false;
    eventId.appendChild(startId);
    contId.remove();
    replayId.remove();
    disableActions();
}

function start(){
    darkestDungeon.play();
    eventId.appendChild(contId);
    startId.remove();
}


// This function progresses the game after the Player clicks an Action Button.
function continueGame(){
    contId.textContent = "Dragon's Turn"
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
    potionSFXdrink.play();
    magicSFX.play();
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
        whooshSFX.play();
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
        whooshSFX.play();
    } else {
        eventHeaderId.textContent = `You fire your bow!`
        eventTextId.textContent = `Your arrow misses! You should really work on your aim...`
        whooshSFX.play();
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
    shieldSFXbc.play();
    shieldSFXpound.play();
    disableActions();
    gameEnd();
    flightStatus();
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
        swordSFX.play();
        hitSFX.play();
    } else {
        eventTextId.textContent = `Your sword misses the beast. How embarrassing.`
        whooshSFX.play();
    }
    eventHeaderId.textContent = `You swing your sword!`

    disableActions();
    gameEnd();
    flightStatus();
};

function disableActions(){
    swordId.disabled = true;
    shieldId.disabled = true;
    bowId.disabled = true;
    potionId.disabled = true;
    contId.disabled = false;
    contId.textContent = "Dragon's Turn"

    contId.style.backgroundColor = "black";
    contId.style.border = "7px outset gold";
    contId.style.color = "red";

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

    fireSprite.style.zIndex = -1;
    clawsSprite.style.zIndex = -1;
    biteSprite.style.zIndex = -1;
    windSprite.style.zIndex = -1;
};

function enableActions(){
    swordId.disabled = false;
    shieldId.disabled = false;
    contId.disabled = true;
    contId.style.color = "white";
    contId.style.backgroundColor = "#262626";
    contId.style.border = "7px outset maroon";
    contId.textContent = "Your Turn"

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

    swordId.style.backgroundColor = "red";
    swordId.style.border = "10px outset maroon";
    shieldId.style.backgroundColor = "#262626";
    shieldId.style.border = "10px outset goldenrod";
    bowId.style.backgroundColor = "rgb(58, 58, 130)";
    bowId.style.border = "10px outset navy";
    bowId.style.color = "yellow";
    potionId.style.backgroundColor = "rgb(48, 181, 181)";
    potionId.style.border = "10px outset darkgreen";
    potionId.style.color = "#00ff00";

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
            biteSFX.play();
            biteSprite.style.zIndex = 2;
        } else {
            eventTextId.textContent = `You are too fast for the dragon's jaws! You dodge its bite.`
            whooshSFX.play();
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
            hitSFX.play();
            clawsSprite.style.zIndex = 2;
        } else {
            eventTextId.textContent = `You parry the dragon's claws with your sword!`
            whooshSFX.play();
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
            eventTextId.textContent = `You're on fire! Fire bad. You receive ${randomFireDmg} damage!`
        } else {
            eventTextId.textContent = `The dragon's flames narrowly miss you!`
        }
        eventHeaderId.textContent = `The dragon breathes fire!`
        fireSFX.play();
        fireSprite.style.zIndex = 2;

    } else {
        flight = true;
        eventHeaderId.textContent = `The dragon flies!`
        eventTextId.textContent = `The beast searches for a weakness. (That won't be difficult.)`
        dragonSpriteId.remove();
        flyingSFX.play();
        windSprite.style.zIndex = 1;
        dragonSFX.play();

    }
    shieldValue = 0;
    enableActions();
    gameEnd();
}

function flightStatus(){
    if (flight === true){
        flight = false;
        landingSFX.play();
    } else {
        flight = false;
    }
    dragonSpriteDiv.appendChild(dragonSpriteId);
}


function gameEnd(){
    if (knightNumHP <= 0){
        eventHeaderId.textContent = `GAME OVER`
        eventTextId.textContent = `The Dragon feasts on your corpse. You taste awful.`
        knightNumHP = 0;
        getHealth.knight.textContent = `${knightNumHP}`;
        replay();
    } else if (dragonNumHP <= 0){
        eventHeaderId.textContent = `VICTORY!!!`
        eventTextId.textContent = `You have slain the Dragon! Congrats. You're a murderer.`
        dragonNumHP = 0;
        getHealth.dragon.textContent = `${dragonNumHP}`;
        replay();
    } else {
        return false;
    }
}

function replay(){
    disableActions();
    contId.remove();
    eventId.appendChild(replayId);
}
