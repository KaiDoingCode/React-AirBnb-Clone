import User from "../models/user";
import jwt from "jsonwebtoken";
const ck = require('ckey');

export const showMessage = (req, res, next) => {
    return res.status(200).send(`The message is: ${req.params.message}`);
};

export const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name) {
        return res.status(400).json({err: 'Name is required'});
    }
    if(!email) {
        return res.status(400).json({err: 'Email is required'});
    }
    if(!password || password.length < 6) {
        return res.status(400).json({err: 'Password is required and should be at least 6 characters in length.'});
    }
    let userExist = await User.findOne({email});
    if(userExist) return res.status(400).json({err: 'Email is already used. Please use a different email'});

    const user = new User({
        email,
        name, 
        password
    })
    try {
        await user.save();
        return res.json({name, email});
    } catch(e){
        console.log(e);
        return res.status(400).json({err: 'User creation failed.'});
    }
}

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({err: 'Not fount user with the provided email.'});
        }
        user.comparePassword(password, (err, isMatched) => {
            if(!isMatched || err) return res.status(400).json({err: 'Password is not matched.'});
            
            let token = jwt.sign({_id: user._id}, ck.JWT_SECRET,{
                expiresIn: '7d'
            })
            return res.status(200).json({token, user: {_id: user._id, name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, 
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession
            }});
           
        })
    } catch(e){
        console.log(e);
        return res.status(400).json({err: 'Login error.'});
    }
}