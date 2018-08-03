const fs = require('fs')
const path = require('path')
const config = require('@root/config')
const eventBus = require('@core/eventBus')
const ServiceWorker = require('@core/service/serviceWorker')

const SERVICE_DIR = config.SERVICE_DIR
const ENTRY_NME = 'index.js'
const INSTANCE_KEY = Symbol()

class ServiceHolder {
    constructor (name, filePath) {
        this.name = name,
        this.path = filePath
    }
}

class ServiceManager {
    constructor () {
        this._services = this._findServices()
        this._dict = this._services.reduce((ret, item) => {
            return Object.assign(ret, {[item.name]: item.path})
        }, {})

        this._worker = new ServiceWorker()
        this._worker.start()
    }

    /**
     * run service list, if no input service, run all services
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
    runServices (...args) {
        this._loopServices(this._startService.bind(this))
    }

    stopServices (...args) {
        this._loopServices(this._stoptService.bind(this))
    }

    static getInstance () {
        if (! ServiceManager[INSTANCE_KEY]) {
            ServiceManager[INSTANCE_KEY] = new ServiceManager()
        }

        return ServiceManager[INSTANCE_KEY]
    }

    _loopServices (callback, ...args) {
        if (args.length === 0) {
            this._services.forEach(item => callback(item.name, item.path))
        } else {
            args.forEach(name => {
                const servicePath = this._dict[name]
                servicePath && callback(name, servicePath)
            })
        }
    }

    _startService (name, servicePath) {
        eventBus.emit('service-start', name, servicePath)
    }

    _stoptService (name, servicePath) {
        eventBus.emit('service-stop', name, servicePath)
    }

    _findServices () {
        const result = fs.readdirSync(SERVICE_DIR)
        const services = []

        result.forEach(item => {
            // check service entry 'index.js'
            const servicePath = path.join(SERVICE_DIR, item, ENTRY_NME)
            if (! fs.existsSync(servicePath)) {
                console.error(`should provide "index.js" as an entry for service ${item} !`)
                return false
            } else {
                services.push(new ServiceHolder(item, servicePath))
            }
        })

        return services
    }
}

module.exports = ServiceManager
