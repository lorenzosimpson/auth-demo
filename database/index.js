//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()

//27017 is the default mongoDB port
const uri = process.env.MONGODB_URI
const config = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true 
}

mongoose.connect(uri, config).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
        }
  );


module.exports = mongoose.connection