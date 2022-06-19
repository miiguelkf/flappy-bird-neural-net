const canvas = document.getElementById("gameScreen")
const ctx = canvas.getContext("2d")

canvasDimensions = {
    width: 500,
    height: 512
}
canvas.width = canvasDimensions.width
canvas.height = canvasDimensions.height

const backgroundImg = new Image()
backgroundImg.src = 'images/background.png'

const baseImg = new Image()
baseImg.src = 'images/base.png'
baseDimensions = {
    width: 336,
    height: 75
}

let pipes = []
let birdQty = 50
let frameCounts = 0
let aliveBirds = birdQty
let currentGeneration = 0

let birds = generateBirds(birdQty)

animate()
function animate() {

    if (aliveBirds == 0) {
        currentGeneration += 1
        console.log(
            'Currente Gen:', currentGeneration,
            'Best Bird:', Math.max(...birds.map(o => o.fitness))
        )
        aliveBirds = birdQty
        pipes = []
        frameCounts = 0 
        birds = nextGeneration(birds = birds, numOfParents = 5, mutationAmount = 0.4)
    }

    // add new pipe
    if (frameCounts % 150 == 0) {
        pipes.push(new Pipe(width = 50, gap = 100, canvasDimensions = canvasDimensions))
    }

    // update pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].update()

        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1)
            i--
        }
    }

    // update bird
    for (let i = 0; i < birds.length; i++) {
        if (!birds[i].isDamaged) {
            birds[i].update(pipes, canvasDimensions, baseDimensions)
            birds[i].think(pipes)
            if (birds[i].isDamaged) {
                // birds.splice(i, 1)
                aliveBirds -= 1
            }
        }

    }

    // draw everything
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)
    drawBackground()
    for (let bird of birds) {
        if (!bird.isDamaged){
            bird.draw(ctx)
        }
    }
    for (let pipe of pipes) {
        pipe.draw(ctx)
    }
    drawbase()

    frameCounts += 1
    setTimeout(animate, 1000 / 240)
}

function generateBirds(birdQty) {
    let birds = []
    for (let i = 0; i < birdQty; i++) {
        birds[i] = new Bird(x = 100, width = 40, height = 30)
    }
    return birds
}

function drawBackground() {
    for (var i = 0; i < 2; i++) {
        ctx.drawImage(
            backgroundImg,
            i * backgroundImg.width, 0
        )
    }
}

function drawbase() {
    for (let i = 0; i < 2; i++) {
        ctx.drawImage(
            baseImg,
            i * baseDimensions.width, canvasDimensions.height - baseDimensions.height,
            baseDimensions.width, baseDimensions.height
        )
    }
}