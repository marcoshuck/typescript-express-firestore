import {Router} from "express";

import example from "./example.routes";

const router: Router = Router();

router.use("/examples", example);

export default router;
