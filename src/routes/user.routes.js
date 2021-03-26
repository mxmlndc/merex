import {Router} from 'express'
import * as userCtrl from "../controllers/user.controller";
import bcrypt from "bcrypt";
import passport from "passport";
import checkAuthenticated from "../middlewares/checkAuthenticated";
import checkNoAuthenticated from "../middlewares/checkNoAuthenticated";
import methodOverride from "method-override";

const router = Router()

router.get ('/register', userCtrl.index)

router.post ('/register', userCtrl.createUser)

router.get ('/login', userCtrl.enter)

router.post ('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}), userCtrl.loginUser)

router.delete('/logout', userCtrl.logOut)

router.get ('/dashboard/users', userCtrl.findAllUsers)

router.get ('/dashboard/users:id', userCtrl.findOneUser)

router.delete ('/dashboard/users:id', userCtrl.deleteUser)

router.put('/dashboard/users:id', userCtrl.updateUser)

export default router;