import mongoose from 'mongoose';

var config = require('./config/config');

var configdata = config.get(process.env.Node_env).db;
import 'dotenv/config'
var mongoUrl = `mongodb://127.0.0.1:${configdata.port}/${configdata.databaseName}`;

console.log(mongoUrl);

var options= {
    user:configdata.userName,
    pass:configdata.password
}

console.log(options,"options")
export const mongoconnection = async() => {
    try{
      console.log("pp")
        await mongoose.connect(mongoUrl,options);
        console.log("Connect to DB");
    }
    catch(e){
        console.log(e,"pppp");
        throw e
}
}