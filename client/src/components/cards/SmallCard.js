import React from "react";
import { currencyFormatter } from "../../actions/auth";
import { diffDays } from "../../actions/hotel";
import {useHistory, Link} from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const SmallCard = (props) => {
    const history = useHistory();
    return (
        <React.Fragment>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        {props.h.image.contentType ?
                            <img src={`${process.env.REACT_APP_API}/hotel/image/${props.h._id}`} alt={props.h.title} className='card-image img img-fluid' /> 
                             :
                            <img src={`https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768`}  alt={props.h.title} className='card-image img img-fluid' />
                    }
                      
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.h.title}</h5> 
                            <span className="float-right text-primary">
                                {currencyFormatter({
                                    amount: props.h.price,
                                    currency: 'usd'
                                })}
                            </span>
                            <p className="alert alert-info">
                                {props.h.location}
                            </p>
                            <p className="card-text">
                                {props.h.content.length > 200 ? `${props.h.content.substring(0,200)}...` : props.h.content }
                            </p>
                            <p className="card-text">
                                For {diffDays(props.h.from, props.h.to) > 1 ? `${diffDays(props.h.from, props.h.to) } days` : `${diffDays(props.h.from, props.h.to) } day`} 
                            </p>
                            <p className="card-text">
                                {props.h.bed > 1 ? `${props.h.bed} beds` : `${props.h.bed} bed`}
                            </p>
                            <p className="card-text">
                                Available from {new Date(props.h.from).toLocaleDateString()}
                            </p>
                            {props.showViewMoreButton && <button
                            onClick={() => {
                                history.push(`/hotel/${props.h._id}`)
                            }}
                             className="btn btn-primary">Show more</button>}

                            {
                                props.owner && 
                                <>
                                    <div className="d-flex justify-content-between h4">
                                        <Link to={`/hotel/edit/${props.h._id}`}>
                                            <EditOutlined className="text-warning" />
                                        </Link>
                                        
                                        <DeleteOutlined className="text-danger" onClick={props.handleDeleteHotel} />
                                        
                                    </div>
                                </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SmallCard;