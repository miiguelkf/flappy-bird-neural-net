class Controls {
    constructor() {
        this.up = false
        this.#addKeyboardListener()
        this.#addMouseListener()
    }

    #addKeyboardListener() {
        document.onkeydown = (event) => {
            switch (event.code) {
                case "ArrowUp":
                    this.up = true
                    break
            }
        }
        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.up = false
                    break
            }
        }
    }

    #addMouseListener() {
        document.onmousedown = (event) => {
            this.up = true
        }
        document.onmouseup = (event) => {
            this.up = false
        }
    }

}