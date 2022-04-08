const Order = require("../models/Orders")

class OrderController {

    async create(req, res) {
        var {date, nf, user_id} = req.body

        if(date == undefined) {
            res.status(400)
            res.json({
                status: false,
                info: "Data Invalida!"
            })
        } 
        if(nf == undefined) {
            res.status(400)
            res.json( {
                status: false,
                info: "Nota Fical Invalida!"
            })
        } 
        var responseJson = await Order.create(date, nf, user_id)

        res.status(200)
        res.json(responseJson)
    }
}

module.exports = new OrderController()