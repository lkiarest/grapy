const Service = require('@core/service/baseService')

class SettingService extends Service {
    run () {
        console.log('now setting service is running !')
    }
}

module.exports = SettingService
