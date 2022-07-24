import { Modal } from "antd";

const OrderModal = (props) => {
    return (
        <Modal visible={props.showModal} title="Order Payment Info" onCancel={() => {
            props.setModal(!props.showModal)
        }}
        
        onOk={() => {
            props.setModal(!props.showModal)
        }}>
            <p>Payment intent: {props.session.payment_intent}</p>
            <p>Payment status: {props.session.payment_status}</p>
            <p>Amount total: {`${props.session.currency.toUpperCase()} ${props.session.amount_total/100}`}</p>
            <p>Stripe Customer Id: {props.session.customer}</p>
            <p>Customer: {props.orderedBy.name}</p>
        </Modal>
    )
}

export default OrderModal;