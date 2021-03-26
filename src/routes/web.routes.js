import {Router} from 'express'

import * as webCtrl from "../controllers/web.controller";

const router = Router()

router.get ('/', webCtrl.index)

export default router;