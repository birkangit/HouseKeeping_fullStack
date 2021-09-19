const DiskId = require("./diskClean");
const diskusage = require("diskusage");
const path = require("path");
const logger = require("./logger");

checkDiskUsage = async (path_, diskMaxPer) => {
  try {
    let diskIsFull = false;
    currentPath = path.dirname(path_);
    pathRoot = path.parse(currentPath).root;
    let diskCheckResult = await diskusage.check(currentPath);
    let calculateUsage = Math.ceil(
      ((diskCheckResult.total - diskCheckResult.available) /
        diskCheckResult.total) *
        100
    );
    if (diskMaxPer < calculateUsage) {
      diskIsFull = true;
      logger.info(`"${pathRoot}" disk is full, continue deleting...`);
    } else {
      diskIsFull = false;
      logger.info(`"${pathRoot}" disk space is enough,stopped deleting.`);
    }
    return diskIsFull;
  } catch (e) {
    console.log(e);
  }
};

module.exports = checkDiskUsage;
