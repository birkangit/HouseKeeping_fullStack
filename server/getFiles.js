const dirTree = require("directory-tree");
const logger = require("./logger");

getFiles = async (path) => {
  let filesList = [];
  await dirTree(
    path,
    {
      attributes: ["mtime"],
      extensions: /\.(txt|png|jpg|mp4|avi|db|pdf|mxf)$/,
    },
    (item) => {
      filleAttr = { filePath: item.path, creationDate: item.mtime };
      filesList.push(filleAttr);
    }
  );
  logger.info(`files are collected from "${item.path}"`);
  return filesList;
};

module.exports = getFiles;
