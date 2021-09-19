const diskData = require("./classifyDisks");
const diskUsage = require("./diskUsage");
const logger = require("./logger");
const fs = require("fs");

deleteFile = async (path) => {
  try {
    logger.debug(`Trying to delete ${path}`);
    if (!(await fs.existsSync(path))) {
      return true;
    }
    try {
      await fs.unlinkSync(path);
      return !(await fs.existsSync(path));
    } catch (e) {
      logger.error(e);
      return false;
    }
  } catch (e) {
    logger.error(e);
  }
};

cleanDisk = async (disks, ignoreList) => {
  logger.info("running cleaning function...");
  try {
    for (let disk of disks.pathObjects) {
      for (let path of disk.files) {
        let diskIsFull = await checkDiskUsage(
          path.filePath,
          disk.maxPercentage
        );
        if (diskIsFull) {
          let attemptCount = ignoreList.GetDeleteAttemptCount(path.filePath);
          if (attemptCount < 5) {
            try {
              let fileDeleted = await deleteFile(path.filePath);
              if (fileDeleted) {
                ignoreList.Deleted(path.filePath);
                logger.debug(`"${path.filePath}" deleted`);
              } else {
                ignoreList.AddDeleteAttempt(path.filePath);
                logger.debug(
                  `will try again to delete, attemp no : ${attemptCount + 1}`
                );
              }
            } catch (e) {
              //add filePath to ignoreList
              ignoreList.AddDeleteAttempt(path.filePath);
              logger.error(`"${path.filePath}" failed `, e);
            }
          }
        } else {
          break;
        }
      }
    }
    let ignoredFilesNumber = Object.keys(ignoreList.list).length;
    if (ignoredFilesNumber > 20) {
      logger.warn(
        `Watch out! your ignore list is getting huge, the number of ignored items is : ${ignoredFilesNumber}`
      );
    }
  } catch (e) {
    logger.error(e);
  }
};

module.exports = cleanDisk;
