const User = require("../models/User")
const bcrypt = require("bcrypt")
//const jwt = require("jsonwebtoken")

const Order = require("../models/Order")
const { jwt, secret } = require("../middleware/AdminAuth")

//const secret = "jisbvusbzdkwqmdckçlasmcmiowefoic4j38r34r09jefijw43094"

class UserController {

    async create(req, res) {
        console.log(req.body)

        var {name, email, password, role} = req.body

        if(email == undefined) {
            res.status(400)
            res.json({
                status: false,
                info: "O e-mail é invalido!"
                })
            return;
        } 

        if(isNaN(role)) {
            res.status(400)
            res.json({
                status: false,
                info: "Indique a Função!"
                })
            return;
        } 

        var emailExists = await User.findEmail(email)

        if(emailExists) {
            res.status(406)
            res.json({
                status: false,
                info: "O e-mail já está cadastrado!"
            })
            return;
        }
        var result = await User.create(name, email, password, role)

        res.status(200)
        res.json(result)
    }

    async login(req, res) {

        var {email, password} = req.body
        var user = await User.findByEmail(email)
        var userRes = {}

        if (user != undefined) {

            var result = await bcrypt.compare(password, user.password)

            if(result) {
                var token = jwt.sign({ email: user.email, role: user.role }, secret)

                var order = await Order.getOrderOfUser(user.id)
            
                if(order.status) {
                    userRes.id = user.id
                    userRes.name = user.name
                    userRes.email = user.email
                    userRes.token = token

                    res.status(200)
                    res.json({ 
                        user: userRes,
                        order: order.order,
                        items: order.items,
                        info: "Acesso Permitido!", 
                        status: true
                    })
                } else {
                    res.status(400)
                    res.json({ 
                        user: {},
                        order: {},
                        items: [],
                        info: order.info, 
                        status: false
                    })
                }
                
            } else {
                res.status(406)
                res.json({ 
                    user: {},
                    order: {},
                    items: [],
                    info: "Email ou Senha Inválida!", 
                    status: false
                })
            }

        } else {
            res.status(400)
            res.json({ 
                user: {},
                order: {},
                items: [],
                info: "Erro, Email ou Senha Inválida!", 
                status: false
            })
        }
    }
}

module.exports = new UserController()