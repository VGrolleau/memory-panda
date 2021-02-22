const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // 1er click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // 2e click
        hasFlippedCard = false;
        secondCard = this;

        // les cartes correspondent-elles?
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            //  si ça correspond
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // si ça ne correspond pas
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));