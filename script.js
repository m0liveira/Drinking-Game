// variaveis de get elements
var remaining = document.getElementById("remaining");
var cardPlaced = document.getElementById("cardPlaced");
var cardFx = document.getElementById("cardFx");
var shuffle = document.getElementById("cardShuffle");
var start = document.getElementById("startGame");
var modal = document.getElementById("modal");
var endModal = document.getElementById("endModal");
var endMotive = document.getElementById("yGameOver");
var shut = document.getElementById("close");
var nameplate = document.getElementById("nameplate");
var nameplate2 = document.getElementById("nameplate2");

// var escolhas de gamemodes (navbar)
var colorRidle = document.getElementById("game1");
var HoL = document.getElementById("game2");
var inRange = document.getElementById("game3");
var Suit = document.getElementById("game4");

// var inputs
var name1 = document.getElementById("name1");
var name2 = document.getElementById("name2");

// var buttons
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
// var escolhas de gamemodes (starting modal)
var gm1 = document.getElementById("cr");
var gm2 = document.getElementById("hol");
var gm3 = document.getElementById("ir");
var gm4 = document.getElementById("soc");
// var confirm button (starting modal)
var confirmer = document.getElementById("confirm");

// var de imagens de LP
var lifePoints1 = document.getElementById("lifePoints1");
var lifePoints2 = document.getElementById("lifePoints2");
var lifePoints3 = document.getElementById("lifePoints3");
var lifePoints4 = document.getElementById("lifePoints4");
var lifePoints5 = document.getElementById("lifePoints5");
var lifePoints6 = document.getElementById("lifePoints6");

// variaveis necessarias 
var deckId;
var card;
var gameMode = 1;
var pack = 0; // pack de cartas
var playerList = []; // objeto para players
var aux // auxiliar
var order = false // variavel para verificar se foi ordenado ou nao
var firstValue = 0;
var secondValue = 0;
var thirdValue = 0;
var HolCardDesked; // carta na mesa
var HolCardPlaced; // carta tirada do deck

// mudar o nameplate default para o nome do user
function changeNameplate() {
    nameplate.innerHTML = playerList[0].name;
    nameplate2.innerHTML = playerList[1].name;
}

// apagar game indicator dos links na navbar
function clearGameIndicator() {
    colorRidle.style.color = "lime";
    HoL.style.color = "lime";
    inRange.style.color = "lime";
    Suit.style.color = "lime";
}

// game indicator - mostra o modo de jogo na navbar
function gameIndicator() {
    clearGameIndicator();
    if (gameMode == 1) {
        colorRidle.style.color = "yellow";

    } else if (gameMode == 2) {
        HoL.style.color = "yellow";

    } else if (gameMode == 3) {
        inRange.style.color = "yellow";

    } else if (gameMode == 4) {
        Suit.style.color = "yellow";
    }
}

// acaba o jogo
function endGame(remainingCards) {
    if (remainingCards <= 0) {
        endModal.classList.remove("hide"); // mostar o game over modal

        if (playerList[0].lifes == playerList[1].lifes) {
            endMotive.innerHTML = "Out of cards in the deck";

        } else if (playerList[0].lifes > playerList[1].lifes) {
            endMotive.innerHTML = playerList[0].name + " WON!"

        } else {
            endMotive.innerHTML = playerList[1].name + " WON!"
        }
    }
    if (playerList[0].lifes <= 0 || playerList[1].lifes <= 0) {
        endModal.classList.remove("hide");

        if (playerList[0].lifes <= 0) {
            endMotive.innerHTML = playerList[1].name + " WON!";

        } else {
            endMotive.innerHTML = playerList[0].name + " WON!";
        }
    }
}

// regula as vidas
function lifePoints() {
    // player 1
    if (playerList[0].lifes == 3) {
        lifePoints1.src = "../media/heart.png";
        lifePoints2.src = "../media/heart.png";
        lifePoints3.src = "../media/heart.png";

    } else if (playerList[0].lifes == 2) {
        lifePoints1.src = "../media/heart.png";
        lifePoints2.src = "../media/heart.png";
        lifePoints3.src = "../media/noheart.png";

    } else if (playerList[0].lifes == 1) {
        lifePoints1.src = "../media/heart.png";
        lifePoints2.src = "../media/noheart.png";
        lifePoints3.src = "../media/noheart.png";

    } else if (playerList[0].lifes == 0) {
        lifePoints1.src = "../media/noheart.png";
        lifePoints2.src = "../media/noheart.png";
        lifePoints3.src = "../media/noheart.png";
    }

    // player 2 
    if (playerList[1].lifes == 3) {
        lifePoints4.src = "../media/heart.png";
        lifePoints5.src = "../media/heart.png";
        lifePoints6.src = "../media/heart.png";

    } else if (playerList[1].lifes == 2) {
        lifePoints4.src = "../media/heart.png";
        lifePoints5.src = "../media/heart.png";
        lifePoints6.src = "../media/noheart.png";

    } else if (playerList[1].lifes == 1) {
        lifePoints4.src = "../media/heart.png";
        lifePoints5.src = "../media/noheart.png";
        lifePoints6.src = "../media/noheart.png";

    } else if (playerList[1].lifes == 0) {
        lifePoints4.src = "../media/noheart.png";
        lifePoints5.src = "../media/noheart.png";
        lifePoints6.src = "../media/noheart.png";
    }
}

// muda a perceçao do numero de cartas na mesa
function changeDeckimg(remainingCards) {
    if (remainingCards >= 36) {
        remaining.style.display = "block";
        remaining.src = "../media/FullDeck.png";

    } else if (remainingCards < 36 && remainingCards >= 18) {
        remaining.style.display = "block";
        remaining.src = "../media/mediumDeck.png";

    } else if (remainingCards < 18 && remainingCards >= 4) {
        remaining.style.display = "block";
        remaining.src = "../media/lowDeck.png";

    } else if (remainingCards < 4 && remainingCards >= 1) {
        remaining.style.display = "block";
        remaining.src = "../media/backCard.png";

    } else if (remainingCards == 0) {
        remaining.style.display = "none";
    }
}

// animation para pôr carta na mesa
function placeCard(place) {
    cardPlaced.src = place;
    cardFx.classList.add("rotatecard");
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    setTimeout(function () {
        cardFx.classList.remove("rotatecard");
        btn1.disabled = false;
        btn2.disabled = false;
        btn3.disabled = false;
        btn4.disabled = false;
    }, 2000);
}

// animation para baralhar cartas
function shuffleCards() {
    shuffle.classList.add("shuffle");
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    setTimeout(function () {
        shuffle.classList.remove("shuffle");
        btn1.disabled = false;
        btn2.disabled = false;
        btn3.disabled = false;
        btn4.disabled = false;
    }, 2000);
}

// vai buscar um deck
async function getDeck() {
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                deckId = res.deck_id;
            }
            return deckId;
        })
        .catch((err) => {
            console.error("no deck");
            console.log(err);
        });
}

// dar draw de cartas
async function drawCard() {
    return await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                changeDeckimg(res.remaining);
                placeCard(res.cards[0].image);
                endGame(res.remaining);
            }
            return res;
        })
}

// baralha as cartas
async function reShufle() {
    return await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                changeDeckimg(res.remaining);
                shuffleCards();
            }
            return res;
        })
}

// reset games (põe os valores necessarios em default e baralha o deck)
function resetGame(res) {
    firstValue = 0;
    secondValue = 0;
    thirdValue = 0;
    playerList[0].lifes = 3
    playerList[1].lifes = 3
    playerList[0].turn = true;
    playerList[1].turn = false;
    reShufle();
    // cardPlaced.removeAttribute("src");
    cardPlaced.style.display = "none";
    lifePoints();
}

// começar jogo
async function startGame(res) {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);

    } else {
        if (pack == 0) {
            let res = await getDeck();
            getDeck();
            pack = 1;
        }

        // gameIndicator
        gameIndicator();

        if (start.innerHTML == "Click to start") {
            start.innerHTML = "Restart!";
            // reset do jogo
            resetGame(res);
        } else if (start.innerHTML == "Restart!") {
            // reset do jogo
            resetGame(res);
        }

        // preparar jogo
        if (gameMode == 1) {
            btn2.innerHTML = "Black";
            btn3.innerHTML = "Red";

            btn2.style.color = "black";
            btn3.style.color = "red";

            btn1.style.display = "none";
            btn4.style.display = "none";

        } else if (gameMode == 2) {
            cardPlaced.style.display = "block";
            btn2.innerHTML = "higher";
            btn3.innerHTML = "lower";

            btn2.style.color = "red";
            btn3.style.color = "rgb(0, 195, 255)";

            btn1.style.display = "none";
            btn4.style.display = "none";

            drawCard();
            let res2 = await drawCard();
            HolCardDesked = Number(res2.cards[0].value);

            if (res2.cards[0].value == "JACK") {
                HolCardDesked = 11;
            }
            if (res2.cards[0].value == "QUEEN") {
                HolCardDesked = 12;
            }
            if (res2.cards[0].value == "KING") {
                HolCardDesked = 13;
            }
            if (res2.cards[0].value == "ACE") {
                HolCardDesked = 14;
            }
        } else if (gameMode == 3) {
            cardPlaced.style.display = "block"
            btn2.innerHTML = "In Range";
            btn3.innerHTML = "Out Range";

            btn2.style.color = "rgb(0, 202, 0)";
            btn3.style.color = "red";

            btn1.style.display = "none";
            btn4.style.display = "none";

            drawCard();
            let res2 = await drawCard();
            secondValue = Number(res2.cards[0].value);

            if (res2.cards[0].value == "JACK") {
                secondValue = 11;
            }
            if (res2.cards[0].value == "QUEEN") {
                secondValue = 12;
            }
            if (res2.cards[0].value == "KING") {
                secondValue = 13;
            }
            if (res2.cards[0].value == "ACE") {
                secondValue = 14;
            }

            console.log(firstValue + " - " + secondValue);
        } else if (gameMode == 4) {
            btn1.innerHTML = "♠";
            btn2.innerHTML = "♥";
            btn3.innerHTML = "♣";
            btn4.innerHTML = "♦";

            btn1.style.color = "black";
            btn2.style.color = "red";
            btn3.style.color = "black";
            btn4.style.color = "red";

            btn1.style.display = "flex";
            btn4.style.display = "flex";
        }
    }
}

// criar players
function Player(name, lifes, turn) {
    this.name = name;
    this.lifes = lifes;
    this.turn = turn;
}
// criar players continuação
function createPlayer(res) {
    if (name1.value != "" && name2.value != "") {
        playerList.push(new Player(name1.value, lifes = 3, turn = true));
        playerList.push(new Player(name2.value, lifes = 3, turn = false));
        modal.classList.add("hide")
        startGame(res);
        changeNameplate();
    } else {
        name1.style.borderColor = "red";
        name2.style.borderColor = "red";
    }
}

// click event no 1º botao para escolhas no jogo
btn1.addEventListener("click", async function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        let res = await drawCard();

        // gamemode 4
        if (gameMode == 4) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "SPADES") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "SPADES") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }

        }

        lifePoints();
        endGame();
    }
})

// click event no 2º botao para escolhas no jogo
btn2.addEventListener("click", async function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        let res = await drawCard();
        console.log(res);

        // gamemode 1
        if (gameMode == 1) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "CLUBS" || res.cards[0].suit == "SPADES") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "CLUBS" || res.cards[0].suit == "SPADES") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }

            // gamemode 2
        } else if (gameMode == 2) {
            HolCardPlaced = Number(res.cards[0].value);

            if (res.cards[0].value == "JACK") {
                HolCardPlaced = 11;
            }
            if (res.cards[0].value == "QUEEN") {
                HolCardPlaced = 12;
            }
            if (res.cards[0].value == "KING") {
                HolCardPlaced = 13;
            }
            if (res.cards[0].value == "ACE") {
                HolCardPlaced = 14;
            }

            // player 1 turn
            if (playerList[0].turn) {
                if (HolCardPlaced >= HolCardDesked) {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

                // player 2 turn
            } else if (playerList[1].turn) {
                if (HolCardPlaced >= HolCardDesked) {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[0].turn = true;
                playerList[1].turn = false;
            }
            HolCardDesked = HolCardPlaced;

            // gamemode 3
        } else if (gameMode == 3) {
            thirdValue = Number(res.cards[0].value);

            if (res.cards[0].value == "JACK") {
                thirdValue = 11;
            }
            if (res.cards[0].value == "QUEEN") {
                thirdValue = 12;
            }
            if (res.cards[0].value == "KING") {
                thirdValue = 13;
            }
            if (res.cards[0].value == "ACE") {
                thirdValue = 14;
            }

            // player 1 turn
            if (playerList[0].turn) {
                if (thirdValue >= firstValue && thirdValue <= secondValue || thirdValue <= firstValue && thirdValue >= secondValue) {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

                // player 2 turn
            } else if (playerList[1].turn) {
                if (thirdValue >= firstValue && thirdValue <= secondValue || thirdValue <= firstValue && thirdValue >= secondValue) {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[0].turn = true;
                playerList[1].turn = false;
            }
            firstValue = secondValue;
            secondValue = thirdValue;

            console.log(firstValue + " - " + secondValue);

        } else if (gameMode == 4) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "HEARTS") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "HEARTS") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }
        }
        lifePoints();
        endGame();
    }
})

// click event no 3º botao para escolhas no jogo
btn3.addEventListener("click", async function () {
    order = false;
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        let res = await drawCard();
        HolCardPlaced = res.cards[0].value;

        if (gameMode == 1) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "DIAMONDS" || res.cards[0].suit == "HEARTS") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "DIAMONDS" || res.cards[0].suit == "HEARTS") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }
        } else if (gameMode == 2) {
            HolCardPlaced = Number(res.cards[0].value);

            if (res.cards[0].value == "JACK") {
                HolCardPlaced = 11;
            }
            if (res.cards[0].value == "QUEEN") {
                HolCardPlaced = 12;
            }
            if (res.cards[0].value == "KING") {
                HolCardPlaced = 13;
            }
            if (res.cards[0].value == "ACE") {
                HolCardPlaced = 14;
            }

            // player 1 turn
            if (playerList[0].turn) {
                if (HolCardPlaced <= HolCardDesked) {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

                // player 2 turn
            } else if (playerList[1].turn) {
                if (HolCardPlaced <= HolCardDesked) {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[0].turn = true;
                playerList[1].turn = false;

            }
            HolCardDesked = HolCardPlaced;
        } else if (gameMode == 3) {
            thirdValue = Number(res.cards[0].value);

            if (res.cards[0].value == "JACK") {
                thirdValue = 11;
            }
            if (res.cards[0].value == "QUEEN") {
                thirdValue = 12;
            }
            if (res.cards[0].value == "KING") {
                thirdValue = 13;
            }
            if (res.cards[0].value == "ACE") {
                thirdValue = 14;
            }

            // ordenar numeros
            if (firstValue > secondValue) {
                aux = firstValue;
                firstValue = secondValue;
                secondValue = aux;
                order = true;
            }

            console.log(firstValue + " - " + secondValue);

            // player 1 turn
            if (playerList[0].turn) {
                if (thirdValue < firstValue || thirdValue > secondValue) {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

                // player 2 turn
            } else if (playerList[1].turn) {
                if (thirdValue < firstValue || thirdValue > secondValue) {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[0].turn = true;
                playerList[1].turn = false;
            }

            if (!order) {
                firstValue = secondValue;
                secondValue = thirdValue;
            } else {
                secondValue = thirdValue
            }


            console.log("saiu: " + thirdValue);

        } else if (gameMode == 4) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "CLUBS") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "CLUBS") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }
        }
        lifePoints();
        endGame();
    }
})

// click event no 4º botao para escolhas no jogo
btn4.addEventListener("click", async function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        let res = await drawCard();

        // gamemode 4
        if (gameMode == 4) {
            cardPlaced.style.display = "block";
            if (playerList[0].turn) {
                if (res.cards[0].suit == "DIAMONDS") {
                    if (playerList[0].lifes < 3) {
                        playerList[0].lifes += 1;
                    }
                } else {
                    playerList[0].lifes -= 1;
                }
                playerList[1].turn = true;
                playerList[0].turn = false;

            } else if (playerList[1].turn) {
                if (res.cards[0].suit == "DIAMONDS") {
                    if (playerList[1].lifes < 3) {
                        playerList[1].lifes += 1;
                    }
                } else {
                    playerList[1].lifes -= 1;
                }
                playerList[1].turn = false;
                playerList[0].turn = true;
            }

        }

        lifePoints();
        endGame();
    }
})

// click event no link para começar ou dar restart no jogo
start.addEventListener("click", startGame);

// click event no 1º link na navbar
colorRidle.addEventListener("click", function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        gameMode = 1;
        if (start.innerHTML != "Click to start") {
            start.innerHTML = "Click to start";
        }
        clearGameIndicator();
    }
})

// click event no 2º link na navbar
HoL.addEventListener("click", function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        gameMode = 2;
        if (start.innerHTML != "Click to start") {
            start.innerHTML = "Click to start";
        }
        clearGameIndicator();
    }
})

// click event no 3º link na navbar
inRange.addEventListener("click", function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        gameMode = 3;
        if (start.innerHTML != "Click to start") {
            start.innerHTML = "Click to start";
        }
        clearGameIndicator();
    }
})

// click event no 4º link na navbar
Suit.addEventListener("click", function () {
    if (endModal.classList[1] != "hide") {
        shut.classList.add("flash");
        setTimeout(function () {
            shut.classList.remove("flash");
        }, 2000);
    } else {
        gameMode = 4;
        if (start.innerHTML != "Click to start") {
            start.innerHTML = "Click to start";
        }
        clearGameIndicator();
    }
})

// click event no 1º botao no starting modal para escolher modo de jogo
gm1.addEventListener("click", () => {
    gameMode = 1;
    gm1.classList.add("borderFlash");
    gm3.classList.remove("borderFlash");
    gm2.classList.remove("borderFlash");
    gm4.classList.remove("borderFlash");
});

// click event no 2º botao no starting modal para escolher modo de jogo
gm2.addEventListener("click", () => {
    gameMode = 2;
    gm2.classList.add("borderFlash");
    gm3.classList.remove("borderFlash");
    gm4.classList.remove("borderFlash");
    gm1.classList.remove("borderFlash");
});

// click event no 3º botao no starting modal para escolher modo de jogo
gm3.addEventListener("click", () => {
    gameMode = 3;
    gm3.classList.add("borderFlash");
    gm4.classList.remove("borderFlash");
    gm2.classList.remove("borderFlash");
    gm1.classList.remove("borderFlash");
});

// click event no 4º botao no starting modal para escolher modo de jogo
gm4.addEventListener("click", () => {
    gameMode = 4;
    gm4.classList.add("borderFlash");
    gm3.classList.remove("borderFlash");
    gm2.classList.remove("borderFlash");
    gm1.classList.remove("borderFlash");
});

// click event no botao para confirmar os nomes + gamemode no starting modal
confirmer.addEventListener("click", createPlayer);

// click event no xbtn no ending modal para fechar o modal
shut.addEventListener("click", (res) => {
    endModal.classList.add("hide");
    // reset do jogo
    resetGame(res);
    if (gameMode == 2 || gameMode == 3) {
        startGame(res);
    }
})