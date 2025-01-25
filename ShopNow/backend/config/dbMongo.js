const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
  
function connectToDb() {
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('connected to db'))
    } catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
// connectToDb();
module.exports = connectToDb;
  