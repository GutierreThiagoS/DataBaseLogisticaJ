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
            res.status(403)
            res.send("Você não tem permissão para isso!")
            return;
        }
    } else {
        res.status(403)
        res.send("Voçe não está autenticado!")
        return;
    }
}
module.exports = { token, secret, jwt}