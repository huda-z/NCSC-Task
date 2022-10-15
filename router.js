const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const multer = require('multer');

// image Upload:
 var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+"_"+file.originalname);
    },
 });

 var upload = multer({
    storage: storage,
 }).single("image");

// router.get("/", (req,res) => {
//     console.log("Connect");
// });

// Register a User:

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { photo, name, email, dob, country } = req.body;

    if (!photo || !name || !email || !dob || !country) {
         res.status(422).json("Please Fill with Data");
    }
    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
             res.status(422).json("This user already exists.");
        } else {
            const adduser = new users({
                photo, name, email, dob, country
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }
    catch (error) {
         res.status(422).json(error);
    }

});

// Get the user's data

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// Get the information of an indviual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// Update User's Data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// Delete A User
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// Get User's Age from DOB
router.post('/view/:id',(req,res) =>{
 const age = new Date(getuserdata._id)
 age.getFullYear();
});

module.exports = router;

