import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { allHotels } from "../actions/hotel";
import SmallCard from '../components/cards/SmallCard';
import { deleteHotel } from '../actions/hotel';
import { toast, ToastContainer } from 'react-toastify';
import { diffDays } from '../actions/hotel';

const Home = () => {
    const state = useSelector((state) => {
        return state;
    });

    const [hotels, setHotels] = useState([]);

    const loadHotels = async () => {
        const res = await allHotels();
        setHotels(res.data);
        console.log(hotels);
    }

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

    useEffect(() => {
        loadHotels(); 
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid h1 p-5 text-center">
                <h1>Home Page</h1>
            </div>
            <div className='container-fluid'>
                <ToastContainer />
                {state ? hotels.length >0 && hotels.map(hotel => {
                    return(
                        diffDays(hotel.from, hotel.to) > 0 &&
                        <SmallCard key={hotel._id} h={hotel} owner={hotel.postedBy._id === state.user.user._id ? true : false} showViewMoreButton={true}
                            handleDeleteHotel={() => {
                                hotel.postedBy._id === state.user.user._id && handleDelete(state.user.token, hotel._id);
                            }}
                        >

                        </SmallCard>
                    )
                }) : 
                    hotels.length >0 && hotels.map(hotel => {
                    return(
                        diffDays(hotel.from, hotel.to) > 0 &&
                        <SmallCard key={hotel._id} h={hotel} owner={false} showViewMoreButton={true}
                            handleDeleteHotel={() => {
                            }}
                        >

                        </SmallCard>
                    )
                })
                }
            </div>
        </React.Fragment>
        
    )
}

export default Home;