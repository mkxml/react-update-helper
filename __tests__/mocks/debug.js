module.exports = function debug() {
  return function log(string) {
    window.console.log(string);
  };
};
