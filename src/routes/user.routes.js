import {Router} from 'express'
import * as userCtrl from "../controllers/user.controller";
import bcrypt from "bcrypt";
import passport from "passport";
import checkNoAuthenticated from "../middlewares/checkNoAuthenticated";
import methodOverride from "method-override";

const router = Router()

router.get ('/register', checkNoAuthenticated, userCtrl.index)

router.post ('/register', checkNoAuthenticated, userCtrl.createUser)

router.get ('/login', checkNoAuthenticated, userCtrl.enter)

router.post ('/login', checkNoAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}), userCtrl.loginUser)

router.delete('/logout', userCtrl.logOut)

router.get ('/dashboard/users', userCtrl.findAllUsers)

router.get ('/dashboard/users:id', userCtrl.findOneUser)

router.delete ('/dashboard/users:id', userCtrl.deleteUser)

router.put('/dashboard/users:id', userCtrl.updateUser)

router.get ('/search-result', userCtrl.findOneProduct)


export default router;