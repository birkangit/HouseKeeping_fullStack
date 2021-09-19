const fs = require("fs");
const logger = require("./logger");

verifyIgnoreList = async (ignoreList) => {
  for (path of ignoreList) {
    if (!fs.existsSync(path)) {
      itemToPop = await ignoreList.filter((item) => item === path);
      ignoreList.splice(ignoreList.indexOf(itemToPop), 1);
    } else {
      null;
    }
  }
  logger.info("Ignore List verified!");
  return ignoreList;
};

module.exports = verifyIgnoreList;
