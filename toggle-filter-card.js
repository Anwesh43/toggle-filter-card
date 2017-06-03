class ToggleFilterCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(this.img)
        this.src = this.getAttribute('src')
        this.color = this.getAttribute('color')
    }
    render(image) {
        const w = image.width , h = image.height
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        context.drawImage(image,0,0)
    }
    connectedCallback() {
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            this.render(image)
        }

    }
}
