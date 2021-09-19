const PathObject = require("./PathObject");
const logger = require("./logger");

class DiskFiles {
  constructor() {
    this.pathObjects = [];
  }

  PushFile(pathObject) {
    let tPath = this.pathObjects.filter((x) => x.diskId == pathObject.diskId);
    if (tPath.length > 0) {
      const currentPath = tPath[0];
      if (pathObject.maxPercentage < currentPath.maxPercentage)
        currentPath.maxPercentage = pathObject.maxPercentage;
      for (let item of pathObject.files) {
        let contains = false;
        for (let object of currentPath.files) {
          if (object.filePath === item.filePath) {
            contains = true;
            break;
          }
        }
        if (!contains) currentPath.files.push(item);
      }
    } else {
      this.pathObjects.push(pathObject);
    }
  }
}

module.exports = DiskFiles;
