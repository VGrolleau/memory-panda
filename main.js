const cards = document.querySelectorAll('.memory-card');
const playerName = document.querySelector('#player-name');
let eltScore = document.getElementById('score');
let muteBtn = document.getElementById('muteBtn');
let score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let autoplay = false;

document.getElementById('confirm-name').addEventListener('click', function() {
    document.querySelector('#popup-name').style.display = 'none';
    alert(`Coucou ${playerName.value}, jouons au Memory Panda ! On va bien rigoler !`);
    ambiant();
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
        victory();
        alert(`Félicitations !! Tu as fini la partie avec ${score} points.`);

        sectionRestart();

        // ambiantSound.stop();

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

function passageDeLaSouris(element) {
    element.setAttribute('src', 'img/green-present.png');
}

function departDeLaSouris(element) {
    element.setAttribute('src', 'img/red-present.png');
}

function sectionRestart() {
    let newSection = document.createElement('section');
    let divRestart = document.createElement('div');
    let btnRestart = document.createElement('button');
    let textRestart = document.createTextNode('Recommencer');
    let btnPresent = document.createElement('div');
    let sectionVideo = document.createElement('section');
    let divVideo = document.createElement('div');

    btnRestart.appendChild(textRestart);
    divRestart.appendChild(btnRestart);
    newSection.appendChild(divRestart);
    newSection.appendChild(btnPresent);
    sectionVideo.appendChild(divVideo);

    newSection.classList.add('section-restart');
    btnRestart.classList.add('restart');
    btnPresent.classList.add('present');
    sectionVideo.classList.add('sectionVideo');
    divVideo.classList.add('divVideo');

    btnPresent.innerHTML = '<p id="pPresent">Cliques moi ! ==> <img src="img/red-present.png" id="img-present" onmouseover=passageDeLaSouris(this); onmouseout=departDeLaSouris(this);></p>';

    let currentSection = document.getElementById('memory-game');
    document.body.insertBefore(newSection, currentSection);

    let btnPresentImg = document.getElementById('img-present');
    btnPresentImg.addEventListener('click', videoContent);

    function videoContent() {
        divVideo.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/QH2-TGUlwu4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="nyancatVideo"></iframe><img src="img/cancel.png" class="close">';
        sectionVideo.style.background = 'rgba(0, 0, 0, .5)';
        sectionVideo.style.width = '100%';
        sectionVideo.style.height = '100%';
        sectionVideo.style.position = 'absolute';

        document.querySelector('.close').addEventListener('click', function() {
            document.querySelector('.sectionVideo').style.display = 'none';
        })

        btnPresentImg.addEventListener('click', function() {
            document.querySelector('.sectionVideo').style.display = 'flex';
        })

        // let nyancatVideo = document.getElementById('nyancatVideo');
        // nyancatVideo.autoplay = true;
        // videojs("example_video_1", { "controls": true, "autoplay": true, "preload": "auto" });
    }

    // let actualSection = document.getElementById('top');
    document.body.insertBefore(sectionVideo, currentSection);
}

function ambiant() {
    let ambiantSound = new Audio('audio/ambiant.mp3');

    ambiantSound.play();
    ambiantSound.onended = function() {
        setTimeout(RelanceAud, 500);
    };

    function RelanceAud() {
        ambiantSound.play();
    }

    muteBtn.addEventListener('click', mute);

    function mute() {
        if (ambiantSound.muted) {
            ambiantSound.muted = false;
            muteBtn.innerHTML = '<img src="img/speaker.png" alt="Image haut parleur">';
        } else {
            ambiantSound.muted = true;
            muteBtn.innerHTML = '<img src="img/mute.png" alt="Image haut parleur barré">';
        }
    }

    // function stopAmbiant() {
    //     if (ambiantSound.stop) {
    //         ambiantSound.stoped = false;
    //     } else {
    //         ambiantSound.stoped = true;
    //     }
    // }
}

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

// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 16);
//         card.style.order = randomPos;
//     });
// })();

cards.forEach(card => card.addEventListener('click', flipCard));