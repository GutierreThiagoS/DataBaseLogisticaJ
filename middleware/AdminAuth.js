const jwt = require("jsonwebtoken")
const secret = "jisbvusbzdkwqmdckçlasmcmiowefoic4j38r34r09jefijw43094"

function token(req, res, next){

    const authToken = req.headers['authorization']
    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]
        try {
            var decoded = jwt.verify(token, secret)
            console.log(decoded)
            next()
        } catch (err) {
            console.log(err)
            res.status(200)
            res.json({
                status: false,
                info: "Você não tem permissão!"
            })
            return;
        }
    } else {
        res.status(200)
        res.json({
            status: false,
            info: "Você não está autenticado!"
        })
        return;
    }
}

function tokenGa(req, res, next){

    const authToken = req.headers['authorization']
    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]
        try {
            var decoded = jwt.verify(token, secret)
            console.log(decoded)
            if (decoded.role == 1) {
                next()
            } else {
                res.json({
                    status: false,
                    info: "Você não tem permissão, somente para G.A.!"
                })
            }
            
        } catch (err) {
            console.log(err)
            res.status(200)
            res.json({
                status: false,
                info: "Você não tem permissão!"
            })
            return;
        }
    } else {
        res.status(200)
        res.json({
            status: false,
            info: "Você não está autenticado!"
        })
        return;
    }
}

module.exports = { token, tokenGa, secret, jwt}