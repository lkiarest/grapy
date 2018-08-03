class Service {
    constructor (name, filePath) {
        this.name = name
        this.path = filePath
    }

    initDb () {
        console.log('init db')
    }

    start () {
        console.log('start ' + this.name)
    }

    stop () {
        console.log('stop ' + this.name)
    }
}

module.exports = Service
