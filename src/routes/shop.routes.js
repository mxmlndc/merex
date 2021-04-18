import {Router} from 'express'

import * as shopCtrl from "../controllers/shop.controller";

import checkAuthenticated from "../middlewares/checkAuthenticated";

const router = Router()

router.get ('/shoppingCart', /*checkAuthenticated,*/ shopCtrl.getCart)

router.post('/add-to-cart', shopCtrl.addToCart);

router.post('/delete-cart', shopCtrl.deleteInCart);

router.get ('/search-result', shopCtrl.findOneProduct)

export default router;