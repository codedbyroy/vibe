const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const medicationsRouter = require('./routes/medications');
const logsRouter = require('./routes/logs');
const caregiversRouter = require('./routes/caregivers');
const { startScheduler } = require('./scheduler');

const app = express();
const port = process.env.PORT || 3000;

// standard middleware
app.use(helmet({ contentSecurityPolicy: false })); // CSP off for inline scripts in dev
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Init DB
require('./database');

// Serve frontends
app.use('/elderly', express.static(path.join(__dirname, '../frontend/elderly-ui')));
app.use('/dashboard', express.static(path.join(__dirname, '../frontend/dashboard')));

// Mount API routes
app.use('/medications', medicationsRouter);
app.use('/logs', logsRouter);
app.use('/caregiver', caregiversRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root redirect
app.get('/', (req, res) => {
  res.send(`
    <h2>Elder Care System</h2>
    <ul>
      <li><a href="/elderly">Elderly UI</a></li>
      <li><a href="/dashboard">Caregiver Dashboard</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Elder Care Backend API listening on port ${port}`);
  startScheduler();
});

module.exports = app;
