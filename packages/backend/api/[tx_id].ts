import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import txData from "../txData.json";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    const { tx_id } = request.query;
    let transcactions = txData.filter((data) => data["contractAddress"] === tx_id);
    // console.log("transcactions:cool ", transcactions);
    response.send({ transcactions });
}
