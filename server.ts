import express =  require('express');
import cors = require('cors');
import dotenv = require('dotenv');
import path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

// app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});