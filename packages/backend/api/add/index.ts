import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import util from "util";

const fsWriteAsync = util.promisify(fs.writeFile);

import txData from "../../txData.json";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { tx_id } = request.query;
    let transcactions = request.body?.transcactions;

    if (transcactions !== undefined && transcactions.length > 0) {
        let oldTranscactions = txData;
        // clear the transactions it array increases till 1000 records
        if (oldTranscactions.length >= 2) {
            try {
                await fsWriteAsync("txData.json", JSON.stringify([]), "utf-8");
                oldTranscactions = [];
                transcactions = [transcactions[transcactions.length - 1]];
            } catch (error) {}
        }

        let updatedTranscactions = [
            ...oldTranscactions.filter((data) => data["proposalId"] !== transcactions[0]["proposalId"]),
            ...transcactions,
        ];

        let json = JSON.stringify(updatedTranscactions, null, 4);
        try {
            await fsWriteAsync("txData.json", json, "utf-8");
        } catch (error) {}

        // fs.writeFile("txData.json", json, (err) => {
        //     if (err) {
        //         return;
        //     }
        // });
    }

    response.send({ msg: "updated" });
}
