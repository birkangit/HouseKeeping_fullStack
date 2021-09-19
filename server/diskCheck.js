const disk = require("diskusage");
const fs = require("fs");
const getfiles = require("./getFiles");
const PathObject = require("./PathObject");
const logger = require("./logger");
const pathModule = require("path");

diskCheck = async (path) => {
  try {
    configPath = pathModule.dirname(path.path);
    pathRoot = pathModule.parse(configPath).root;
    let diskCheckResult = await disk.check(path.path);
    let stats = fs.statSync(path.path);
    let diskInfo = new PathObject();
    diskInfo.diskId = stats.dev;
    diskInfo.pathRoot = pathRoot;
    diskInfo.usagePercentage = Math.ceil(
      ((diskCheckResult.total - diskCheckResult.available) /
        diskCheckResult.total) *
        100
    );
    diskInfo.maxPercentage = path.maxPercentage;
    let files = await getFiles(path.path);
    diskInfo.files.push(...files);
    return diskInfo;
  } catch (e) {
    console.log(e);
  }
};

module.exports = diskCheck;
