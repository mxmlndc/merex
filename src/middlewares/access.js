import User from "../models/user";


const access = (req,res,next) => {
    res.locals.user = false;   
    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    } else if(req.cookies.email){
        User.findOne({where:{email:req.cookies.email}})
            .then(user => {
            let userLogueado = user;
            delete userLogueado.password;            
            //console.log(userLogueado);
            req.session.user = undefined;
            res.locals.user = undefined;
            req.session.user = userLogueado;
            res.locals.user = userLogueado;
            return next();
            })
            .catch(err => res.send(err));
    }
    setTimeout(()=>next(),100);
}

export default access;