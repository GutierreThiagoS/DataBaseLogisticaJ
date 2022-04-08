const knex = require("../database/connection")
const Orders = require("./Orders")

class ItemOrder {
    async create(itemOrder){
        try {
            console.log("order_id: " + itemOrder.order_id);
            // var order = await Order.getOrders(itemOrder.order_id);
            var order = await knex.select().from("orders").where({id: itemOrder.order_id})
            
            console.log("order: " + order);

            if(order != undefined && order.length > 0) {
                await knex.insert(itemOrder)
                    .table("items_order");

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
            var items = await knex.select("*")
                .from("items_order")
                .where({order_id: id})
            return items
        } catch(err) {
            return {}
        }
    }

    async updateStartItem(product_id, tempo_inicial, order_id){
        try {
            console.log("product_id" + product_id + ", Tempo " + tempo_inicial + ", order  " + order_id)

            await knex.where({ id: product_id, order_id: order_id })
                .update({ timer_start: tempo_inicial })
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

    async updateConfirmTag(product_id, order_id) {
        try {
            await knex.where({ id: product_id, order_id: order_id})
                .update({ confirm_tag: 1 })
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

    async updateProductCollected(product_id, quantity, order_id){
        try{
            var isUp = await knex.where({ id: product_id, quantity_total: quantity, order_id: order_id })
                .update({ quantity_lack: 0 })
                .table("items_order")
                if(isUp) {
                    return {
                        info: "Quantidade Coletada!",
                        status: true
                    }
                } else {
                    return {
                        info: "Quantidade não coletada!",
                        status: false
                    }
                }
           
        } catch (err) {
            return {
                info: "Erro, Quantidade não coletada! => " + err,
                status: false
            }
        }
    }

    async updateLastEtiquette( product_id, last_etiquette, chronometer, timer_end, order_id) {
        try {
            await knex.where({id: product_id,order_id: order_id})
                .update({last_etiquette: last_etiquette, chronometer: chronometer, timer_end: timer_end})
                .table("items_order")
                return {
                    info: "Etiqueta Gravada com Sucesso!",
                    status: true
                }
        } catch (err) {
            return {
                info: "Erro, Etiqueta não gravada! => " + err,
                status: false
            }
        }
    }

    async getJsonItemsTeste() {
        try{
            var items = await knex.select().table("items_order")
            
            return {
                items: items,
                info: "Items Solicitados"
            }
        } catch (err) {
            return {
                items: [],
                info: "Error Items Invalidos"
            }
        }
    }
}

module.exports = new ItemOrder()