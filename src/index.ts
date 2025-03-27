
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const {dbConnect}=require('./config/db');

dbConnect();
app.use(cors());
app.use(express.json());





app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});