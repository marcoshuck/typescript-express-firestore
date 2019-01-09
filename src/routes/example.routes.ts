import {Router} from "express";
import ExampleController from "../controllers/example.controller";

const router: Router = Router();

router.post("/", ExampleController.create);
router.get("/:id", ExampleController.readOne);
router.get("/", ExampleController.readAll);
router.put("/:id", ExampleController.update);
router.delete("/:id", ExampleController.delete);

export default router;
