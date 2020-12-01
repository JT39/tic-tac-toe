const displayWinner = document.querySelector('.displayWinner > p');


const Players = (name) => {

    let player = name;
    let show = function () {
        displayWinner.innerHTML = `${this.player} Wins`;
    }
    return {
        player,
        show
    }
};


const gameboardModule = (function () {

    const spots = document.querySelectorAll('#gameboard > div');

    let gameboard = [];

    let playerOne = Players('Player One');
    let playerTwo = Players('Player Two');

    function computer() {
        playerTwo.player = 'Computer';
        spots.forEach(spot => spot.addEventListener('click', player));

        let unusedSpots = [...spots].filter(spot => {
            if (!spot.innerHTML) {
                return spot.className;
            }
        });

        let random = Math.floor(Math.random() * unusedSpots.length);
        return (unusedSpots[random]);
    }

    function player(area) {

        if (!area.target.innerHTML && !rules()) {

            area.target.innerHTML = 'x';
            gameboard.push('x');

            if (!rules()) {
                let randomSpot = computer();
                randomSpot.innerHTML = 'o';
                gameboard.push('o');
            }

            if (rules()) {
                spots.forEach(spot => spot.removeEventListener('click', player));
            }

        }
    }

    function rules() {
        let results = [...spots].map(spot => spot.innerHTML);
        let obj = {
            row1: results.slice(0, 3).join(''),
            row2: results.slice(3, 6).join(''),
            row3: results.slice(6, 9).join(''),
            col1: results[0] + results[3] + results[6],
            col2: results[1] + results[4] + results[7],
            col3: results[2] + results[5] + results[8],
            diag1: results[0] + results[4] + results[8],
            diag2: results[2] + results[4] + results[6]
        }

        if (results.join('').length < 9) {
            for (let key in obj) {
                if (obj[key] === 'xxx') {
                    playerOne.show();
                    return true;
                } else if (obj[key] === 'ooo') {
                    playerTwo.show();
                    return true;
                }
            }
        } else if (results.join('').length === 9) {
            for (let key in obj) {
                if (obj[key] === 'xxx') {
                    playerOne.show();
                    return true;
                } else if (obj[key] === 'ooo') {
                    playerTwo.show();
                    return true;
                } else {
                    displayWinner.innerHTML = 'Tie';
                    return true;
                }
            }
        }

        return false;
    }

    function render(event) {

        let area = event.target;
        if (!area.innerHTML && !rules()) {
            if (gameboard[gameboard.length - 1] !== 'x') {
                gameboard.push('x')
                area.innerHTML = 'x';
            } else {
                gameboard.push('o');
                area.innerHTML = 'o';
            }
        }

        if (rules()) {
            spots.forEach(spot => spot.removeEventListener('click', render));
        }
    }


    return {
        computer,
        gameboard,
        render,
        playerOne,
        playerTwo,
        player
    }

})();

const displayController = (function () {

    const name = document.querySelector('input[type=text]');
    const playerNames = document.querySelectorAll('h2');

    const spots = document.querySelectorAll('#gameboard > div');

    const buttons = document.querySelectorAll('input[type=button]');

    buttons[0].onclick = function () {

        buttons[0].style.display = 'none';
        buttons[1].style.display = 'initial';
        buttons[2].style.display = 'none';

        spots.forEach(spot => spot.addEventListener('click', gameboardModule.render));
        if (name.value !== '') {
            playerNames[0].innerHTML = name.value;

            gameboardModule.playerOne.player = name.value;
        }
        gameboardModule.playerTwo.playeer = playerNames[1].innerHTML;
        name.style.display = 'none';
        name.value = '';

    }

    buttons[1].onclick = function () {

        spots.forEach(spot => {
            spot.innerHTML = '';
            spot.removeEventListener('click', gameboardModule.player);
            spot.removeEventListener('click', gameboardModule.render);
        })

        playerNames[0].innerHTML = 'Player One';
        playerNames[1].innerHTML = 'Player Two';

        name.style.display = 'initial';
        buttons[0].style.display = 'initial';
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'initial';

        displayWinner.innerHTML = '';

        gameboardModule.gameboard.splice(0)

    }

    buttons[2].onclick = function () {

        buttons[0].style.display = 'none';
        buttons[1].style.display = 'initial';
        buttons[2].style.display = 'none';
        playerNames[1].innerHTML = 'Computer';

        if (name.value !== '') {
            playerNames[0].innerHTML = name.value;

            gameboardModule.playerOne.player = name.value;
        }
        gameboardModule.playerTwo.player = 'Computer';

        name.style.display = 'none';
        name.value = '';

        spots.forEach(spot => spot.removeEventListener('click', gameboardModule.render));

        gameboardModule.computer();
    }

})();



