import {Router} from 'express'
import * as userCtrl from "../controllers/user.controller";
import bcrypt from "bcrypt";
import passport from "passport";
import methodOverride from "method-override";
import * as userValid from "../middlewares/userValidator";

const router = Router()

router.get ('/register', userCtrl.index)

router.post ('/register', userValid.signUp, userCtrl.createUser)

router.get ('/login', userCtrl.enter)

router.post ('/login', userValid.signIn, userCtrl.loginUser)

router.delete('/logout', userCtrl.logOut)

router.get ('/dashboard/users', userCtrl.findAllUsers)

router.get ('/dashboard/users:id', userCtrl.findOneUser)

router.delete ('/dashboard/users:id', userCtrl.deleteUser)

router.put('/dashboard/users:id', userCtrl.updateUser)

router.get ('/search-result', userCtrl.findOneProduct)


export default router;