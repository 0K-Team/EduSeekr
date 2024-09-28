import { Router } from "express";
const router = Router();

router.use("/", require("./school"));
router.use("/map", require("./map"));

export default router;