import {Router} from 'express'

import * as productCtrl from "../controllers/product.controller";

const router = Router()

router.get ('/shop', productCtrl.showAllProducts)

router.get ('/productDetail/:id', productCtrl.detailProduct)

export default router;