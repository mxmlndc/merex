import path from "path";
import {Router} from "express";

const router = Router()

import * as apiControllerUser from "../../controllers/api/api.user.controller";
 

router.get('/apiUsersMsList', apiControllerUser.list);

export default router;