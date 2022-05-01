import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import Redis from "ioredis";

// import txData from "../txData.json";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { tx_id } = request.query;

    let client = new Redis(process.env.REDIS_URL);

    let getTxData = await client.get("txData");

    let txData = getTxData === null ? [] : JSON.parse(getTxData);

    let transcactions = txData.filter((data) => data["contractAddress"] === tx_id);
    // console.log("transcactions:cool ", transcactions);
    response.send({ transcactions });
}
