import { Router } from "express";
import School from "../schemas/School";
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

// TODO: implement cke 
router.get("/cke/:rspo", async (req, res) => {
    res.send({});
})

export default router;