import { Router } from "express";
import School from "../schemas/School";
const router = Router();

router.get("/proximity", async (req, res) => {
    const { coordinates, min, max } = req.body;
    if (!coordinates || !min || !max) {
        res.send(400);
        return;
    }
    const data = await School.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates
                },
                minDistance: min,
                maxDistance: max
            }
        }
    })
    if (!data) {
        res.send(400);
        return;
    }
    res.send(data);
})

router.get("/minimal", async (req, res) => {
    res.send(await School.aggregate([
        {
            $project: {
                "rspo": 1,
                "type": 1,
                "name": 1,
                "location": 1
            }
        }
    ]));
})

export default router;