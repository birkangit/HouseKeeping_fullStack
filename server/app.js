const express = require("express");
const app = express();
// const PORT = process.env.PORT || 8080;

const diskCheck = require("./diskCheck");
const classifyDisks = require("./classifyDisks");
const DiskClean = require("./diskClean");
const logger = require("./logger");
const ignoreListClass = require("./IgnoreList");
const fs = require("fs");

fs.watch("./server/config.js", (eventType, filename) => {
  const config = require("./config");
  if (config[0].path) {
    DeleteLoop();
  } else console.log("config is empty");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let ignoreList = new ignoreListClass();

collectPaths = async (ignoreList) => {
  let diskInfos = [];
  logger.info("Runnig...");
  try {
    for (item of config) {
      diskInfos.push(await diskCheck(item));
    }
    let diskObjects = await classifyDisks(diskInfos, item.maxPercentage);
    await cleanDisk(diskObjects, ignoreList);
  } catch (e) {
    logger.error(e);
  }
};

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

async function DeleteLoop() {
  await collectPaths(ignoreList);
  setTimeout(DeleteLoop, 2000);
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
