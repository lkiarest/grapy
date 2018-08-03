const eventBus = require('@core/eventBus')
const Service = require('@core/service/baseService')

class ServiceWorker {
    constructor () {
        this._ticker = null
        this._queue = [] // worker queue
        this._checking = false
        this._listener = null
    }

    start () {
        this._listener = this._pushTask.bind(this)
        eventBus.on('service-start', this._listener)
    }

    stop () {
        if (this._listener) {
            eventBus.off('service-start', this._listener)
            this._listener = null
        }
    }

    _pushTask (name, servicePath) {
        const newService = this._createService(name, servicePath)
        if (!newService) {
            return
        }

        this._queue.push(new Task(name, newService))

        if (!this._checking) {
            this._checkQueue()
        }
    }

    _checkQueue () {
        this.checking = true
        if (this._queue.length > 0) {
            const task = this._queue.shift()
            task.run()

            process.nextTick(this._checkQueue.bind(this))
        } else {
            this._checking = false
        }
    }

    _createService (name, servicePath) {
        const ServiceCls = require(servicePath)

        if (! Service.isPrototypeOf(ServiceCls)) {
            console.error(`service entry doesn't inherit core/base.service [${servicePath}]`)
            return null
        }

        return new ServiceCls(name, servicePath)
    }
}

class Task {
    constructor (name, service) {
        this.name = name
        this.service = service
    }

    run () {
        this.service.start()
    }
}

module.exports = ServiceWorker
