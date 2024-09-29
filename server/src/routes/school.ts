import { Router } from "express";
import School from "../schemas/School";
import json from "../json/res.json";
import contact from "../json/contact.json";
const router = Router();

router.get("/school/:rspo", async (req, res) => {
    const { rspo } = req.params;
    if (!rspo) {
        res.status(400);
        return;
    }
    const data = await School.findOne({
        rspo
    })
    if (!data) {
        res.status(400);
        return;
    }
    res.send(data);
})

router.get("/schools", async (req, res) => {
    res.send(contact);
})

router.get("/cke/:rspo", async (req, res) => {
    const { rspo } = req.params;
    if (!rspo) {
        res.status(400);
        return;
    }
    const data = await CKE.findOne({
        rspo
    })
    if (!data) {
        res.status(400);
        return;
    }
    res.send(data);
})

export default router;