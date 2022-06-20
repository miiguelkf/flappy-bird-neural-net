const canvas = document.getElementById("gameScreen")
const ctx = canvas.getContext("2d")
const slider = document.getElementById("FPSValue")

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
let FPS = 60
let birds = generateFirstGeneration(birdQty)

animate()

function animate() {
    
    if (aliveBirds == 0) {
        startNewGeneration()
    }

    // add new pipe
    if (frameCounts % 150 == 0) {
        pipes.push(new Pipe(width = 50, gap = 100, canvasDimensions = canvasDimensions))
    }

    // update pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].update()
        if (pipes[i].offScreen()) {
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
                aliveBirds--
                console.log(birds[i].fitness)
            }
        }
    }

    // draw everything
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)
    drawBackground()
    for (let bird of birds) {
        if (!bird.isDamaged) {
            bird.draw(ctx)
        }
    }
    for (let pipe of pipes) {
        pipe.draw(ctx)
    }
    drawbase()

    ctx.font = '30px Open Sans'
    ctx.fillText(
        'Score ' + Math.max(...birds.map(o => o.fitness)).toLocaleString(),
        canvasDimensions.width/20, 50
    )

    ctx.fillText(
        'Alive ' + aliveBirds + ' / ' + birdQty,
        canvasDimensions.width/20, 90
    )

    ctx.fillText(
        'Gen ' + currentGeneration,
        canvasDimensions.width/20, 130
    )

    frameCounts++

    //get fps value from slider
    FPS = parseInt(slider.value)
    setTimeout(animate, 1000 / FPS)
}

function startNewGeneration() {
    // console.log(
    //     'Generation:', currentGeneration,
    //     'Best Bird:', Math.max(...birds.map(o => o.fitness))
    // )
    currentGeneration += 1
    aliveBirds = birdQty
    pipes = []
    frameCounts = 0
    birds = GA.nextGeneration(birds = birds, numOfParents = 2, mutationAmount = 0.2)
}

function generateFirstGeneration(birdQty) {
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