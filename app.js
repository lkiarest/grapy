const ServiceManager = require('@core/service/serviceManager')

module.exports = {
    start () {
        ServiceManager.getInstance().runServices()
    }
}
