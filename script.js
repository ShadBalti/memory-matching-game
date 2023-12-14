document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cardPairs = cardValues.concat(cardValues); // Duplicate to create pairs
    let moves = 0;
    let timer;
    let matchedPairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        moves = 0;
        matchedPairs = 0;
        updateMovesCounter();
        resetTimer();
        createCards();
        setTimeout(() => {
            flipAllCardsDown();
            startTimer();
        }, 500);
    }

    function createCards() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = '';

        shuffle(cardPairs);

        cardPairs.forEach((value, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.dataset.index = index;
            card.innerHTML = '<span class="front"></span><span class="back">' + value + '</span>';
            card.addEventListener('click', handleCardClick);
            gameContainer.appendChild(card);
        });
    }

    function handleCardClick() {
        const card = this;

        if (card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        flipCardUp(card);

        const flippedCards = document.querySelectorAll('.flipped');

        if (flippedCards.length === 2) {
            incrementMoves();
            checkForMatch(flippedCards);
        }
    }

    function flipCardUp(card) {
        card.classList.add('flipped');
    }

    function flipAllCardsDown() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.remove('flipped'));
    }

    function checkForMatch(cards) {
        const [firstCard, secondCard] = cards;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            setTimeout(() => {
                cards.forEach(card => card.classList.add('matched'));
                matchedPairs++;

                if (matchedPairs === cardValues.length) {
                    endGame();
                }
            }, 1000);
        } else {
            setTimeout(() => {
                cards.forEach(card => card.classList.remove('flipped'));
            }, 1000);
        }
    }

    function updateMovesCounter() {
        document.getElementById('move-counter').textContent = moves;
    }

    function incrementMoves() {
        moves++;
        updateMovesCounter();
    }

    function startTimer() {
        let seconds = 0;
        timer = setInterval(() => {
            seconds++;
            document.getElementById('timer').textContent = seconds + 's';
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        document.getElementById('timer').textContent = '0s';
    }

    function endGame() {
        clearInterval(timer);
        alert(`Congratulations! You completed the game in ${moves} moves and ${document.getElementById('timer').textContent}.`);
    }

    document.getElementById('restart-btn').addEventListener('click', startGame);

    startGame();
});
