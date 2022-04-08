const ItemOrder = require("../models/ItemOrder")
const validItem = require("./ValidItemOrder")


class ItemOrderController {

    async create(req, res) {
    
        var response = validItem(req.body)
        console.log(response)

        if (response.status) {
            res.status(200)
            var respInsert = await ItemOrder.create(response.itemOrder)
            res.json({Validação: response, Insert: respInsert})
        } else {
            res.status(400)
            res.json(response)
        }
    }

    async updateStartItem(req, res) {
        var {product_id, tempo_inicial, order_id} = req.body

        if(
            product_id != undefined && !isNaN(product_id) &&
            tempo_inicial != undefined && tempo_inicial.trim() != ""
        ) {
            var response = await ItemOrder.updateStartItem(product_id, tempo_inicial, order_id)

            res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }

    async updateConfirmTag(req, res) {
        var {product_id, order_id } = req.body

        if(
            product_id != undefined && !isNaN(product_id) && 
            order_id != undefined && !isNaN(order_id) 
        ){
            var response = await ItemOrder.updateConfirmTag(product_id, order_id)
            res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }

    async updateProductCollected(req, res) {
        var {product_id, quantity, order_id} = req.body

        if(product_id != undefined && !isNaN(product_id) &&
            quantity != undefined && !isNaN(quantity) ) {
                var response = await ItemOrder.updateProductCollected(product_id, quantity, order_id)
                res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }
    
    async updateLastEtiquette(req, res) {

        var {product_id, last_etiquette, chronometer, timer_end, order_id} = req.body

        console.log("product_id " + product_id + ", last_etiquette " + last_etiquette + ", chronometer " + chronometer + ", timer_end " + timer_end)
        if (
            product_id != undefined && !isNaN(product_id) &&
            last_etiquette != undefined && last_etiquette.trim() != "" &&
            chronometer != undefined && chronometer.trim() != "" &&
            timer_end != undefined && timer_end.trim() != ""
        ) {
            var response = await ItemOrder.updateLastEtiquette(product_id, last_etiquette, chronometer, timer_end, order_id)
            res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }

    async getJsonItemsTeste(req, res){
        var response = await ItemOrder.getJsonItemsTeste() 
        res.json( response )
    }
}
module.exports = new ItemOrderController()