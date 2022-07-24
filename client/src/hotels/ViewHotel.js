import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getHotel } from '../actions/hotel';
import { diffDays } from '../actions/hotel';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSessionId } from '../actions/stripe';
import { toast, ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { isAlreadyBooked } from '../actions/hotel';

const ViewHotel = (props) => {
    const hotelId = props.match.params.hotelId;
    const state = useSelector(state => state);
    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    const loadHotel = async (id) => {
        let res = await getHotel(id);
        setHotel(res.data.hotel);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${hotelId}`);
    }

    const isHotelBooked = async (token, hotelId) => {
        let res = await isAlreadyBooked(token, hotelId);
        setIsBooked(res.data.isBooked);
    }
    useEffect(() => {
        loadHotel(hotelId);

        if(state.user && state.user.token) {
            isHotelBooked(state.user.token, hotelId);
        }
    }, [hotelId, state.user]);

    if(!hotel){
        return (
            <div>404 not found</div>
        )
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!state){
            props.history.push('/login');
        }

        let res = await getSessionId(state.user.token, props.match.params.hotelId);
        // toast.success(`${res.data.sessionId.id}`);
        toast.success('Redirecting you to checking out page.');
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({sessionId: res.data.sessionId.id}).then(
            (res) => {
                setLoading(false);
            }
        );
    }

    return (
        <>
            <div className='container-fluid bg-secondary p-5 text-center'>
                <h1>{hotel.title}</h1>
            </div>
            <div className='container-fluid'>
                <ToastContainer />
                <div className='row'>
                    <div className='col-md-6'>
                        {image ? <img src={image} alt="preview-image" className="img img-fluid m-2" /> : <div>No preview image yet</div>}
                    </div>
                    <div className='col-md-6'>
                        <b>{hotel.content}</b>
                        <p className='alert alert-info mt-3'>${hotel.price}</p>
                        <p className="alert alert-info">
                            {hotel.location}
                        </p>
                        <p className="card-text">
                            For {diffDays(hotel.from, hotel.to) > 0 ? diffDays(hotel.from, hotel.to) > 1 ? `${diffDays(hotel.from, hotel.to) } days` : `${diffDays(hotel.from, hotel.to) } day` : `This hotel booking has ended.`} 
                        </p>
                        <p className="card-text">
                            {hotel.bed > 1 ? `${hotel.bed} beds` : `${hotel.bed} bed`}
                        </p>
                        <p className="card-text">
                            Available from {new Date(hotel.from).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                            Because this is a demo payment, you can use fake card information to check out. For Example: 4242 4242 4242 4242
                            <br/>
                            <b>Please do not use your actual creadit card informantion.</b>
                        </p>
                        {/* {hotel.postedBy._id === state.user.user._id &&
                        <div className="d-flex justify-content-between h4">
                            <Link to={`/hotel/edit/${hotel._id}`}>
                                <EditOutlined className="text-warning" />
                            </Link>
                            
                        </div>} */}
{/* 
                        <p>Posted by {hotel.postedBy.name} </p> */}

                        {diffDays(hotel.from, hotel.to) > 0 && state && state.user ? !isBooked ?
                        <div>
                            <button className="btn btn-outline-primary m-2" onClick={handleClick}
                                disabled={loading}
                            >
                            {loading ? 'Loading... ': 'Book now'}
                            </button>
                        </div> 
                        : 
                        <div>
                            This hotel is already booked by you. <br></br>
                            <button className="btn btn-outline-primary m-2" onClick={() => {
                                props.history.push('/dashboard');
                            }}>
                                See your bookings
                            </button>
                        </div>
                        : 
                        <div>
                            <button className="btn btn-outline-primary m-2" onClick={() => {
                                props.history.push('/login')
                            }}>Login to book
                            </button>
                        </div>
                        }
                    </div>
                </div>
                
                    
            </div>
        </>

    )
}

export default ViewHotel;