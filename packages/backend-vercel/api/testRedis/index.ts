import Redis from "ioredis";

export default async (req, res) => {
    // this function will be launched when the API is called.
    try {
        let client = new Redis(process.env.REDIS_URL);
        // let obj = { tx: "cool tx" };
        let obj = [];
        // let dataSet = await client.set("txData", JSON.stringify(obj));
        // console.log("dataSet: ", dataSet);
        // let data = await client.get("txData");
        // data = JSON.parse(data);
        // console.log("data: ", data);
        let envTest = process.env.REDIS_URL;
        console.log("envTest: ", envTest);
        res.send({ data: "api up" }); // send the lyrics
    } catch (err) {
        res.send(err); // send the thrown error
    }
};
