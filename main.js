const cards = document.querySelectorAll('.memory-card');
let eltScore = document.getElementById('score');
let score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // 1er click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // 2e click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        disableCards();
        score += 50;
    } else {
        unflipCards();
        score = Math.max(0, score - 10);
    }

    score > 0 ? eltScore.textContent = `${score} points` : eltScore.textContent = score;
}

function disableCards() {
    setTimeout(() => {
        firstCard.style.transition = "opacity 1s linear 0s";
        firstCard.style.opacity = 0;
        secondCard.style.transition = "opacity 1s linear 0s";
        secondCard.style.opacity = 0;

        resetBoard();
    }, 1800);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));