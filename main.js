function init(){
    CANVAS_SIZE = window.innerHeight -10 //setup canvas
    document.getElementById("screen").height = CANVAS_SIZE
    document.getElementById("screen").width = CANVAS_SIZE
    ctx = document.getElementById("screen").getContext("2d")
    ctx.fillStyle = "black"
    ctx.lineWidth = CANVAS_SIZE/100
    turn = "x" //whether X or O is playing this turn
    $("#screen").click(function(event){main(event)}) //run the main function when the canvas is click
    grid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    ctx.beginPath()
    for(i = 1; i != 3; i ++){ //draw grid
        ctx.moveTo(0,CANVAS_SIZE/3*i)
        ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE/3*i)
        ctx.moveTo(CANVAS_SIZE/3*i,0)
        ctx.lineTo(CANVAS_SIZE/3*i, CANVAS_SIZE)
    }
    ctx.stroke()
}
function main(event){
    x = event.pageX - $("#screen").offset().left //get the x pos relitive to the canvas
    y = event.pageY
    gridX = Math.floor(x/(CANVAS_SIZE/3)) // get item in grid that will be changed 
    gridY = Math.floor(y/(CANVAS_SIZE/3))
    if(grid[gridY][gridX] == 0){
        if(turn == "x"){
            ctx.beginPath() //draw an X
            ctx.moveTo(gridX*(CANVAS_SIZE/3),gridY*(CANVAS_SIZE/3)) //move to the top left corner of the sqaure
            ctx.lineTo(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/3,gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/3)// draw a line to the bottom right corner
            ctx.moveTo(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/3,gridY*(CANVAS_SIZE/3)) // move to the top right corner
            ctx.lineTo(gridX*(CANVAS_SIZE/3),gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/3) // draw a line to the bottom left corner
            ctx.stroke()
            grid[gridY][gridX] = "x" //record that an x was played where it was
            turn = "o"
        }else{ // if its O turn 
            ctx.beginPath() //draw an O
            ctx.arc(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/6,gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/6, CANVAS_SIZE/6, 0, 2 * Math.PI);
            ctx.stroke()
            grid[gridY][gridX] = "o" //record that an o was played where it was
            turn = "x"
        }
    }
}
function winner(board){ //returns the winner, tie, or 0
    var symbolToCheck = "x"
    for(check=0;check<2;check++){
        if(board[1][1] == symbolToCheck){ //if the center of the grid is the symbol that is being checked
            for(i=0;i<3;i++){ //3 times
                for(n=0;n<3;n++){ //3 time
                    if(board[n][i] == symbolToCheck && board[2-n][2-i] == symbolToCheck){return(symbolToCheck)} //if two of the symbols being checked are oposite return the symbol being checked
                }
            }
        }
        symbolToCheck = "o"
    }
}