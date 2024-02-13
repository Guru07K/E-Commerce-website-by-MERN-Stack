const mongoose = require('mongoose');


const connectDatabase =()=>{    
    mongoose.connect(process.env.DB_ATLAS_URL)
           .then( (con)=>{
               console.log(`Mongodb is  connected to host ${con.connection.host}`);
           })
}

module.exports = connectDatabase;