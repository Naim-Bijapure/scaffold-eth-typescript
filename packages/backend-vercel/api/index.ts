export default async (req, res) => {
    // this function will be launched when the API is called.
    try {
        res.send({ data: "api up" }); // send the lyrics
    } catch (err) {
        res.send(err); // send the thrown error
    }
};
