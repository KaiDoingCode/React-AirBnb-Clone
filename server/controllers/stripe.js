import User from "../models/user";
import Order from '../models/order';
import Stripe from "stripe";
import queryString from 'query-string';
import Hotel from "../models/hotel";
const ck = require('ckey');

const stripe = Stripe(ck.STRIPE_SECRET);

export const createConnectAccount = async (req, res, next) => {
    // console.log(req.auth);
    const user = await User.findById(req.auth._id);
    if(!user){
        return res.json({err: 'Not found user with provided information'});
    }
    if(!user.stripe_account_id){
        const account = await stripe.account.create({
            type: 'express',
        });
        
        user.stripe_account_id = account.id;
        user.save();
    } 
    
    
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: ck.STRIPE_DIRECT_URL,
        return_url: ck.STRIPE_DIRECT_URL,
        type: "account_onboarding"
    });

    let signUpLink = Object.assign({
        "stripe_user[email]": user.email || undefined,
        accountLink
    })
    
    let link = `${signUpLink.accountLink.url}?${queryString.stringify(signUpLink.accountLink)}`;
    
    return res.status(200).json({link});
    
}

export const updateDelayDays = async (accountId) => {
    try{
        const account = await stripe.accounts.update(accountId, {
            settings: {
                payouts: {
                    schedule: {
                        delay_days: 7
                    }
                }
            }
        })
        return account;
    } catch(e){
        console.log(e);
    }
    
    
}

export const getAccountStatus = async (req, res, next) => {
    try{
        const user = await User.findById(req.auth._id);
        const account = await stripe.accounts.retrieve(user.stripe_account_id);
        const updatedAccount = await updateDelayDays(account.id);
        const updatedUser = await User.findByIdAndUpdate(user._id,{
            stripe_seller: updatedAccount
        }, {new: true}).select('-password');
        return res.json({user: updatedUser});
    } catch(e){
        console.log(e);
    }
    
}

export const getAccountBalance = async (req, res, next) => {
    try{
        const user = await User.findById(req.auth._id);
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        });
        return res.json({balance});

    } catch(e){
        console.log(e);
    }
}

export const payoutSetting = async (req, res, next) => {
    try{
        const user = await User.findById(req.auth._id);
        const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id, {
            redirect_url: ck.STRIPE_SETTING_REDIRECT_URL
        });
        return res.json({loginLink});
    } catch(e){
        console.log(e);
    }
}

export const stripeSessionId = async (req, res, next) => {
    try{
        const hotelId = req.body.hotelId;
        let hotel = await Hotel.findById(hotelId).populate('postedBy','_id name stripe_seller').select('-image.data');
        const fee = hotel.price*20/100;
        const sessionId = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: `${hotel.title}`,
                amount: hotel.price*100,
                currency: 'usd',
                quantity: 1
            }],
            payment_intent_data: {
                application_fee_amount: fee*100,
                transfer_data: {
                    destination: hotel.postedBy.stripe_seller.id,
                }
            },
            success_url: `${ck.STRIPE_SUCCESS_URL}/${hotel._id}`,
            cancel_url: ck.STRIPE_CANCEL_URL
        });
        
        // console.log(sessionId);

        await User.findByIdAndUpdate(req.auth._id, {stripeSession: sessionId});
        return res.json({sessionId});
    } catch(e) {
        console.log(e);
    }
}

export const stripeSuccess = async (req, res, next) => {
    try{
        const hotelId = req.body.hotelId;

        const user = await User.findById(req.auth._id);

        if(!user.stripeSession) return res.status(404).json({err: 'Not found.'});

        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);

        if(session.payment_status === 'paid'){
            const orderExist = await Order.findOne({'session.id': session.id});
            if(orderExist){
                return res.json({success: true});
            } else {
                let newOrder = await new Order({
                    hotel: hotelId,
                    session: session,
                    orderedBy: user._id
                }).save();

                await User.findByIdAndUpdate(user._id, {
                    $set: {
                        stripeSession: {}
                    }
                })

                return res.json({success: true});
            }
        }
    } catch(e) {
        console.log(e);
    }
}