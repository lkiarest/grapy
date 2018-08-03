const RpcService = require('@core/service/rpc/rpcService')

class UserService extends RpcService {
    // can provider actions according to pack & service name
    getActions (pack, service) {
        return {
            ping: this._ping
        }
    }

    _ping (call, callback) {
        console.log('response to ping request ' + call.request.name)
        callback(null, {message: 'pong ' + call.request.name})
    }
}

module.exports = UserService
