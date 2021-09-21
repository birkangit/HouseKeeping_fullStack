const express = require("express");
const cors = require("cors");
const app = express();
const config = [];
// const PORT = process.env.PORT || 8080;
//********** */

//use cors to allow cross origin resource sharing
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.post("/send", async (req, res) => {
  let data = await req.body;
  if (data.path != "" && data.percentage != "") {
    config.push(data);
    console.log(config);
  } else null;
  res.send(req.body);
});

//start your server on port 3001

//***************** */

const diskCheck = require("./diskCheck");
const classifyDisks = require("./classifyDisks");
const DiskClean = require("./diskClean");
const logger = require("./logger");
const ignoreListClass = require("./IgnoreList");
const fs = require("fs");
//let config = require("./config");

// fs.watch("./server/config.js", (eventType, filename) => {
//   callConfig();
//   if (config.length != 0) {
//     DeleteLoop();
//   } else console.log("config is empty");
// });

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

async function DeleteLoop() {
  await collectPaths(ignoreList);
  setTimeout(DeleteLoop, 2000);
}
DeleteLoop();

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
