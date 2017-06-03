class ToggleFilterCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(this.img)
        this.src = this.getAttribute('src')
        this.color = this.getAttribute('color')
        this.colorFilter = new ColorFilter()
    }
    render(image) {
        const w = image.width , h = image.height
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const context = canvas.getContext('2d')
        context.drawImage(image,0,0)
        this.colorFilter.draw(context,this.color)
    }
    connectedCallback() {
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            this.colorFilter.setMaxH(2*image.height/3)
            this.render(image)
        }
    }
}
class ColorFilter {
    constructor() {
        this.hx = 0
        this.dir = 0
    }
    draw(context,color,w) {
        context.fillStyle = color
        context.globalAlpha = 0.44
        context.fillRect(0,0,w,this.hx)
    }
    setMaxH(maxH) {
        this.maxH = maxH
    }
    setDir(dir) {
        this.dir = dir
    }
    stopped() {
        return this.dir == 0
    }
    update() {
        this.hx += ((this.maxH)/5) * this.dir
        if(this.hx > this.maxH) {
            this.dir = 0
            this.hx = this.maxH
        }
        if(this.hx < 0) {
            this.dir = 0
            this.hx = 0
        }
    }
}
