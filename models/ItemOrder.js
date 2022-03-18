const knex = require("../database/connection")
const Order = require("./Order")


class ItemOrder {
    async create(itemOrder){
        try {
            var validOrder = await Order.findById(itemOrder.order_id)
            if(validOrder) {
                await knex.insert(itemOrder).table("items_order")

                return {
                    status: true,
                    info: "Pedido criado com Sucesso!"
                }
            } else {
                return {
                    status: false,
                    info: "O Pedido não é valido!"
                }
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                info: "Erro produto não inserido! => " + err
            }
        }
    }

    async getItemsOfOrder(id) {
        try {
            var items = await knex.select("*").from("items_order").where({order_id: id})
            return items
        } catch(err) {
            return {}
        }
    }

    async updateStartItem(product_id, tempo_inicial){
        try {
            await knex.where({ id: product_id }).update({ timer_start: tempo_inicial })
            .table("items_order")
            return {
                info: "Iniciado",
                status: true
            }    
        } catch(err) {
            console.log(err)
            return{
                info: "Erro, operação não iniciada! => " + err,
                status: false
            }
        }
    }

    async updateConfirmTag(product_id) {
        try {
            await knex.where({ id: product_id })
            .update({ confirm_tag: true })
            .table("items_order")

            return {
                info: "Etiqueta Confirmada!",
                status: true
            }
        } catch(err) {
            return {
                info: "Erro, Etiqueta não confirmada! => " + err,
                status: false
            }
        }
        
            
    }
}

module.exports = new ItemOrder()