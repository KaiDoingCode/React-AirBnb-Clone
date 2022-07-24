import React from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userHotelBooking } from "../actions/hotel";
import BookingCard from "../components/cards/BookingCard";

const Dashboard = () => {

    const [booking, setBooking] = useState();
    const {user} = useSelector(state => {
        return state;
    });
    
    const loadBooking = async() => {
        const res = await userHotelBooking(user.token);
        setBooking(res.data);
    }

    useEffect(() => {
        loadBooking();
    }, [])

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashboardNav />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                        
                    </div>
                    <div className="col-md-2">
                        <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
                <div className="row">
                    {booking && booking.map((book, i) => {
                        return (
                            <BookingCard key={book._id} h={book.hotel} session={book.session} orderedBy={book.orderedBy}>

                            </BookingCard>
                        )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;