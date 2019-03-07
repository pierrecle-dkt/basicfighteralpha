/**************************************************\
 INIT
\**************************************************/
const domElts = {};
for(let i = 1; i <= 2; i++) {
    domElts[`player${i}`] = {};
    let playerElts = domElts[`player${i}`];

    playerElts.root = document.querySelector(`*[data-player="${i}"]`);
    playerElts.name = document.querySelector(`*[data-player="${i}"] .playerName`);
    playerElts.indicator =document.querySelector(`*[data-player="${i}"] .current`);
    playerElts.life = document.querySelector(`*[data-player="${i}"] *[data-life] .bar`);
    playerElts.strength = document.querySelector(`*[data-player="${i}"] *[data-strength] .bar`);
}


/**************************************************\
 Etat initial
\**************************************************/
let joueurCourant = 1;
let action = null;
const joueurs = {
    joueur1: {
        vie: 100,
        force: 10
    },
    joueur2: {
        vie: 100,
        force: 10
    }
};

/**************************************************\
 Boucle principale : ton terrain de jeu
\**************************************************/
async function tourDeJeu() {
    window[action]();
    await animateAction();
    action = null;

    if(!peuJouer()) {
        finDeJeu();
    }

    draw();
}

function attaque() {
}

function defense() {
}

function peuJouer() {
    return true;
}

function finDeJeu() {
    disableButtons();
}

/**************************************************\
 Outils
\**************************************************/
async function draw() {
    for(let i = 1; i <= 2; i++) {
        let playerElts = domElts[`player${i}`];
        playerElts.indicator.classList.remove('visible');
        playerElts.life.style.width = `${joueurs[`joueur${i}`].vie}%`;
        playerElts.strength.style.width = `${joueurs[`joueur${i}`].force}%`;
    }
    domElts[`player${joueurCourant}`].indicator.classList.add('visible');
}

async function animateAction() {
    if(action === "attaque") {
        domElts[`player${(joueurCourant%2 + 1)}`].root.classList.add("attack");
    } else {
        domElts[`player${joueurCourant}`].root.classList.add("defend");
    }

    return new Promise((resolve) => {
        disableButtons();
        setTimeout(() => {
            for(let i = 1; i <= 2; i++) {
                domElts[`player${i}`].root.classList.remove("attack", "defend");
            }
            enableButtons();
            resolve(true);
        }, 600);
    });
}

function enableButtons() {
    [].slice.call(document.querySelectorAll('.actions button')).forEach(button => {
        button.disabled = false;;
    });
}

function disableButtons() {
    [].slice.call(document.querySelectorAll('.actions button')).forEach(button => {
        button.disabled = true;
    });
}

[].slice.call(document.querySelectorAll('.actions button')).forEach(button => {
    button.onclick = () => {
        action = button.dataset.action;
        tourDeJeu();
    };
});

draw();