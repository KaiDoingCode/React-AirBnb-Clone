import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {Card, Avatar, Badge} from 'antd';
import moment from 'moment';
import { getAccountBalance } from "../actions/stripe";
import { currencyFormatter } from "../actions/auth";
import { SettingOutlined } from "@ant-design/icons";
import { payoutSetting } from "../actions/stripe";

const {Meta} = Card;
const {Ribbon} = Badge;

const ConnectNav = () => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => state);
    const [balance, setBalance] = useState({});
    const handlePayoutSettings = async () => {
        try{
            setLoading(true);
            const res = await payoutSetting(user.token);
            console.log(res.data.loginLink.url);
            window.open(res.data.loginLink.url, '_blank');
        } catch(e){
            setLoading(false);
            alert('Something wrong');
            console.log(e);
        }
    }

    useEffect(() => {
        getAccountBalance(user.token).then(
            res => {
                return res.data
            }
        ).then(balance => {
            console.log(balance);
            setBalance(balance.balance);
        })
    }, [user]);

    return (
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={<Avatar>{user.user.name[0]}</Avatar>} 
                    name={user.user.name} 
                    title={user.user.name} 
                    description={`${user.user.name} joined ${moment(user.user.createdAt).fromNow()}`}>
                </Meta>
            </Card>
            {user && user.user && user.user.stripe_seller && user.user.stripe_seller.charges_enabled &&
            <>
                <Ribbon text="Available" color="grey">
                    <Card className="bg-light pt-1">
                        {balance && balance.pending && balance.pending.map((ba, index) => (
                            <span key={index} className="lead">
                                {currencyFormatter(ba)}
                            </span>
                        ))}
                    </Card>
                </Ribbon>
                <Ribbon text="Payouts" color="silver">
                    <Card onClick={handlePayoutSettings} className="bg-light pointer">
                        <SettingOutlined className="h5 pt-2" />
                    </Card>
                </Ribbon>
            </>
            }
            
        </div>

    )
}

export default ConnectNav;