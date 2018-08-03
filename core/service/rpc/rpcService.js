const grpc = require('grpc')
const path = require('path')
const fs = require('fs')
const ProtoReader = require('@core/service/rpc/protoReader')
const Service = require('@core/service/baseService')

class RpcService extends Service {
    constructor (name, filePath) {
        super(name, filePath)

        this._rpc = null
    }

    initServer () {
        const server = new grpc.Server()

        const protoDef = this._readProtoDef()

        Object.keys(protoDef).forEach(pack => {
            Object.keys(protoDef[pack]).forEach(service => {
                console.log(pack, service)
                server.addService(protoDef[pack][service].service, this.getActions(pack, service))
            })
        })

        server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

        this._rpc = server
        server.start()
    }

    _readProtoDef () {
        const protoPath = this._getProtoPath()

        if (!protoPath) {
            return null
        }

        return ProtoReader.read(protoPath)
    }

    start () {
        super.start()
        this.initServer()
    }

    _getProtoPath () {
        const protoPath = path.resolve(this.path, '..', `${this.name}.proto`)
        if (!fs.existsSync(protoPath)) {
            console.warn(`lack of proto file [${protoPath}]`)
            return ''
        }

        return protoPath
    }

    // @abstract method
    getActions () {
        cnosole.warn(`no action provide in service ${this.name}`)
    }
}

module.exports = RpcService
