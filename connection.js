const mongoose = require("mongoose");

const DB = "mongodb+srv://huda_21:huda123@cluster0.5kdml2c.mongodb.net/Project-NSC?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Connection Started")).catch((error)=>console.log(error.message));

