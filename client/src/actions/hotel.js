import axios from 'axios';

export const createHotel = async (token, data) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const allHotels = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/hotels`)
}

export const diffDays = (from, to) => {
    const day = 24*60*60*1000;

    const start = new Date(from);
    const end = new Date(to);

    const diff = Math.round(Math.abs((start - end)/day));

    return diff;
}

export const sellerHotels = async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteHotel = async (token, hotelId) => {
    return await axios.post(`${process.env.REACT_APP_API}/delete-hotels/${hotelId}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getHotel = async (hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`)
}

export const updateHotel = async (token, data, hotelId) => {
    return await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const userHotelBooking = async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/user-hotel-booking`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const isAlreadyBooked = async (token, hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/is-hotel-booked/${hotelId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}