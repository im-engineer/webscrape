import express from 'express'
import bodyParser from 'body-parser'
const app = express();
import cors from 'cors'
import {mongoconnection} from './db';
mongoconnection();
app.use(cors({origin:"*"}));

import router from "./router/scrapeRouter";

app.use(bodyParser.urlencoded(
    {
        extended:true
    }));
app.use(bodyParser.json());

app.use("/api", router);
app.use("/upload", express.static("uploads"));

export default app;