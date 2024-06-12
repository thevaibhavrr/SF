import React from 'react';
// import './ProductCard.css';
import "../../../styles/NewHome/ProductCard.css"
import productImage from '../../../assets/img/NewHome/Mumtaz 1.png'; // Replace with your image path
import offerImage from '../../../assets/img/NewHome/offerImage.png'
import AsAD from '../../../assets/img/NewHome/AsAD.svg'
import RIC from '../../../assets/img/NewHome/RIC.svg'


const ProductList = [
    {
        id: 1,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: AsAD
    },
    {
        id: 2,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: productImage
    },
    {
        id: 3,
        name: "Mumtaz Premium Basmati rice",
        weight: "1 kg",
        price: "₹9,750",
        oldPrice: "₹10,835",
        productImage: RIC
    },
]

const NewHomeProducts = () => {
    return (
        <div className="product_card_container_New_home d-flex justify-content-around">
            {ProductList.map((product) => (
                <div key={product.id} className="product_card">
                    {/* top */}
                    <div className='d-flex px-2'>
                        <div>
                            <img src={offerImage} alt="offer" className="offerImage" />
                        </div>
                        <div>
                            <img src={product.productImage} alt={product.name} className="product_image" />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='d-flex flex-column gap-2'>
                        <div>
                            <div>{product.name}</div>
                            <div>Net weight: {product.weight}</div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className="new-price">{product.price}</div>
                                <div className="old-price">{product.oldPrice}</div>
                            </div>
                            <div className='ADD_button_new_home_page'>
                                ADD
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default NewHomeProducts;




