function admin(req, res, next){
    if(req.user.role !== 'admin'){
        res.status(403).json({message: "Acces denied, Forbidden"});
    }
    next();
}
export default admin;