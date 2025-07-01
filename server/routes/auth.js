const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

router.post('/register',async (req, res) => {
    const {email, password} = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,10);
        const user = new User({
            email,
            password: hashedPass,
        });
        await user.save();
        res.status(201).json({message: 'User registerd successfully'});
    }
    catch(err){
        res.status(400).json({error: 'Error registering user', err: err.message});
    }
});

router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
         return res.status(400).json({error: 'User not found'});
        }     
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id},'secret_key', {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token});
    }
    catch(err){
        res.status(400).json({error: 'Error logging In'});
    }
})
module.exports = router;