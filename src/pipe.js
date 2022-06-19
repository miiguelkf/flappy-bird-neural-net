class Pipe {
    constructor(width, gap, canvasDimensions) {
        this.pipeBotImg = new Image()
        this.pipeBotImg.src = 'images/pipebottom.png'
        this.pipeTopImg = new Image()
        this.pipeTopImg.src = 'images/pipetop.png'

        this.width = width
        this.x = canvasDimensions.width
        this.gap = gap

        this.top =  Math.random() * canvasDimensions.height / 2 + 10
        this.bottom = canvasDimensions.height - this.gap - this.top

        this.velocity = 2

        this.passed = false
    }

    #move() {
        this.x -= this.velocity
    }

    behindBird(bird) {
        if ((bird.x > this.x) && !this.passed) {
            this.passed = true
            return true
        }
        return false
    }

    update() {
        this.#move()
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.drawImage(
            this.pipeTopImg,
            this.x, this.top - this.pipeTopImg.height,
            this.width, this.pipeTopImg.height
        )
        ctx.drawImage(
            this.pipeBotImg,
            this.x, this.top + this.gap,
            this.width, this.pipeBotImg.height
        )
    }

}