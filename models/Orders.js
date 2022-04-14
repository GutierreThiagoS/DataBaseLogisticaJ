const knex = require("../database/connection")
const ItemOrder = require("./ItemOrder")
const User = require("./User")
 
class Orders {

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

    async getOrders(idOrder) {
        try {
            console.log("id: " + idOrder );
            var result = await knex.select().from("orders").where({ id : idOrder });
            return result
           
        } catch(err) {
            console.log(err);
            return [];
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

    async getAllOrderGa(){
        try {
            var ordersUsers = await knex.raw(
                "SELECT u.name, u.email, o.user_id, o.id, o.date, o.nf, o.timer_concluded FROM orders o INNER JOIN users u ON o.user_id = u.id"
                )

            return {
                ordersUsers: ordersUsers[0],
                info: "Pedidos OK!" ,
                status: true
            }
        } catch(err) {
            return {
                ordersUsers: [],
                info: "Error => " + err ,
                status: false
            }
        }
        
    }
} 

module.exports = new Orders()