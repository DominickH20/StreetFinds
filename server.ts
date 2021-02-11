import express =  require('express');
import cors = require('cors');
import dotenv = require('dotenv');
import path = require('path');
import mongoose = require('mongoose');

import usersRouter from './routes/users';
import findsRouter from './routes/finds';

// configuring app
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//add middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/finds", findsRouter);

//allow API key to be accessible - allows for interchangeable dev/prod
app.get('/maps/key', function (req, res) {
  res.send(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
});


//connect to DB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri!, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


//add catchall to serve static web files too
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});