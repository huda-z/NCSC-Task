const mongoose = require("mongoose");

const UniqueObjectId = new mongoose.Schema({
_id: {
    type: String,
    default: function () {
        return new ObjectId().toString()
    }
}
})

const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {

    },
    dob: {
        type: Date,
        required: true,
        default: Date.now,
    },
    country: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

const users = new mongoose.model("users",userSchema);
module.exports = users;