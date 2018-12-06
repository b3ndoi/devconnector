class UsersController{
    current(req, res){
        return res.json(req.user);
    }
}
module.exports = new UsersController;