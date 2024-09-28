import { Router } from "express";
import school from "./school";
import map from "./map";
const router = Router();

router.use("/", school);
router.use("/map", map);

export default router;