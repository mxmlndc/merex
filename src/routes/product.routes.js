import {Router} from 'express'

import * as productCtrl from "../controllers/product.controller";

const router = Router()

router.post ('/dashboard/product', productCtrl.createProduct)

router.get ('/shop', productCtrl.showAllProducts)

router.get ('/productDetail/:id', productCtrl.detailProduct)

router.post('/add-to-cart', productCtrl.addToCart);

router.get ('/shoppingCart', productCtrl.getCart)

router.delete ('/dashboard/product:id', productCtrl.deleteProduct)

router.put('/dashboard/product:id', productCtrl.updateProduct)

export default router;