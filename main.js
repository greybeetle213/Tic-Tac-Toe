function init(){
    CANVAS_SIZE = window.innerHeight -10 //setup canvas
    document.getElementById("screen").height = CANVAS_SIZE
    document.getElementById("screen").width = CANVAS_SIZE
    ctx = document.getElementById("screen").getContext("2d")
    ctx.fillStyle = "black"
    ctx.lineWidth = CANVAS_SIZE/100
    ai = true
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
        }else if(!ai){ // if its O turn 
            ctx.beginPath() //draw an O
            ctx.arc(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/6,gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/6, CANVAS_SIZE/6, 0, 2 * Math.PI);
            ctx.stroke()
            grid[gridY][gridX] = "o" //record that an o was played where it was
            turn = "x"
        }
        winnerCheck = winner(grid)
        if(winnerCheck == "x" || winnerCheck == "o"){
            popup.alert("WINNER", "The winner is "+winnerCheck, "play again", function(){
                location.reload()
            })
        }
        if(winnerCheck == "tie"){
            popup.alert("TIE", "The game is tied", "play again", function(){
                location.reload()
            })
        }
    }
}
function winner(board){ //returns the winner, tie, or 0
    var symbolToCheck = "x"
    for(check=0;check<2;check++){
        if(board[1][1] == symbolToCheck){ //if the center of the grid is the symbol that is being checked
            for(i=0;i<3;i++){ //3 times
                for(n=0;n<3;n++){ //3 time
                    if(board[n][i] == symbolToCheck && board[2-n][2-i] == symbolToCheck && (n,i) != (1,1)){return(symbolToCheck)} //if two of the symbols being checked are oposite return the symbol being checked
                }
            }
        }
        var horizontalLine
        var verticalLine
        for(i = 0; i < 3; i++){ //3 time
            horizontalLine = 0
            verticalLine = 0
            for(n = 0; n < 3; n++){ //3 times
                if(board[i][n] == symbolToCheck){ //if there is the symbol being checked in n position on a horizontal line
                    horizontalLine += 1
                    if(horizontalLine == 3){ // if there are 3 on the same horizontal line
                        return(symbolToCheck) //return the winner
                    }
                }
                if(board[n][i] == symbolToCheck){ //if there is the symbol being checked in n position on a vertical line
                    verticalLine += 1
                    if(verticalLine == 3){ // if there are 3 on the same vertical line
                        return(symbolToCheck) //return the winner
                    }
                }
            }
        }

        symbolToCheck = "o" //now it will check for o instead of x
    }
    for(i=0;i<3;i++){ //3 times
        for(n=0;n<3;n++){ //3 time
            if(board[i][n] == 0){ // if there is a spot that has not been played in
                return(0) //return that no one has won this turn
            }
        }
    }
    return("tie") //if nothing has been returned up to this point return that the game cannot be won
}
function ai_move(){
    var Spaces = []
    var maxScore = 1
    tempGrid = [...grid]
    for(c=0;c<3;c++){ //for each colem
        for(r=0;r<3;r++){ //for each row
            if(grid[c][r] == 0){ //if the space is empty
                Spaces.push([c,r,1]) // add it to the list of spaces whith a score of one
                tempGrid = JSON.parse(JSON.stringify(grid)) //make a clone, not referance of grid
                tempGrid[c][r] = "o"
                if(winner(tempGrid) == "o"){
                    Spaces[Spaces.length-1][2] = 1000
                    maxScore = 1000
                }
                console.log(Spaces)
            }
        }
    }
    for(i=0;i<maxScore;i++){
        if(Spaces[i][2] == maxScore){
            space = Spaces[i]
            break
        }
    } 
    ctx.beginPath() //draw an O
    ctx.arc(space[1]*(CANVAS_SIZE/3)+CANVAS_SIZE/6,space[0]*(CANVAS_SIZE/3)+CANVAS_SIZE/6, CANVAS_SIZE/6, 0, 2 * Math.PI);
    ctx.stroke()
    console.log(grid)
    grid[space[0]][space[1]] = "o" //record where the ai played an o

}
