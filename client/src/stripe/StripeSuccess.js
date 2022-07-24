import React, {useState, useEffect} from "react";
import { getHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import { stripeSuccess } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = (props) => {
    const {user} = useSelector(state => state);
    const hotelId = props.match.params.hotelId;
    const [hotel, setHotel] = useState();
    const [order, setOrder] = useState();

    const loadHotel = async (hotelId) => {
        const res = await getHotel(hotelId);
        if(res.data && res.data.hotel) setHotel(res.data.hotel);
        const order = await (await stripeSuccess(user.token, hotelId)).data;
        setOrder(order);
    } 

    useEffect(() => {
        loadHotel(hotelId);
    }, [hotelId]);

    if(!hotel) {
        return (
            <div className='container'>
                <div className='col'>
                    <h2 className='text-center p-5'>404 Not Found Your Booking.</h2>
                </div>
            </div>
        )
    }

    return (
        <div className='container-fluid tex-center'>
            
            <div className='d-flex justify-content-center p-5'>
                <h2 className='text-center p-5'>Payment Success</h2>
                {/* <pre>{JSON.stringify(order)}</pre> */}
                <div className="d-flex justify-content-center">
                    <button onClick={() => {
                        props.history.push('/dashboard');
                    }}
                    className="btn btn-primary mb-3" 
                    >
                        Back to home
                    </button>
                </div>
                {/* <LoadingOutlined className="display-1 text-danger p-5"/> */}
            </div>
        </div>
    )
}

export default StripeSuccess;