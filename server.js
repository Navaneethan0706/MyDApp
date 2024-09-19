const express = require('express');
const rateLimit = require('express-rate-limit');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
app.use(express.json());

// Rate limiter to protect from DDoS attacks
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Limit each IP to 10 requests per minute
});

app.use(limiter);

// Google Drive Integration
const drive = google.drive({ version: 'v3' });
const auth = new google.auth.GoogleAuth({
  keyFile: 'path_to_your_google_api_credentials.json', // Set up your Google credentials
  scopes: ['https://www.googleapis.com/auth/drive'],
});

// Download the CSV from Google Drive
async function downloadCSV() {
  const driveId = 'https://drive.google.com/file/d/1ABCDxyz123/view';
  const dest = fs.createWriteStream('./csv/output.csv');
  await drive.files.get(
    { fileId: driveId, alt: 'media' },
    { responseType: 'stream' },
    (err, res) => {
      res.data.on('end', () => {
        console.log('CSV downloaded successfully');
      }).pipe(dest);
    }
  );
}

// Endpoint to get the CSV file
app.get('/getcsv', async (req, res) => {
  await downloadCSV();
  res.sendFile(__dirname + '/csv/output.csv');
});

app.listen(3000, () => console.log('Server running on port 3000'));
