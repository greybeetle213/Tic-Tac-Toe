function init(){
    CANVAS_SIZE = window.innerHeight -10
    document.getElementById("screen").height = CANVAS_SIZE
    document.getElementById("screen").width = CANVAS_SIZE
    ctx = document.getElementById("screen").getContext("2d")
    ctx.fillStyle = "black"
    ctx.lineWidth = CANVAS_SIZE/100
    $("#screen").click(function(event){main(event)})
    grid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    ctx.beginPath()
    for(i = 1; i != 3; i ++){
        ctx.moveTo(0,CANVAS_SIZE/3*i)
        ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE/3*i)
        ctx.moveTo(CANVAS_SIZE/3*i,0)
        ctx.lineTo(CANVAS_SIZE/3*i, CANVAS_SIZE)
    }
    ctx.stroke()
}
function main(event){
    x = event.pageX - $("#screen").offset().left
    y = event.pageY
    gridX = Math.floor(event.pageX/(CANVAS_SIZE/3)-0.4)
    gridY = Math.floor(event.pageY/(CANVAS_SIZE/3))
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.beginPath()
    ctx.moveTo(gridX*(CANVAS_SIZE/3),gridY*(CANVAS_SIZE/3))
    ctx.lineTo(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/3,gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/3)
    ctx.moveTo(gridX*(CANVAS_SIZE/3)+CANVAS_SIZE/3,gridY*(CANVAS_SIZE/3))
    ctx.lineTo(gridX*(CANVAS_SIZE/3),gridY*(CANVAS_SIZE/3)+CANVAS_SIZE/3)
    ctx.stroke()
    console.log(gridX+" "+gridY)
}