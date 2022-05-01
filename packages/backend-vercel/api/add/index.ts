import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import util from "util";
import Redis from "ioredis";

// const fsWriteAsync = util.promisify(fs.writeFile);

// import txData from "../../txData.json";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { tx_id } = request.query;
    let transcactions = request.body?.transcactions;

    let client = new Redis(process.env.REDIS_URL);

    let getTxData = await client.get("txData");

    let txData = getTxData === null ? [] : JSON.parse(getTxData);
    console.log("txData: ", txData);
    if (transcactions !== undefined && transcactions.length > 0) {
        let oldTranscactions = txData;
        // clear the transactions it array increases till 1000 records
        // if (oldTranscactions.length >= 2) {
        //     try {
        //         // await fsWriteAsync("txData.json", JSON.stringify([]), "utf-8");
        //         oldTranscactions = [];
        //         transcactions = [transcactions[transcactions.length - 1]];
        //     } catch (error) {}
        // }

        try {
            let updatedTranscactions = [
                ...oldTranscactions.filter((data) => data["proposalId"] !== transcactions[0]["proposalId"]),
                // ...oldTranscactions,
                ...transcactions,
            ];
            let json = JSON.stringify(updatedTranscactions, null, 4);
            let res = await client.set("txData", json);
            console.log("res: ", res);
            // await fsWriteAsync("txData.json", json, "utf-8");
        } catch (error) {
            console.log("error: ", error);
        }
    }

    response.send({ msg: "updated" });
}
