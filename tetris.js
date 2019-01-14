var fs = require('fs')
var os = require('os')

const MAX_COL=8
const MAX_ROW=6

process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', (data) => {
    data=='j' && currentShape.x--;
    data=='l' && currentShape.x++;
    data=='k' && currentShape.y++;
    data=='z' && process.exit();
});


let board=[
    ['0','0','0','0','1'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
];
let currentShapeIndex=0
let currentShape={
    x:0,
    y:0,
    content:[]
}

let shapes=[
    [
        ['1','1'],
        ['1','1'],
    ],
    [
        ['1'],
        ['1'],
        ['1'],
        ['1'],

    ],
    [
        ['1','1','1'],
        ['0','1','0'],
        ['0','1','0'],
        ['0','1','0'],
    ],
    [
        ['0','1','0'],
        ['1','1','1'],
    ],
    [
        ['0','1','0'],
        ['1','1','1'],
    ],
    [
        ['0','1','1'],
        ['0','1','0'],
        ['1','1','0'],
    ],
]//.map(i=>i.reverse())
function rotate90Shape(shape){
    //TODO
}

function showBoard(){
    for (let j = 0; j < board.length; j++) {
        
        process.stdout.cursorTo(0,j)

        for (let i = 0; i < board[0].length; i++) {
            if(board[j][i]=='1'){
                process.stdout.write("◼︎")
            }
            else{
                process.stdout.write("◻︎")
            }
            //◼︎
            //◻︎
        }
    }
}
function showCurrenctShape(){
    if(currentShape.content.length==0)
        {
            let r=Math.abs(Math.ceil(Math.random(0,5)*10)-5)
            currentShape.content=[...shapes[r]]
            currentShape.x=0;
            currentShape.y=0;
        }
        
        for (let i = 0; i < currentShape.content.length; i++) {
            for (let j = 0; j < currentShape.content[0].length; j++) {
                process.stdout.cursorTo(currentShape.x+j,currentShape.y+i)
                if(currentShape.content[i][j]=='1'){
                    process.stdout.write('\033[31m◼︎')
                }
            }
        }

}

function resetShape(){

    currentShape.x=0;
    currentShape.y=0;
    currentShape.content=[];
}

function freezeShape(){
    
    for (let j = 0; j < currentShape.content.length; j++) {//y
        for (let i = 0; i < currentShape.content[0].length; i++) {//x
            if(currentShape.content[j][i]=='1'){
                board[currentShape.y+j][currentShape.x+i]='1'
            }
        }
    }

    resetShape()

}

function isOccupyY(){

        for (let j = 0; j < currentShape.content[0].length; j++) {
            if( 
                board[currentShape.y+currentShape.content.length][currentShape.x+j]==='1' 
                && 
                currentShape.content[currentShape.content.length-1][j]==='1'
            ){
                freezeShape()
                break;
            }
        }    

}

function calcCollision(){

    if(currentShape.content.length==0) return ;
    
    if(currentShape.x<0)currentShape.x=0;
    if(currentShape.x+currentShape.content[0].length>=MAX_ROW)currentShape.x=MAX_ROW-currentShape.content[0].length

    if(currentShape.y+currentShape.content.length>=MAX_COL) {
        freezeShape()
        return;
    }

    if(isOccupyY()){
        freezeShape()
        return;    
    }    

}

function start(){

    setInterval(() => {
        let c=0
        update();  
        c=0;
    }, 1000);
}

function getInput(){

}



function update(){
    process.stdout.cursorTo(0,0);
    
    process.stdout.write('\033[?25l');
    process.stdout.write('\033[?25h');

    process.stdout.write('\033[0m');
    process.stdout.write('\033[J');
    showBoard();        
    showCurrenctShape();
    getInput()        
    calcCollision()   
    currentShape.y++;
    
}
start();