const knex = require("../database/connection")
var bcrypt = require("bcrypt")

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
}

module.exports = new User()