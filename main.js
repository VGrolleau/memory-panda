const cards = document.querySelectorAll('.memory-card');
const playerName = document.querySelector('#player-name');
let eltScore = document.getElementById('score');
let score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

document.getElementById('confirm-name').addEventListener('click', function() {
    document.querySelector('#popup-name').style.display = 'none';
    alert(`Coucou ${playerName.value}, jouons au Memory Panda ! On va bien rigoler !`);
    // ambiant();
})

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // 1er click
        hasFlippedCard = true;
        firstCard = this;
        turning();

        return;
    }

    // 2e click
    secondCard = this;
    turning();

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        score += 50;
    } else {
        unflipCards();
        score = Math.max(0, score - 10);
    }

    score > 0 ? eltScore.textContent = `${score} points` : eltScore.textContent = score;

    if (document.getElementsByClassName('flip').length == 16) {
        eltScore.textContent += ' ==> GAGNÉ !';
        victory();
        alert(`Félicitations !! Tu as fini la partie avec ${score} points.`);

        sectionRestart();

        document.addEventListener('click', function(e) {
            if (e.target.className == 'restart') {
                location.reload();
            }
        });
    }
}

function disableCards() {
    setTimeout(() => {
        goodCard();
    }, 1000);

    setTimeout(() => {
        firstCard.style.transition = "opacity 1s linear 0s";
        firstCard.style.opacity = 0;
        secondCard.style.transition = "opacity 1s linear 0s";
        secondCard.style.opacity = 0;

        resetBoard();
    }, 1500);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        turning();

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function sectionRestart() {
    let newSection = document.createElement('section');
    let newBtn = document.createElement('button');
    let btnText = document.createTextNode('Recommencer');
    newBtn.appendChild(btnText);
    newSection.appendChild(newBtn);

    let currentSection = document.getElementById('memory-game');
    document.body.insertBefore(newSection, currentSection);

    newBtn.classList.add('restart');
}

// function ambiant() {
//     let ambiantSound = new Audio('audio/ambiant.mp3');

//     while (document.getElementsByClassName('flip').length != 16) {
//         ambiantSound.play();
//     }

// }

function turning() {
    let turningSound = new Audio('audio/turning-page.mp3');
    turningSound.play();
}

function goodCard() {
    let goodCardSound = new Audio('audio/good-card.mp3');
    goodCardSound.play();
}

function victory() {
    let victorySound = new Audio('audio/victory.mp3');
    victorySound.play();
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));