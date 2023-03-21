const formSelect = document.getElementById('formSelect');
formSelect.addEventListener('submit', play);


function createSquare(content, row){
    const square = document.createElement('div');
    square.classList.add('square')
    square.style.width = `calc(100% / ${row})`;
    square.style.height = `calc(100% / ${row})`;
    square.innerHTML = content;
    return square;
}


function createBombs(numbombs, max){
    const bombs = [];
    while(bombs.length < numbombs){
        const bomb = getRandomInt(1, max);
        if(!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs;
}


function setPar(result){
    const par = document.getElementById('result');
    par.innerHTML = result;
}


function show(bombs){
    const finalBombs = document.querySelectorAll('.square');
    for(let i = 0; i < finalBombs.length; i++){
        if(bombs.includes(parseInt(finalBombs[i].innerText))){
            finalBombs[i].classList.add('unsafe');
        }
    }
}


function play(e){
    e.preventDefault();
    const table = document.getElementById('table');
    table.innerHTML = '';
    const level = document.getElementById('select').value;
    let squareNumbers;
    const numBombs = 16;
    let result = 'Seleziona la difficoltà e premi play.';
    setPar(result);

    if(level === 'Easy'){
        squareNumbers = 100;
    } else if(level === 'Medium'){
        squareNumbers = 81;
    } else{
        squareNumbers = 49;
    }
    
    const bombs = createBombs(numBombs, squareNumbers);
    let row = Math.sqrt(squareNumbers);
    let maxScore = squareNumbers - numBombs;
    let par = 0;
    let gameOver = false;

    for(let i = 1; i <= squareNumbers; i++){
        const square = createSquare(i, row);
        square.addEventListener('click', function(){
            if(!gameOver && !square.classList.contains('safe')){
                if(bombs.includes(parseInt(square.innerText))){
                    square.classList.add('unsafe');
                    result = `Hai perso, il tuo punteggio è: ${par}`;
                    gameOver = true;
                    show(bombs);
                } else{
                    if(par < maxScore){
                        square.classList.add('safe');
                        par++;
                        result = `Il tuo punteggio è: ${par}`
                    } else{
                        result = `Hai vinto, il tuo punteggio è: ${par}`;
                    }
                }
                setPar(result);
            }
        })
        table.appendChild(square);
    }
    
}



function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
