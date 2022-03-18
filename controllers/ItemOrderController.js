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
        var {product_id, tempo_inicial} = req.body

        if(
            product_id != undefined && !isNaN(product_id) &&
            tempo_inicial != undefined && tempo_inicial.trim() != ""
        ) {
            var response = ItemOrder.updateStartItem(product_id, tempo_inicial)

            res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }

    async updateConfirmTag(res, res) {
        var product_id = req.body.product_id

        if(product_id != undefined && !isNaN(product_id)){
            var response = await ItemOrder.updateConfirmTag(product_id)
            res.json(response)
        } else {
            res.json({
                info: "Erro, Campo inválido!",
                status: false
            })
        }
    }
}
module.exports = new ItemOrderController()