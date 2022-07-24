import React from "react";
import { useSelector } from "react-redux";
import {DatePicker, Select} from 'antd';
import moment from "moment";


const {Option} = Select;

// const config = {
//     appId: process.env.REACT_APP_ALGOLIA_APP_ID,
//     apiKey: process.env.REACT_APP_ALGOLIA_APP_API_KEY,
//     language: 'en',
//     countries: ["au"]
// }

const HotelEditForm = (props) => {

    const {user} = useSelector((state) => {
        return state;
    });

    let arr = [1, 2, 3, 4];
   
    return (
        <React.Fragment>
            <form onSubmit={props.hotelSubmit}>
                <div className="form-group">
                    <label className="btn btn-outline-secondary btn-block m-2 text-left" name="image">
                        Add Image
                        <input type="file" name="image" onChange={props.handleImageChange} accept="image/*" hidden />
                    </label>
                    <input type="text" name="title" onChange={props.handleChange} placeholder="title" className="form-control m-2" value={props.title} />
                    <textarea type="text" name="content" onChange={props.handleChange} placeholder="content" className="form-control m-2" value={props.content}>
                    </textarea>
                    <input type="number" name="price" onChange={props.handleChange} placeholder="price" className="form-control m-2" value={props.price} />
                    <input type="text" name="location" onChange={e => {
                        props.setLocation(e.target.value);
                    }} placeholder="Address of the hotel" className="form-control m-2" value={props.location} />
                    {/* <input type="number" name="bed" onChange={handleChange} placeholder="Number of beds" className="form-control m-2" value={bed} /> */}
                </div>
                <Select onChange={(value) => 
                    props.setValues({...props.values, bed: value})
                } className="w-100 m-2" size="large" placeholder="Number of bed">
                    {arr.map(i => <Option key={i}>{i}</Option>)}

                </Select>

                <DatePicker placeholder="From Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
                    props.setValues({...props.values, from: dateString})
                }} 
                disabledDate={(current) => {
                    return current && current.valueOf() < moment().subtract(1, 'days');
                }}
                />
                <DatePicker placeholder="To Date" name="from" className="form-control m-2" onChange={(date, dateString) => {
                    props.setValues({...props.values, to: dateString})
                    
                }} 
                disabledDate={(current) => {
                    return props.from ? current && current.valueOf() < moment() : current && current.valueOf() < moment().subtract(1, 'days');
                }}
                />
                <button className="btn btn-outline-primary m-2">
                    Save hotel
                </button>
            </form>
        </React.Fragment>
        
    )
}

export default HotelEditForm;