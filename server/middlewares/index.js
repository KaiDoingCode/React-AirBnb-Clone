import { expressjwt } from 'express-jwt';
const ck = require('ckey');
import Hotel from '../models/hotel';

export const requireSignIn = expressjwt({
    secret: ck.JWT_SECRET,
    algorithms: ['HS256']
});

export const ownerHotel = async (req, res, next) => {
    
    let hotel = await Hotel.findById(req.params.hotelId).select('-image.data').populate('postedBy', '_id name');
    if(hotel.postedBy._id.toString() === req.auth._id.toString()) return next();
    else return res.status(403).json({err: 'The user do not have authority to edit this hotel.'})
}