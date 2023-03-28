import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    console.log(cart)

    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        product.quantity = product.quantity || 1;
        total =total + product.price *product.quantity;
        totalShipping =total +product.shipping;
        quantity =quantity + product.quantity;
    }
    const tax =total*7/100;
    const grandTotal = total +totalShipping +tax;
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
                <p>Selected Items: {quantity}</p> 
                <p>Total Price :$ {total}</p>
                <p>Total Shipping :$ {totalShipping} </p>
                <p>Tax: $ {tax .toFixed(2)}</p>
                <h4>Grand Total:$ {grandTotal.toFixed(2) } </h4>
        </div>
    );
};

export default Cart;