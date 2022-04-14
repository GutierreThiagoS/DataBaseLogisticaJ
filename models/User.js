const knex = require("../database/connection")
var bcrypt = require("bcrypt")
var Orders = require("./Orders")

class User {

    async create(name, email, password, role) {
        try {
            var hash = await bcrypt.hash(password, 10)

            await knex.insert({
                name,
                email,
                password: hash, 
                role
            }).table("users")

            return {
                status: true,
                info: "Usuário Salvo com Sucesso!"
            }

        } catch(err){
            console.log(err)
            return {
                status: false,
                info: "Erro, na criação do Usuario => " + err
            }
        }
    }

    async findEmail(email) {
        try{
            var result = await knex.select("*").from("users").where({email: email})
            console.log("result " + result)

            if(result.length > 0) {
                return true
            } else {
                return false
            }

        }catch(err){
            console.log(err)
            return false
        }
    }

    async findById(id) {
        try {
            var result = await knex.select("*").from("users").where({id: id})
            console.log("result " + result)

            if(result.length > 0) {
                return true
            } else {
                return false
            }

        } catch(err) {
            console.log(err)
            return false
        }
    }

    async findByEmail(email) {
        try{
            console.log("EMAIL - " + email)

            var result = await knex
                .select(["id", "name", "email", "password", "role"])
                .where({email: email})
                .table("users")

            if (result.length > 0) {
                return result[0]
            } else {
                result = undefined
            }

            return result
        } catch(err){
            console.log(err)
            result = undefined
        }
    }

    async getAllUsersWorkers(){
        try{
            var usersList = await knex
                .select(["id", "name", "email"])
                .where({role: 0})
                .table("users")

            var orders = await knex
                .select()
                .table("orders");

            var items = await knex.select().table("items_order")

            orders.forEach( (order) => {
                order.items = items.filter( i => i.order_id == order.id)
            })

            usersList.forEach( (user, i) => {
                console.log("Index: " + i)
                console.log("user")
                console.log(user)
                user.order = orders.filter( o => o.user_id == user.id)
            })

            return {
                workers: usersList,
                status: true,
                info: "Dados retornados com Sucesso!"
            }
        } catch(err) {
            return {
                workers: [],
                status: false,
                info: "Error ! => " + err
            }
        }
    }

    async getAllWorkersStatistcs(){ 
        try{
            var users = await knex.raw(`
                SELECT U.name, U.email, 
                (
                    SELECT COUNT(*) FROM items_order io 
                    INNER JOIN orders o ON io.order_id = o.id
                     WHERE o.user_id = u.id 
                ) AS countItem,
                (
                    SELECT COUNT(*) FROM items_order io 
                    INNER JOIN orders o ON io.order_id = o.id
                     WHERE o.user_id = u.id AND io.timer_end != ''
                ) AS itemConcluded
                FROM users U WHERE U.role = 0
            `)
            
            return {
                users: users[0],
                status: true,
                info: "Dados retornados com Sucesso!"
            }

        } catch(err) {
            return {
                users: [],
                status: false,
                info: "Error => " + err
            }
        }
    }

    async getAllWorkersToGa() {
        try {

            var users = await knex.select(["id", "name", "email"]).from("users").where({role: 0})

            console.log(users)

            return {
                users: users,
                status: true,
                info: "Dados retornados com Sucesso!"
            }

        } catch (err) {
            return {
                users: [],
                status: false,
                info: "Error => " + err
            }
        }
    }
}

module.exports = new User()
