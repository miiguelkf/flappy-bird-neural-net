class Bird {
    constructor(x, width, height, brain) {
        this.birdImg = new Image()
        this.birdImg.src = 'images/bird.png'

        this.x = x
        this.y = canvasDimensions.height / 2
        this.width = width
        this.height = height

        this.lift = 4
        this.gravity = 0.2
        this.velocity = 0

        this.fitness = 0
        this.isDamaged = false

        this.controls = new Controls()

        if (brain) {
            this.brain = JSON.parse(JSON.stringify(brain))
        } 
        else {
            this.brain = new NeuralNetwork([2, 3, 2])
        }
    }

    copy() {
        return new Bird(this.x, this.width, this.height, this.brain)
    }

    getClosestPipe(pipes) {
        if (pipes.length == 0) {
            return null
        }
        // find the closest pipe
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = (pipes[i].x + pipes[i].width) - this.x
            if (diff >= 0 && diff < record) {
                record = diff;
                closest = pipes[i];
            }
        }
        return closest
    }

    #detectDamage(pipes, canvasDimensions, baseDimensions) {
        // ground collision
        if (this.y + this.height >= canvasDimensions.height - baseDimensions.height) {
            return true
        }

        // pipe collision
        let pipe = this.getClosestPipe(pipes)
        if (!pipe) {
            return false
        }
        if (this.y < pipe.top || (this.y + this.height) > (pipe.top + pipe.gap)) {
            if ((this.x + this.width) > pipe.x && this.x < (pipe.x + pipe.width)) {
                return true
            }
        }
        return false
    }

    think(pipes) {
        let pipe = this.getClosestPipe(pipes)
        if (!pipe) {
            return false
        }

        let inputs = [];
        inputs[0] = this.y / canvasDimensions.height
        inputs[1] = pipe.top / canvasDimensions.height
      
        const outputs = NeuralNetwork.feedForward(inputs, this.brain)

        if (outputs[0] > outputs[1]) {
            // this.velocity = -this.lift
            this.controls.up = true
        } else {
            this.controls.up = false
        }
    }

    #move() {
        this.velocity += this.gravity
        this.y += this.velocity

        if (this.controls.up && this.y > 0) {
            this.velocity = -this.lift
            // this.flySound.play()
        }
    }

    update() {
        this.fitness += 1
        this.#move()
        this.isDamaged = this.#detectDamage(pipes, canvasDimensions, baseDimensions)
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
        ctx.rotate(15 * this.velocity * Math.PI / 360)
        // ctx.fillRect(
        //     -this.width/2, -this.height/2,
        //     this.width, this.height
        // )
        ctx.drawImage(
            this.birdImg,
            -this.width / 2, -this.height / 2,
            this.width, this.height
        )
        ctx.restore()
    }

}