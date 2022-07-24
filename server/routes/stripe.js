import express from "express";
import { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId, stripeSuccess } from "../controllers/stripe";
import { requireSignIn } from "../middlewares";


const router = express.Router();

router.post('/create-connect-account', requireSignIn, createConnectAccount);
router.post('/get-account-status', requireSignIn, getAccountStatus);
router.post('/get-account-balance', requireSignIn, getAccountBalance);
router.post('/payout-setting', requireSignIn, payoutSetting);
router.post('/stripe-session-id/:hotelId', requireSignIn, stripeSessionId);
router.post('/stripe-success', requireSignIn, stripeSuccess);

module.exports = router;
