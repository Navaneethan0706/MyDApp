const DataLogger = artifacts.require("DataLogger");

module.exports = function (deployer) {
  deployer.deploy(DataLogger);
};
