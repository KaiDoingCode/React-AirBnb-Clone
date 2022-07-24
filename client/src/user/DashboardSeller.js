import React, { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {HomeOutlined} from '@ant-design/icons';
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import { toast, ToastContainer } from "react-toastify";
import ConnectNav from "../components/ConnectNav";
import axios from "axios";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
    const {user} = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([])

    const loadSellerHotels = async (token) => {
        const res = await sellerHotels(token);
        setHotels(res.data);
    }

    useEffect(() => {
        loadSellerHotels(user.token)
    }, [user.token]);

    const handleDelete = async (token, id) => {
        if(!window.confirm('Are you sure?')) {
            return;
        }
        try {
            const res = await deleteHotel(token, id);
            toast.success('Hotel deleted');
            window.location.reload();
        }
        catch(e){
            toast.error(`Error: ${e.response.data.err}`);
        }
    }

    const handleClick = async () => {
        setLoading(true);
        try{
            // let res = await createConnectAccount(user.token);
            let res = await axios.post(`${process.env.REACT_APP_API}/create-connect-account`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            console.log(res.data);
            window.location.href = res.data.link;
        } catch(e){
            console.log(e);
            toast.error('Stripe connect error');
            setLoading(false);
        }
    }

    const connected = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotel</h2>
                        
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotels/new" className="btn btn-primary">+ Add New</Link>
                    </div>
                </div>
                <div className="row">
                    <div>
                        {hotels.map(hotel => {
                            return (
                                <SmallCard key={hotel._id} h={hotel} owner={hotel.postedBy._id === user.user._id ? true : false} showViewMoreButton={false}
                                    handleDeleteHotel={() => {
                                        hotel.postedBy._id === user.user._id && handleDelete(user.token, hotel._id);
                                    }
                                }
                                >

                                </SmallCard>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const notConnected = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="p-5 pointer">
                            <h4>Setup payouts to post hotel rooms</h4>
                        </div>
                        <HomeOutlined className="h1" />
                    </div>
                    <h4>Setup payouts to post hotel rooms</h4>
                    <p className="lead">MERN partners with stripe to transfer earnings to your bank account</p>
                    <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                        {loading ? 'Processing' : 'Setup Payouts'}
                    </button>
                    <p className="text-muted"><small>You'll be redirected to Stripe to complete the onboarding process</small></p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            
            <div className="container-fluid p-4">
                <DashboardNav />
            </div>
            <ToastContainer/>
            {/*Due to stripe not supported in my country, so please just go ahead and add hotel rooms as normally*/}

            {user && user.user && user.user.stripe_seller && user.user.stripe_seller.charges_enabled ? 
            connected() : notConnected()}
            
        </>
    )
}

export default DashboardSeller;