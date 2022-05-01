import express from "express";
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
    return res.json({ data: "cool" });
});

app.post("/test", async (req, res) => {
    let reqData = req.body;
    console.log("data: ", reqData);
    return res.json({ reqData });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
