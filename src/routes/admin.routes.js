import {Router} from 'express'

import * as adminCtrl from "../controllers/admin.controller";

const router = Router()

router.get ('/dashboard', adminCtrl.index)

router.get ('/dashboard/product-list', adminCtrl.showAllProducts)

router.get ('/dashboard/stock', adminCtrl.stock)

router.get ('/dashboard/new-product', adminCtrl.create)

router.post ('/dashboard/new-product', adminCtrl.createProduct)

router.delete ('/dashboard/delete/:id', adminCtrl.deleteProduct)

router.get('/dashboard/edit/:id', adminCtrl.editProduct)

router.put('/dashboard/update/:id', adminCtrl.updateProduct)

router.get ('/search-result', adminCtrl.findOneProduct)


export default router;