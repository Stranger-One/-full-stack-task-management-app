const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/User");
const User = require("../models/User");

const router = express.Router();

router.post("/register",async(req,res) => {
    const {username,password} = req.body;

    try{
        const user = new User({username,password});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(err) {
        res.status(500).json({message:"Server Error ",error: err.message});
    }
});


router.post("/login",async(req,res) => {
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({message :"Invalid credentials"});
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"invalid credentials"});

        const token = jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({token});
    }catch(err){
        res.status(500).json({message:"server error",error:err.message});

    }
})

module.exports = router;

