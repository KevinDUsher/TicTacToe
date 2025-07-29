function gameBoard() {
    let board = [["","",""],["","",""],["","",""]];
    let getLetter = (x,y) => {return board[x][y]};
    let setPosition = (x,y, letter) => {board[x][y] = letter};
    let resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = "";
            }
        }
    };
    let populateBoard = () => {
        document.getElementsByClassName("first")[0].innerText = board[0][0];
        document.getElementsByClassName("second")[0].innerText = board[0][1];
        document.getElementsByClassName("third")[0].innerText = board[0][2];
        document.getElementsByClassName("fourth")[0].innerText = board[1][0];
        document.getElementsByClassName("fifth")[0].innerText = board[1][1];
        document.getElementsByClassName("sixth")[0].innerText = board[1][2];
        document.getElementsByClassName("seventh")[0].innerText = board[2][0];
        document.getElementsByClassName("eigth")[0].innerText = board[2][1];
        document.getElementsByClassName("ninth")[0].innerText = board[2][2];
    };
    let printBoard = () => {
            board.forEach(row => {
                console.log(row.join(" | "));
            });
    };
    return {board, setPosition, getLetter, resetBoard, printBoard, populateBoard};
}

function createPlayer(playerName, xOrO){
    let letter = xOrO;
    return {playerName, letter};
}

function control(playerObjects,board)
{
    let currentPlayer = playerObjects[0];
    let checkHorizontal = (letter,x,y) => {
        if(y==0){
            if(board.getLetter(x,1) == letter && board.getLetter(x,2) == letter){return true;}
        }
        if(y==1){
            if(board.getLetter(x,0) == letter && board.getLetter(x,2) == letter){return true;}
        }
        if(y==2){
            if(board.getLetter(x,0) == letter && board.getLetter(x,1) == letter){return true;}
        }
        return false;
    };

    let checkVertical = (letter,x,y) => {
        if(x==0){
            if(board.getLetter(1,y) == letter && board.getLetter(2,y) == letter){return true;}
        }
        if(x==1){
            if(board.getLetter(0,y) == letter && board.getLetter(2,y) == letter){return true;}
        }
        if(x==2){
            if(board.getLetter(0,y) == letter && board.getLetter(1,y) == letter){return true;}
        }
        return false;
    };

    let checkDiagonal = (letter,x,y) => {
        if(x==0 && y==0){
            if(board.getLetter(1,1) == letter && board.getLetter(2,2) == letter){return true;}
        }
        if(x==0 && y==2){
            if(board.getLetter(1,1) == letter && board.getLetter(2,0) == letter){return true;}
        }
        if(x==1 && y==1){
            if(board.getLetter(0,2) == letter && board.getLetter(2,0) == letter){return true;}
            if(board.getLetter(0,0) == letter && board.getLetter(2,2) == letter){return true;}
        }
        if(x==2 && y==0){
            if(board.getLetter(1,1) == letter && board.getLetter(0,2) == letter){return true;}
        }
        if(x==2 && y==2){
            if(board.getLetter(1,1) == letter && board.getLetter(0,0) == letter){return true;}
        }
        return false;
    };

    let checkWin = (player, x, y) => {
        if(checkHorizontal(player.letter,x,y) || checkVertical(player.letter,x,y) || checkDiagonal(player.letter,x,y))
        {
            return true;
        }
        return false;
    };

    let checkCat = () => {
        let isCat = true;
        for (let i = 0; i < board.board.length; i++) {
            for (let j = 0; j < board.board[i].length; j++) {
                console.log("row = " + i + " column = " + j + " set to = " + board.board[i][j]);
                if (board.board[i][j] === "") {
                    isCat = false;
                    console.log("gotNOCAT");
                }
            }
        }
        return isCat;
    }
    let switchPlayer = () => {
        if(currentPlayer.letter == playerObjects[0].letter){
            currentPlayer = playerObjects[1];
        }
        else{
            currentPlayer = playerObjects[0];
        }
    };
    let runRound = (x,y) =>{
        if(board.getLetter(x,y) == ""){
            board.setPosition(x,y, currentPlayer.letter);
            if(checkWin(currentPlayer, x, y))
            {
                document.getElementsByClassName("winner")[0].innerText = currentPlayer.playerName + " WINS! PRESS A SPOT TO PLAY AGAIN!";
                board.resetBoard();
            }
            if(checkCat()){
                console.log("why is this true");
                document.getElementsByClassName("winner")[0].innerText = "CATS GAME!!! NO ONE WINS! PRESS A SPOT TO PLAY AGAIN!";
                board.resetBoard();
            }
            board.populateBoard();
            console.log("madeIt here");
            switchPlayer();
        }
        else{
            document.getElementsByClassName("winner")[0].innerText = "That space is already taken, pick another.";
        }
    };

    let getPosition = (className) => {
        switch(className){
            case "first":
                return [0,0];
                break;
            case "second":
                return [0,1];
                break;
            case "third":
                return [0,2];
                break;
            case "fourth":
                return [1,0];
                break;
            case "fifth":
                return [1,1];
                break;
            case "sixth":
                return [1,2];
                break;
            case "seventh":
                return [2,0];
                break;
            case "eigth":
                return [2,1];
                break;
            default:
                return [2,2];
        }
    };

    let clickEvent = (e) => {
        let clicked = getPosition(e.target.className);
        runRound(clicked[0],clicked[1]);
    };

    let playGame = () => {
        document.getElementsByClassName("first")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("second")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("third")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("fourth")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("fifth")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("sixth")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("seventh")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("eigth")[0].addEventListener("click", clickEvent);
        document.getElementsByClassName("ninth")[0].addEventListener("click", clickEvent);
        console.log("this ran");
    };
    return {playGame};
}

let player1 = createPlayer("Player One", 'X');
let player2 = createPlayer("Player Two", 'O');
let board = gameBoard();
let controls = control([player1, player2], board);
controls.playGame();
