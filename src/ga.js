class GA {

    static mutate(bird, amount = 1) {
        let birdCopy = bird.copy()
        amount = amount < 0 ? 0 : amount
        amount = amount > 1 ? 1 : amount

        for (let level of birdCopy.brain.levels) {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = level.biases[i] + (Math.random() * 2 - 1 - level.biases[i]) * amount
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = level.weights[i][j] + (Math.random() * 2 - 1 - level.weights[i][j]) * amount
                }
            }
        }
        return birdCopy
    }

    static selectParents(birds, numOfParents) {
        birds.sort(function (a, b) {
            return parseInt(b.fitness) - parseInt(a.fitness)
        })
        return birds.slice(0, numOfParents)
    }

    static nextGeneration(birds, numOfParents, mutationAmount) {
        let newBirds = []
        let parents = this.selectParents(birds, numOfParents)

        for (let i = 0; i < numOfParents; i++) {
            newBirds[i] = parents[i].copy()
        }

        for (let i = numOfParents; i < birds.length; i++) {
            let randomParent = parents[Math.floor(Math.random() * parents.length)]
            let child = randomParent.copy()
            child = this.mutate(child, mutationAmount)
            newBirds[i] = child
        }

        return newBirds
    }

}


// let birds = []
// birds[0] = new Bird(fitness=12)
// birds[1] = new Bird(fitness=20)
// birds[2] = new Bird(fitness=5)
// birds[3] = new Bird(fitness=100)


// console.log('---------')
// for (let bird of birds){
//     console.log(bird.brain.levels[0].weights)
// }

// let nextGen = GA.nextGeneration(birds, 2, 0.1)

// console.log('---------')
// for (let bird of nextGen){
//     console.log(bird.brain.levels[0].weights)
// }