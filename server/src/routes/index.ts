import { Router } from "express";
import school from "./school";
import map from "./map";
import enums from "./enums";
const router = Router();

router.use("/", school);
router.use("/map", map);
router.use("/", enums);

export default router;