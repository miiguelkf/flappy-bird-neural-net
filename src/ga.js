function mutate(bird, amount = 1) {
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

function selectParents(birds, numOfParents) {
    // let birdsCopy = []
    // for (bird for birds) {
    //     birdsCopy = bird.copy()
    // }
    birds.sort(function (a, b) {
        return parseInt(b.fitness) - parseInt(a.fitness)
    })
    return birds.slice(0, numOfParents)
}

function nextGeneration(birds, numOfParents, mutationAmount) {
    let newBirds = []
    let parents = selectParents(birds, numOfParents)

    for (let i = 0; i < numOfParents; i++) {
        newBirds.push(parents[i].copy())
    }

    for (let i = numOfParents; i < birds.length; i++) {
        randomParent = parents[Math.floor(Math.random() * parents.length)]
        newBirds.push(mutate(bird = randomParent.copy(), amount = mutationAmount))
        newBirds[i] = randomParent.copy()
        newBirds[i] = mutate(newBirds[i])
    }

    return newBirds
}