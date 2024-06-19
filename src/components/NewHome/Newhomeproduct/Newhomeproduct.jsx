import React, { useEffect, useState } from 'react';
// import './ProductCard.css';
import "../../../styles/NewHome/ProductCard.css"
import productImage from '../../../assets/img/NewHome/Mumtaz 1.png'; // Replace with your image path
import offerImage from '../../../assets/img/NewHome/offerImage.png'
import AsAD from '../../../assets/img/NewHome/AsAD.svg'
import RIC from '../../../assets/img/NewHome/RIC.svg'
import { makeApi } from '../../../api/callApi.tsx';
import { Link } from 'react-router-dom';


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
    const [products, setProducts] = useState([]);
const [AllProductLoader, setAllProductLoader] = useState(false);
const [productType, setProductType] = useState("");

useEffect(() => {
    const token = localStorage.getItem("token")
    const userLocation = localStorage.getItem("country")
    if (token) {
        setProductType(userLocation)
    }
}, [localStorage.getItem("token")])

// get data
const fetchProduct = async () => {
    try {
        setAllProductLoader(true);
            const response = await makeApi(`/api/get-all-products?&perPage=10&category=665d67c04133e96dad0359a4`, "GET");

        setProducts(response.data.products);
    } catch (error) {
        console.log(error);
    } finally {
        setAllProductLoader(false);
    }
};


useEffect(() => {
    fetchProduct();
}, [productType])

    return (
        <div className="product_card_container_New_home py-5 my-5 ">
            {ProductList.map((product) => (
                <div key={product.id} className="product_card">
                    {/* top */}
                    <div className='new_product_product_and_offer_image'>
                        <div>
                            <img src={offerImage} alt="offer" className="offerImage" />
                        </div>
                        <div>
                            <img src={product.productImage} alt={product.name} className="product_image" />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='d-flex flex-column gap-2'>
                        <div className='New_Home_product_name_and_weight' >
                            <div>{product.name}</div>
                            <div>Net weight: {product.weight}</div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className="new-price">{product.price}</div>
                                <div className="old-price">{product.oldPrice}</div>
                            </div>
                            <Link to={"product/all-products"} className='css-for-link-tag' >
                            <div className='ADD_button_new_home_page'>
                                View more
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            ))}


        </div>
    );
};

export default NewHomeProducts;
