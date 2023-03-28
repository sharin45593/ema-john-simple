import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const saveCart =[];
        // step-01(get id)
        for(const id in storedCart){
            // step-2 : get peoduct using id
            const addedProduct = products.find(product=> product.id === id);
          
           if(addedProduct){
            // step-3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // stap-4: adedcart to the product the save cart
                saveCart.push(addedProduct);
           }
            

        }
        // step-5: srt cart
        setCart(saveCart);
    },[products])

    const handleAddToCart = (product) => {
        // cart.push(product); 
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;