//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()

//your local database url
//27017 is the default mongoDB port
const uri = `mongodb+srv://lorenzo:${process.env.MONGODB_PASSWORD}@authdemo.sq1b9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(uri).then(
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