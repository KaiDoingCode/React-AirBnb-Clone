import express from 'express';
import { createHotel, hotels, image, sellerHotels, deleteHotel, getHotel, updateHotel, userHotelBooking, isHotelBooked } from '../controllers/hotel';
import formidable from 'express-formidable';

import { requireSignIn, ownerHotel } from '../middlewares';

const router = express.Router();

router.post('/create-hotel', requireSignIn, formidable(), createHotel);
router.get('/hotels', hotels );
router.get('/hotel/image/:hotelId', image );
router.get('/seller-hotels', requireSignIn, sellerHotels );
router.post('/delete-hotels/:hotelId', requireSignIn, ownerHotel, deleteHotel);
router.get('/hotel/:hotelId', getHotel);
router.put('/update-hotel/:hotelId', requireSignIn, ownerHotel, formidable(), updateHotel);
router.get('/user-hotel-booking', requireSignIn, userHotelBooking);
router.get('/is-hotel-booked/:hotelId', requireSignIn, isHotelBooked);



module.exports = router;