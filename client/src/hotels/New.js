import React, {useState} from "react";
import { useSelector } from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import AlgoliaPlaces from 'algolia-places-react';
import {DatePicker, Select} from 'antd';
import moment from "moment";
import { createHotel } from "../actions/hotel";
import HotelCreateForm from "../components/forms/HotelCreateForm";

const {Option} = Select;

// const config = {
//     appId: process.env.REACT_APP_ALGOLIA_APP_ID,
//     apiKey: process.env.REACT_APP_ALGOLIA_APP_API_KEY,
//     language: 'en',
//     countries: ["au"]
// }

const New = () => {

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
    const {title, content, image, price, from, to, bed} = values;

    const [location, setLocation] = useState('');


    const handleImageChange = (e) => {
        
        setValues({...values, image: e.target.files[0]});
        setPreview(URL.createObjectURL( e.target.files[0]));
        console.log(values);
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
        image && hotelData.append('image', image);
        hotelData.append('price', price);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);
        hotelData.append('location', location);

        try{
            let res = await createHotel(user.token, hotelData);

            toast('New hotel is posted');
            console.log(res);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch(e){
            console.log(e);
            if(e.response.status === 400) return toast.error(`Error: ${e.response.data.err}`);
        }
        
    }

    const handleChange = e => {
        setValues({...values, [e.target.name] : e.target.value});
    }

    let arr = [1, 2, 3, 4];

    

    // const hotelForm = () => {
    //     return (
    //         <form onSubmit={hotelSubmit}>
    //             <div className="form-group">
    //                 <label className="btn btn-outline-secondary btn-block m-2 text-left" name="image">
    //                     Add Image
    //                     <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />
    //                 </label>
    //                 <input type="text" name="title" onChange={handleChange} placeholder="title" className="form-control m-2" value={title} />
    //                 <textarea type="text" name="content" onChange={handleChange} placeholder="content" className="form-control m-2" value={content}>
    //                 </textarea>
    //                 <input type="number" name="price" onChange={handleChange} placeholder="price" className="form-control m-2" value={price} />
    //                 <input type="text" name="location" onChange={e => {
    //                     setLocation(e.target.value);
    //                 }} placeholder="Address of the hotel" className="form-control m-2" value={location} />
    //                 {/* <input type="number" name="bed" onChange={handleChange} placeholder="Number of beds" className="form-control m-2" value={bed} /> */}
    //             </div>
    //             <Select onChange={(value) => 
    //                 setValues({...values, bed: value})
    //             } className="w-100 m-2" size="large" placeholder="Number of bed">
    //                 {arr.map(i => <Option key={i}>{i}</Option>)}

    //             </Select>

    //             <DatePicker placeholder="From Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
    //                 setValues({...values, from: dateString})
    //             }} 
    //             disabledDate={(current) => {
    //                 return current && current.valueOf() < moment().subtract(1, 'days');
    //             }}
    //             />
    //             <DatePicker placeholder="To Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
    //                 setValues({...values, to: dateString})
                    
    //             }} 
    //             disabledDate={(current) => {
    //                 return from ? current && current.valueOf() < moment() : current && current.valueOf() < moment().subtract(1, 'days');
    //             }}
    //             />
    //             <button className="btn btn-outline-primary m-2">
    //                 Save hotel
    //             </button>
    //         </form>
    //     )
    // }
   
    return (
        <React.Fragment>
             <ToastContainer/>
            <div className="container-fluid bg-secondary h1 p-5 text-center">
                <h2>Add hotel</h2>
            </div>
            <div className="row">
                <div className="col-md-10">
                    <br>
                       
                    </br>
                    {/* {hotelForm()} */}
                    <HotelCreateForm 
                        values={values} 
                        hotelSubmit={hotelSubmit}  
                        title={title}
                        content={content}
                        price={price}
                        from={from}
                        to={to}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        image={image}
                        bed={bed}
                        location={location}
                        setValues={setValues}
                        setLocation={setLocation}
                        setPreview={setPreview}
                    />
                </div>
                <div className="col-md-2">
                    {preview ? <img src={preview} alt="preview-image" className="img img-fluid m-2" /> : <div>No preview image yet</div>}
                    {/* <pre>{JSON.stringify(values, null, 4)}</pre> 
                    <pre>{JSON.stringify(location)}</pre>  */}
                </div> 
            </div>
        </React.Fragment>
        
    )
}

export default New;