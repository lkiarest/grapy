const Service = require('@core/service/baseService')

class ProductService extends Service {
    run () {
        console.log('now product service is running !')
    }
}

module.exports = ProductService
