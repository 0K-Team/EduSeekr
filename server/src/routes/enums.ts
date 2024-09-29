import { Router } from "express";
import majors from "../json/majors.json";
import types from "../json/type.json";
const router = Router();

router.get("/majors", (req, res) => {
    res.send(majors);
})

router.get("/type", (req, res) => {
    res.send(types);
})

export default router;