import React, {useState, useEffect} from 'react';
import { getHotel, updateHotel } from '../actions/hotel';
import { toast, ToastContainer } from 'react-toastify';
import {DatePicker, Select} from 'antd';
import moment from "moment";
import { useSelector } from "react-redux";

const {Option} = Select;

const EditHotel = (props) => {
    const {user} = useSelector((state) => {
        return state;
    });

    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: ''
    });
    const [preview, setPreview] = useState();
    const [newImage, setNewImage] = useState(false);
    const {title, content, image, price, from, to, bed} = values;
    const [location, setLocation] = useState('');
    const [creator, setCreator] = useState('');

    const loadSellerHotels = async (hotelId) => {
        let res = await getHotel(hotelId);
        setValues({...values, ...res.data.hotel});
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${hotelId}`);
        setLocation(res.data.hotel.location);
        setCreator(res.data.hotel.postedBy);
    }

    const handleImageChange = (e) => {
        setValues({...values, image: e.target.files[0]});
        setPreview(URL.createObjectURL( e.target.files[0]));
        setNewImage(true);
    }

    const handleChange = e => {
        setValues({...values, [e.target.name] : e.target.value});
    }
    const hotelSubmit = async (e) => {
        e.preventDefault();

        if(!image){
            return toast.error("Please upload the image of your hotel.");
        }

        if(!title || !content || !price || !from || !to || !bed || !location){
            return toast.error("Please fill in all field.");
        }

        let hotelData = new FormData();
        hotelData.append('title', title);
        hotelData.append('content', content);
        newImage && hotelData.append('image', image);
        hotelData.append('price', price);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);
        hotelData.append('location', location);

        try{
            let res = await updateHotel(user.token, hotelData, props.match.params.hotelId);
            toast.success('Hotel updated');
            props.history.push(`/hotel/${props.match.params.hotelId}`)
        } catch(e){
            console.log(e);
            return toast.error(`Error: ${e.response.data.err}`);
        }
    }
    
    useEffect(() => {
        const hotelId = props.match.params.hotelId;
        loadSellerHotels(hotelId);
    }, [props.match.params.hotelId]);
    let arr = [1,2,3,4];


    if(user.user._id !== creator._id) {
        return (
            <>
                You don't have the right to edit this hotel.
            </>
        )
    }
    return (
        <>
            <ToastContainer/>
            <div className="container-fluid bg-secondary h1 p-5 text-center">
                <h2>Edit hotel</h2>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10'>
                    <form onSubmit={hotelSubmit}>
                    <div className="form-group">
                        <label className="btn btn-outline-secondary btn-block m-2 text-left" name="image">
                            Add Image
                            <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />
                        </label>
                        <input type="text" name="title" onChange={handleChange} placeholder="title" className="form-control m-2" value={title} />
                        <textarea type="text" name="content" onChange={handleChange} placeholder="content" className="form-control m-2" value={content}>
                        </textarea>
                        <input type="number" name="price" onChange={handleChange} placeholder="price" className="form-control m-2" value={price} />
                        <input type="text" name="location" onChange={e => {
                            setLocation(e.target.value);
                        }} placeholder="Address of the hotel" className="form-control m-2" value={location} />
                        {/* <input type="number" name="bed" onChange={handleChange} placeholder="Number of beds" className="form-control m-2" value={bed} /> */}
                    </div>
                    <Select value={bed} onChange={(value) => 
                        setValues({...values, bed: value})
                    } className="w-100 m-2" size="large" placeholder="Number of bed">
                        {arr.map(i => <Option key={i}>{i}</Option>)}

                    </Select>

                    {from && <DatePicker value={moment(from, 'YYYY-MM-DD')} placeholder="From Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
                        setValues({...values, from: dateString})
                    }} 
                    disabledDate={(current) => {
                        return current && current.valueOf() < moment().subtract(1, 'days');
                    }}
                    />}
                    {to && <DatePicker value={moment(to, 'YYYY-MM-DD')} placeholder="To Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
                        setValues({...values, to: dateString})
                        
                    }} 
                    disabledDate={(current) => {
                        return from ? current && current.valueOf() < moment() : current && current.valueOf() < moment().subtract(1, 'days');
                    }}
                    />}
                    <button className="btn btn-outline-primary m-2">
                        Save hotel
                    </button>
                </form>
                    </div>
                    <div className='col-md-2'>
                        {preview ? <img src={preview} alt="preview-image" className="img img-fluid m-2" /> : <div>No preview image yet</div>}
                        {/* <pre>{JSON.stringify(values, null, 4)}</pre> 
                        <pre>{JSON.stringify(location)}</pre>  */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditHotel;