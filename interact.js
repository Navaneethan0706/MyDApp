const Web3 = require('web3');
const contract = require('@truffle/contract');
const DataLoggerArtifact = require('./build/contracts/DataLogger.json');

const web3 = new Web3('http://localhost:8545'); // Ensure this matches your provider

const DataLogger = contract(DataLoggerArtifact);
DataLogger.setProvider(web3.currentProvider);

async function interact() {
  try {
    const instance = await DataLogger.deployed();
    await instance.logData('Some data');
    const data = await instance.getData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

interact();
