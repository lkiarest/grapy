// test with grpc client 
require('../../../core/alias')

const path = require('path')
const grpc = require('grpc')
const ProtoReader = require('@core/service/rpc/protoReader')

const ROOT = path.resolve(__dirname, '../../../')
const USER_PROTO = path.resolve(ROOT, 'services/user/user.proto')

const test_1 = () => {
    const protoDef = ProtoReader.read(USER_PROTO)
    const service = new protoDef.user.userService('localhost:50051', grpc.credentials.createInsecure())
    console.log('calling ping method ...')
    service.ping({name: '1'}, (err, response) => {
        if (err) {
            console.error(err)
        } else {
            console.log(response)
        }
    })
}

test_1()
