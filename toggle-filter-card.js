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
        context.save()
        context.fillStyle = 'black'
        context.globalAlpha = 0.55
        context.restore()
        this.circularProgress.draw(context,this.color)
    }
    connectedCallback() {
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            this.circularProgress = new CircularProgress(image.width,image.height)
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
        context.save()
        context.fillStyle = color
        context.globalAlpha = 0.44
        context.fillRect(0,0,w,this.hx)
        context.restore()
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
class CircularProgress {
    constructor(w,h) {
        this.ea = 0
        this.x = w/2
        this.y = 5*h/6
        this.dir = 0
        this.r = h/10
    }
    draw(context,color) {
        context.fillStyle = color
        context.save()
        context.translate(this.x,this.y)
        context.beginPath()
        context.moveTo(0,0)
        for(var i=0;i<=this.ea;i++) {
            const x = r*(Math.cos(i*Math.PI/180)) , y = r*(Math.sin(i*Math.PI/180))
            context.lineTo(x,y)
        }
        context.fill()
        context.restore()
    }
    setDir(dir) {
        this.dir = dir
    }
    stopped() {
        return this.dir == 0
    }
    update() {
        this.ea += (72*this.dir)
        if(this.ea > 360) {
            this.dir = 0
            this.ea = 360
        }
        if(this.ea < 0) {
            this.dir = 0
            this.ea = 0
        }
    }
}
