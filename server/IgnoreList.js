class IgnoreList {
  constructor() {
    this.list = {};
  }

  GetDeleteAttemptCount(path) {
    if (path in this.list) return this.list[path];
    else return 0;
  }

  AddDeleteAttempt(path) {
    if (path in this.list) {
      let attemptCount = this.list[path];
      attemptCount++;
      this.list[path] = attemptCount;
    } else this.list[path] = 1;
  }

  Deleted(path) {
    if (path in this.list) {
      delete this.list[path];
    }
  }
}
module.exports = IgnoreList;
