import Hotel from "../models/hotel";
import Order from "../models/order";
import User from "../models/user";
import fs from 'fs';

export const createHotel = async (req, res, next) => {
    try {
        let fields = req.fields;
        let files = req.files;
        let hotel = new Hotel(fields);
        hotel.postedBy = req.auth._id;

        //handle image
        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        await hotel.save((err, result) => {
            if(err){
                console.log(err);
                return res.status(400).json({err});
            }

            return res.json(result);
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({err: 'Add new hotel error.'});
    }
}

export const hotels = async (req, res, next) => {
    try{
        let all = await Hotel.find({to: {$gte: new Date() }}).limit(24).select('-image.data').populate('postedBy', '_id name');
        console.log(all);
        return res.json(all);
    } catch(e) {
        console.log(e);
        return res.status(400).json({err: 'Add new hotel error.'});
    }
}

export const image = async (req, res, next) => {
    try {
        let hotelId = req.params.hotelId
        let hotel = await Hotel.findById(hotelId).exec();
        if(hotel && hotel.image && hotel.image.data){
            res.set('Content-Type', hotel.image.contentType);

            return res.send(hotel.image.data);
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({err: 'Add new hotel error.'});
    }
}

export const sellerHotels = async (req, res, next) => {
    let all = await Hotel.find({postedBy: req.auth._id}).select('-image.data').populate('postedBy', '_id name');
    console.log(all);
    return res.json(all);
}

export const deleteHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const remove = await Hotel.findByIdAndDelete(hotelId);
    return res.json({message: 'Success'});
}

export const getHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try{
        let hotel = await Hotel.findById(hotelId).populate('postedBy','_id name').select('-image.data');
        return res.json({hotel: hotel});
    } catch(e){
        console.log(e);
    }
}
    
export const updateHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
       
        let fields = req.fields;
        let files = req.files;
        let data = {...fields};
        
        
        if(files.image){
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;
            data.image = image;
        }

        let updatedHotel = await Hotel.findByIdAndUpdate(hotelId, data, {
            new: true
        }).select('-image.data');
        return res.json({updatedHotel});

    } catch(e){
        return res.status(400).json({err: e});
    }
    
}

export const userHotelBooking = async (req, res, next) => {
    try {
        const all = await Order.find({orderedBy: req.auth._id}).select('session').populate('hotel','-image.data').populate('orderedBy','_id name');
        return res.json(all);
    } catch(e){
        return res.status(400).json({err: e});
    }
}

export const isHotelBooked = async (req, res, next) => {
    try{
        const userId = req.auth._id;
        const hotelId = req.params.hotelId;
        const hotels = await Order.find({orderedBy: userId});
        let usersBooking = [];
        for(let i=0; i<hotels.length; i++){
            usersBooking.push(hotels[i].hotel.toString());
        }
        
        // for(let i=0; i<usersBooking.length; i++){
        //     if(usersBooking[i] === hotelId) {
        //         return res.json({isBooked: true}) 
        //     }
        // }
        
        // return res.json({isBooked: false});

        return res.json({isBooked: usersBooking.includes(hotelId)});
    } catch(e){
        return res.status(400).json({err: e});
    }
}