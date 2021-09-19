const PathObject = require("./PathObject");
const DiskFiles = require("./diskFiles");
const logger = require("./logger");

classifyDisks = async (diskData, maxPercentage) => {
  let diskFiles = new DiskFiles();
  for await (let disk of diskData) {
    diskFiles.PushFile(disk);
  }
  for (item of diskFiles.pathObjects) {
    item.files.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
    if (item.files.length != 0) {
      logger.info(`files list from "${item.pathRoot}" is sorted succesfully`);
    } else {
      checkSpace = checkDiskUsage(item.pathRoot, maxPercentage);
      if (checkSpace) {
        logger.warn(
          `This disk "${item.pathRoot}" has no files to monitor and it should be cleaned ASAP`
        );
      } else {
        logger.warn(`This disk "${item.pathRoot}" has no files to monitor`);
      }
    }
  }
  return diskFiles;
};
//console.log(JSON.stringify(diskFiles, null, 2));

module.exports = classifyDisks;
