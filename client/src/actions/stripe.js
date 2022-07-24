import axios from "axios";

export const createConnectAccount = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-connect-account`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAccountStatus = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/get-account-status`,{}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getAccountBalance = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/get-account-balance`,{}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const payoutSetting = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/payout-setting`,{}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}   

export const getSessionId = async (token, hotelId) => {
    return await axios.post(`${process.env.REACT_APP_API}/stripe-session-id/${hotelId}`,{hotelId}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const stripeSuccess = async (token, hotelId) => {
    return await axios.post(`${process.env.REACT_APP_API}/stripe-success`, {hotelId}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
