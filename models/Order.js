const knex = require("../database/connection")
const ItemOrder = require("./ItemOrder")
const User = require("./User")
 
class Order {

    async create(date, nf, user_id) {
        try {

            var userExist = await User.findById(user_id)

            if (userExist) {

                await knex.insert({date, nf, user_id}).table("orders")

                return {
                    status: true,
                    info: "Pedido criado com Sucesso!"
                }
    
            } else {
                return {
                    status: false,
                    info: "Erro, Escolha um Usuario Válido!"
                }
            }
        } catch(err) {
            return {
                status: false,
                info: "Erro na criação do Pedido => " + err
            }
        }

    }

    async findById(id){
        try {
            console.log("id - " + id )
            var result = await knex.select("*").from("orders").where({id:id})
            console.log("id - " + id + ",Order " + result)
            if (result.length > 0) {
                return true
            } else {
                return false
            }
        } catch (err){
            console.log(err)
            return false
        }
        
    }

    async getOrderOfUser(id) {
        try {
            var responseOrder = await knex.select("*").from("orders").where({user_id: id, timer_concluded: null})

            if(responseOrder.length > 0) {
                var responseItems = await ItemOrder.getItemsOfOrder(responseOrder[0].id)
                if(responseItems.length > 0){
                    return {
                        order: responseOrder[0],
                        items: responseItems,
                        info: "",
                        status: true
                    }
                } else {
                    return {info: "Erro, seu pedido está sem Produto!",
                        status: false
                    }
                }
            } else {
                return {
                    info: "Erro, você não tem Pedido!",
                    status: false
                }
            }
        } catch (err) {
            console.log(err)
            return {
                info: "Erro na consulta do Pedido!" + err,
                status: false
            }
        }
    }
} 

module.exports = new Order()