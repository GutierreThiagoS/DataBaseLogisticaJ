class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Page Index");
    }

}

module.exports = new HomeController();