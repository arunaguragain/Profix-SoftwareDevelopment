import express from 'express'
import bodyParser from 'body-parser'
import { db } from './Backend/database/index.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = process.env.PORT||5000;
app.use(bodyParser.json());

app.listen(5000, function(){
    console.log("project running in port");
    db();
})