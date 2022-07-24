import express from 'express';
// import router from './routes/auth';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
const ck = require('ckey');
require('dotenv').config();

const app = express();

//db connection
mongoose
.connect(ck.DATABASE, {})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB Error => ", err));

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

fs.readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`));
})
// app.use('/api', router);



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})