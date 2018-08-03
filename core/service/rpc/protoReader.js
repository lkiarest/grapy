const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

class ProtoReader {
    static read (protoPath) {
        if (!protoPath) {
            return null
        }

        const protoDef = protoLoader.loadSync(protoPath)
        return grpc.loadPackageDefinition(protoDef)
    }
}

module.exports = ProtoReader
