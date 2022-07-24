import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getAccountStatus } from "../actions/stripe";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = ({history}) => {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const accountStatus = async (token) => {
        try{
            const res = await getAccountStatus(token);
            console.log(res);
            updateUserInLocalStorage(res.data.user, () => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                });

                window.location.href = '/dashboard/seller';
            })
        } catch(e){
            console.log(e);

        }
        
    }
    useEffect(() => {
        if(user && user.token){
            accountStatus(user.token)
        }
    }, [user])
    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="h1 p-5 text-danger" />
        </div>
        
    )
}

export default StripeCallback;