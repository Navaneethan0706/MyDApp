const Web3 = require('web3');
const contract = require('@truffle/contract');
const DataLoggerArtifact = require('./build/contracts/DataLogger.json');

// Initialize web3
const web3 = new Web3('http://localhost:8545'); // Ensure this matches your provider
const DataLogger = contract(DataLoggerArtifact);
DataLogger.setProvider(web3.currentProvider);

// Function to interact with the DataLogger contract
async function interactWithContract() {
  try {
    const instance = await DataLogger.deployed();
    await instance.logData('Some data');  // Log some data
    const data = await instance.getData();  // Fetch the logged data
    console.log("Logged Data from Contract:", data);
    document.getElementById('contract-data').textContent = data;
  } catch (error) {
    console.error("Error interacting with contract:", error);
  }
}

// Function to simulate DDoS protection
function checkDDoSProtection() {
  const protectionStatus = document.getElementById('protection-status');
  protectionStatus.textContent = "Protection Active";  // Simulate active protection
}

// Function to load CSV data from Google Drive
async function loadCSVData() {
  try {
    const response = await fetch('https://drive.google.com/uc?export=download&id=1A2B3C4D5E6F7G8H9I'); // Replace with your Google Drive file ID
    const data = await response.text();
    document.getElementById('csv-data').textContent = data;
  } catch (error) {
    console.error("Error loading CSV data:", error);
  }
}

// Combined interact function to handle everything
async function interact() {
  checkDDoSProtection();  // Check DDoS protection
  loadCSVData();  // Load CSV data
  interactWithContract();  // Interact with the smart contract
}

interact();  // Run all interactions
